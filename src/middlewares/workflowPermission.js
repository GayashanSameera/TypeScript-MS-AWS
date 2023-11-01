import _ from 'lodash';
import { constants, helpers, middlewares } from '../../libs';
const { B2B_AUTH, TPIP_MS_SCHEME, TPIP_FN_GET_USER_SCHEMES } = constants;

const { lambdaHelper } = helpers;
const { authMiddleware } = middlewares;

const getUserSchemes = async event => {
  const _event = _.cloneDeep(event);
  try {
    return lambdaHelper.invokeR2(TPIP_MS_SCHEME, TPIP_FN_GET_USER_SCHEMES, _event);
  } catch (error) {
    console.log('getUserSchemes error :', error);
    return [];
  }
};

const checkPermissions = async event => {
  console.log('headers :', event.headers);
  console.log('Authorization :', event.headers);
  console.log('user :', event.user);
  if (event.headers && event.headers.Authorization && !event.user) {
    authMiddleware.bindUser(event);
  }
  console.log('event :', event);
  const { body } = event;
  let schemeId = null;

  if (event && event.pathParameters && event.pathParameters.schemeId) {
    schemeId = event.pathParameters.schemeId;
  } else if (event && event.queryStringParameters && event.queryStringParameters.schemeId) {
    schemeId = event.queryStringParameters.schemeId;
  } else if (event && event.body && event.body.schemeId) {
    schemeId = event.body.schemeId;
  } else if (event && event.schemeId) {
    schemeId = event.schemeId;
  }
  
  if (event.permission && event.permission === B2B_AUTH) {
    return true;
  } else if (body && body.permission === B2B_AUTH) {
    return true;
  } else if (event.requestContext && event.requestContext.b2bAuth === B2B_AUTH) {
    return true;
  } else if (event.user && event.user.type && event.user.type === 'lgim') {
    return true;
  } else if (event.user && event.user.type && event.user.type !== 'lgim') {
    const schemesMap = await getUserSchemes(event);
    console.log('schemesMap :', schemesMap);
    const found = schemesMap.find(scheme => scheme.schemeId === schemeId);
    console.log('found :', found);
    if (found) return true;

    return false;
  } else {
    return false;
  }
};

const checkAccess = async event => {
  const { pathParameters, body } = event;
  console.log('event :', event);
  console.log('pathParameters', pathParameters);
  console.log('body', body);

  const permission = await checkPermissions(event);
  console.log('permission', permission);
  if (!permission) throw Error('505');
};

export default {
  checkAccess,
};
