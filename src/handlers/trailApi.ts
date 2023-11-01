import { whichIndex } from '.';
import { helpers, constants, middlewares } from '../../libs';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { workflowPermission } from '../middlewares';
import EsModel from '../models/esModel';
import DbModel from '../models/dbModel';
import { actions } from '../constant';
import * as _ from 'lodash';

const { authMiddleware } = middlewares;
const { responseHelper, lambdaHelper } = helpers;
const {
  USER_LGIM,

  TPIP_MS_AUDIT_TRAIL,

  TPIP_FN_AUDIT_QL,

  DOMAIN_ARRAY,
  WORFFLOW_DOMAIN_ARRAY,
  ATD_USER,
  ATD_TASKS,
  ATA_ON_UPDATE_USER_CLAIMS,
  ATA_ON_UPDATE_GROUP,
  ATA_ON_CREATE_GROUP,
  ATA_ON_ADD_USER,
  ATA_ON_SAVE_TASKS,
  ATA_ON_USER_REMOVED_FROM_SCHEME,
  STEP_TITLE,
  KEY_MATRIX_FLAG_MAP,
} = constants;

/**
 * Health check handler function
 *
 * @description this handler API can be used to check the availability of the services which are being used in the AuditTrail
 * @returns {Promise} Promise - object with the service status of the HTTP response
 */

export const healthCheck: APIGatewayProxyHandler = async () => {
  try {
    const health = {
      apiStatus: 'online',
      qaTips: {
        timestamp: new Date().toUTCString(),
      },
    };

    try {
      const { statusCode } = await EsModel.getInstance().healthCheck();
      health['esStatus'] = statusCode === 200 ? 'online' : 'offline';
    } catch (esError) {
      console.error('es error:', esError);
      health['esStatus'] = 'offline';
    }

    return responseHelper.sendSuccess('success', health);
  } catch (error) {
    return responseHelper.sendError(400, 'Something went wrong while checking the health of tpip audit-trail', error);
  }
};

/**
 * AuditTrail query handler function
 *
 * @param {Object} event - HTTP event data object
 * @description this handler API can be used to query the audit log
 * @returns {Promise} Promise - object with the service status of the HTTP response
 */
export const auditQl: APIGatewayProxyHandler = async event => {
  const { pathParameters, body } = event;
  const { domain } = pathParameters;
  const { fields, deepQuery, ...rest } = JSON.parse(body);

  let _fields = fields === '*' ? '*' : deepQuery && !fields ? 'id' : fields ? `id, ${fields}` : '*';
  try {
    const esIndex = whichIndex(domain);

    const esResult = await EsModel.getInstance().query(_fields, esIndex, rest);
    if (!esResult) return responseHelper.sendSuccess('success', {}, false);
    if (!deepQuery) return responseHelper.sendSuccess('success', esResult, true);

    const idMap = esResult.hits && esResult.hits.map(({ id }) => ({ id }));

    if (!idMap || (idMap && idMap.length === 0)) return responseHelper.sendSuccess('success', {}, false);

    const dbResult = await DbModel.getInstance().getTrailsByIds(idMap);

    if (!fields) return responseHelper.sendSuccess('success', dbResult, true);

    esResult.hits.forEach(hit => {
      const dbHit = dbResult.find(obj => hit.id === obj.id);
      if (dbHit) {
        hit.now = dbHit.now;
        hit.then = dbHit.then;
      }
    });

    return responseHelper.sendSuccess('success', esResult, true);
  } catch (error) {
    return responseHelper.sendError(400, 'Something went wrong while querying audit-trail', error);
  }
};

export const getActivity: APIGatewayProxyHandler = async event => {
  authMiddleware.bindUser(event);

  await workflowPermission.checkAccess(event);

  let hitsArray = [];
  const commonFields = {
    deepQuery: false,
    fields: 'domain, loggedAt, actionOwner, action, email, status, userType, userName, step, customParams, workflowId, keyMatrixFlag',
    sort: { key: 'loggedAt', order: 'DESC' },
    from: 0,
    size: 200,
  };
  const { queryStringParameters } = event;
  const { schemeId, start, end , email, primaryRole} = queryStringParameters;
  const UTCStartDate = new Date(parseInt(start)).toISOString();
  const UTCEndDate = new Date(parseInt(end)).toISOString();

  try {
    for (const domain of DOMAIN_ARRAY) {
      event.pathParameters = { domain };
      if (domain === ATD_USER) {
        if (primaryRole === USER_LGIM) {
          event.body = JSON.stringify({
            query: `schemeId="${schemeId}" AND ( action="${ATA_ON_UPDATE_USER_CLAIMS}" OR action="${ATA_ON_ADD_USER}" OR action="${ATA_ON_USER_REMOVED_FROM_SCHEME}" OR action="${ATA_ON_CREATE_GROUP}" OR action="${ATA_ON_UPDATE_GROUP}" ) AND loggedAt >= "${UTCStartDate}" AND loggedAt <= "${UTCEndDate}"`,
            ...commonFields,
          });
        } else {
          event.body = JSON.stringify({
            query: `email="${email}" AND ( action="${ATA_ON_UPDATE_USER_CLAIMS}" OR action="${ATA_ON_ADD_USER}" OR action="${ATA_ON_USER_REMOVED_FROM_SCHEME}"  OR action="${ATA_ON_CREATE_GROUP}" OR action="${ATA_ON_UPDATE_GROUP}" ) AND loggedAt >= "${UTCStartDate}" AND loggedAt <= "${UTCEndDate}"`,
            ...commonFields,
          });
        }
      } else if (domain === ATD_TASKS) {
        event.body = JSON.stringify({
          query: `schemeId="${schemeId}" AND action="${ATA_ON_SAVE_TASKS}"  AND loggedAt >= "${UTCStartDate}" AND loggedAt <= "${UTCEndDate}"`,
          ...commonFields,
        });
      } else {
        event.body = JSON.stringify({
          query: `schemeId="${schemeId}"  AND loggedAt >= "${UTCStartDate}" AND loggedAt <= "${UTCEndDate}"`,
          ...commonFields,
        });
      }

      let response = await lambdaHelper.invokeR2(TPIP_MS_AUDIT_TRAIL, TPIP_FN_AUDIT_QL, event);
      const { hits } = response;
      if (hits && hits.length) hitsArray = [...hitsArray, ...hits];
    }
    console.log('hitsArray......................', hitsArray);
    if (primaryRole !== USER_LGIM)
      hitsArray = hitsArray.filter(param => {
        return param.userType !== USER_LGIM;
      });

    let arrayMap = hitsArray.map(trail => {
      console.log('trail............', trail);
      const placeholderData = {
        '%USER%': trail.userName
          ? trail.userName
              .toLowerCase()
              .split(' ')
              .map(s => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')
          : null,
        '%STEP%': trail.workflowId && STEP_TITLE[`${trail.workflowId}_${trail.step}`] ? STEP_TITLE[`${trail.workflowId}_${trail.step}`].toLowerCase() : STEP_TITLE[trail.step] ? STEP_TITLE[trail.step].toLowerCase() : null,
        '%AR_STATUS%':
          trail.status === 'A' || trail.status === 'Approved'
            ? 'approved'
            : trail.status === 'R' || trail.status === 'Rejected'
            ? 'rejected'
            : null,
        '%UPLOADORGENERATED%': trail?.customParams?.uploadOrGenerated,
        '%DOC%': formatDocNames(trail, 'docType'),
        '%Assigned_User%': formatName(trail, 'assignedUser'),
        '%ADDEDUSER%': formatName(trail, 'addedUser'),
        '%MESSAGEDUSER%': formatName(trail, 'messagedUser'),
        '%WORKFLOW%': formatDocNames(trail, 'workflowName'),
        '%GROUP_NAME%': trail?.customParams?.groupName,
        '%KEYMATRIXFLAG%': trail.keyMatrixFlag && KEY_MATRIX_FLAG_MAP[trail.keyMatrixFlag] ? KEY_MATRIX_FLAG_MAP[trail.keyMatrixFlag] : '',
      };

      console.log('placeholderData......................', placeholderData);
      console.log('trail action..............', trail.action);
      //handling unknown action, other wise api crashes
      if (!trail.action || (trail.action && !actions[trail.action])) return null;
      const content = actions[trail.action].replace(/%\w+%/g, all => placeholderData[all] || all);
      return {
        content,
        dateTime: trail.loggedAt,
      };
    });

    arrayMap = _.orderBy(arrayMap, ['dateTime'], ['desc']);
    arrayMap = arrayMap.filter(a => a !== null);
    return responseHelper.sendSuccess('success', arrayMap, true);
  } catch (error) {
    return responseHelper.sendError(400, 'Something went wrong while getting activity data', error);
  }
};

export const activityFilter: APIGatewayProxyHandler = async event => {
  // authMiddleware.bindUser(event);

  // await workflowPermission.checkAccess(event);

  let hitsArray = [];
  const commonFields = {
    deepQuery: false,
    fields: 'domain, loggedAt, actionOwner, action, email, status, userType, userName, step, customParams, workflowId, keyMatrixFlag, schemeId, schemeName',
    sort: { key: 'loggedAt', order: 'DESC' },
    from: 0,
    size: 200,
  };
  const { queryStringParameters } = event;
  const { start, end , email, filterStepActions = false } = queryStringParameters; //schemeId
  const UTCStartDate = new Date(parseInt(start)).toISOString();
  const UTCEndDate = new Date(parseInt(end)).toISOString();
//Step actions that happened for all Schemes for a given date
const domains = filterStepActions ? WORFFLOW_DOMAIN_ARRAY : DOMAIN_ARRAY;
//List of all activities done be a selected user in a given data range
  try {
    for (const domain of domains) {
      event.pathParameters = { domain };
      
      if (domain === ATD_TASKS) {
        event.body = JSON.stringify({
          query: `${email ? 'AND email='+email+ '  AND' : '' } action="${ATA_ON_SAVE_TASKS}"  AND loggedAt >= "${UTCStartDate}" AND loggedAt <= "${UTCEndDate}"`,
          ...commonFields,
        });
      } else {
        event.body = JSON.stringify({
          query: `${email ? 'AND email='+email+ '  AND' : '' } loggedAt >= "${UTCStartDate}" AND loggedAt <= "${UTCEndDate}"`,
          ...commonFields,
        });
      }

      let response = await lambdaHelper.invokeR2(TPIP_MS_AUDIT_TRAIL, TPIP_FN_AUDIT_QL, event);
      const { hits } = response;
      if (hits && hits.length) hitsArray = [...hitsArray, ...hits];
    }
    console.log('hitsArray......................', hitsArray);

    let arrayMap = hitsArray.map(trail => {
      console.log('trail............', trail);
      const placeholderData = {
        '%USER%': trail.userName
          ? trail.userName
              .toLowerCase()
              .split(' ')
              .map(s => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')
          : null,
        '%STEP%': trail.workflowId && STEP_TITLE[`${trail.workflowId}_${trail.step}`] ? STEP_TITLE[`${trail.workflowId}_${trail.step}`].toLowerCase() : STEP_TITLE[trail.step] ? STEP_TITLE[trail.step].toLowerCase() : null,
        '%AR_STATUS%':
          trail.status === 'A' || trail.status === 'Approved'
            ? 'approved'
            : trail.status === 'R' || trail.status === 'Rejected'
            ? 'rejected'
            : null,
        '%UPLOADORGENERATED%': trail?.customParams?.uploadOrGenerated,
        '%DOC%': formatDocNames(trail, 'docType'),
        '%Assigned_User%': formatName(trail, 'assignedUser'),
        '%ADDEDUSER%': formatName(trail, 'addedUser'),
        '%MESSAGEDUSER%': formatName(trail, 'messagedUser'),
        '%WORKFLOW%': formatDocNames(trail, 'workflowName'),
        '%GROUP_NAME%': trail?.customParams?.groupName,
        '%KEYMATRIXFLAG%': trail.keyMatrixFlag && KEY_MATRIX_FLAG_MAP[trail.keyMatrixFlag] ? KEY_MATRIX_FLAG_MAP[trail.keyMatrixFlag] : '',
      };

      console.log('placeholderData......................', placeholderData);
      console.log('trail action..............', trail.action);
      //handling unknown action, other wise api crashes
      if (!trail.action || (trail.action && !actions[trail.action])) return null;
      const content = actions[trail.action].replace(/%\w+%/g, all => placeholderData[all] || all);
      return {
        ...trail,
        content,
        dateTime: trail.loggedAt,
      };
    });

    arrayMap = _.orderBy(arrayMap, ['dateTime'], ['desc']);
    arrayMap = arrayMap.filter(a => a !== null);
    return responseHelper.sendSuccess('success', arrayMap, true);
  } catch (error) {
    return responseHelper.sendError(400, 'Something went wrong while getting activity data', error);
  }
};

const formatName = (trail, type) => {
  if (trail && trail.customParams && trail.customParams[type] && typeof trail.customParams[type] === 'string') {
    const name = trail.customParams[type]
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return name;
  } else return null;
};

const formatDocNames = (trail, type) => {
  if (trail && trail.customParams && trail.customParams[type] && typeof trail.customParams[type] === 'string')
    return trail.customParams[type].toLowerCase();
  else return null;
};
