import { SQSEvent } from 'aws-lambda';
import { whichIndex, mapIndex } from '.';
import { TSQSEventTrigger, ITrail, IESResponse, ISQSReceiveMessage, ISQSMessageBody } from '../types';
import EsModel from '../models/esModel';
import DbModel from '../models/dbModel';
import { constants, helpers } from '../../libs';

const { TPIP_MS_AUDIT_TRAIL, TPIP_FN_HEALTH_CHECK } = constants;
const { lambdaHelper, auditQueueHelper } = helpers;

export const create: TSQSEventTrigger = async (event: SQSEvent) => {
  const records = event.Records;
  if (!records) return 'done';

  try {
    for (let record of records) {
      const sQueue: string = record.body;
      if (!sQueue) continue;
      const payload: ITrail = JSON.parse(sQueue);
      if (!payload) continue;

      const esPayload = Object.assign({}, payload);
      delete esPayload['then'];
      delete esPayload['now'];

      const esIndex: string = whichIndex(payload.domain);
      const { esStatus } = await lambdaHelper.invokeR2(TPIP_MS_AUDIT_TRAIL, TPIP_FN_HEALTH_CHECK, event);
      if (esStatus !== 'online') throw Error('ES status offline');
      const esResponse: IESResponse = await EsModel.getInstance().createTrail(esIndex, esPayload);
      if (!esResponse || !(esResponse.statusCode === 200 || esResponse.statusCode === 201))
        throw Error(`Error occurred while creating ES index: ${{ ...esResponse }}`);

      await DbModel.getInstance().createTrail(payload);
    }
  } catch (error) {
    console.error('Create trail error:', error);
    throw Error(error);
  }
};

export const processDLQ = async () => {
  try {
    let executorFlag: boolean = true;
    do {
      const dlMessages: ISQSReceiveMessage = await auditQueueHelper.receiveMessage(true);

      if (!dlMessages || !dlMessages.Messages || dlMessages.Messages.length <= 0) return (executorFlag = false);

      const messages = dlMessages.Messages;
      for (let message of messages) {
        const messageBody: ISQSMessageBody = JSON.parse(message.Body);
        const esIndex = whichIndex(messageBody.domain);
        const messageStatus = {
          esWrite: false,
          dbWrite: false,
        };

        const isTrailExist = (messageStatus.esWrite = await EsModel.getInstance().isTrailExist(
          esIndex,
          messageBody.id
        ));
        if (!isTrailExist) {
          const esPayload = Object.assign({}, messageBody);
          delete esPayload['then'];
          delete esPayload['now'];

          const esResponse: IESResponse = await EsModel.getInstance().createTrail(esIndex, esPayload);
          if (esResponse && (esResponse.statusCode === 200 || esResponse.statusCode === 201))
            messageStatus.esWrite = true;
        }
        

        try {
          const isTrailExist: boolean = (messageStatus.dbWrite = await DbModel.getInstance().isTrailExist(
            messageBody.id
          ));

          if (!isTrailExist) {
            await DbModel.getInstance().createTrail(messageBody);
            messageStatus.dbWrite = true;
          }
        } catch (error) {
          console.error('DB transaction error:', error);
        }

        if (messageStatus.esWrite && messageStatus.dbWrite)
          await auditQueueHelper.deleteMessage(message.ReceiptHandle, true);
      }
    } while (executorFlag);
  } catch (error) {
    console.error(error);
  }
};

export const rotateES = async () => {
  const esIndexes = mapIndex();
  const timeStamp = new Date().toISOString();
  const batchSize = 25;
  const rotatableDays = 365 * 3;

  let dateDiff = new Date();
  dateDiff.setDate(dateDiff.getDate() - rotatableDays);
  const sDateDiff = dateDiff.toISOString();

  console.log(`Processing started: ${ new Date().toISOString() }`);
  for (let esIndex of esIndexes) {
    try {
      const esCount = await EsModel.getInstance().query('COUNT', esIndex, {
        query: `loggedAt<'${ sDateDiff }'`
      });
      if (!esCount || (esCount && esCount.total <= 0)) continue;

      const chunks = Math.ceil(esCount.total / batchSize);

      for (let inc = 0; inc < chunks; inc++) {
        const esResult = await EsModel.getInstance().query('*', esIndex, {
          from: inc,
          size: batchSize,
          query: `loggedAt<'${ sDateDiff }'`
        });

        if (!esResult || (esResult && esResult.total <= 0)) continue;
        const { hits } = esResult;

        const idMap = [];
        const dataMap = hits.map(hit => {
          const id = hit.id;
          idMap.push(id);

          if (typeof hit === 'object') hit = JSON.stringify(hit);
          return {
            PutRequest: {
              Item: { id, timeStamp, data: hit }
            }
          };
        });

        try {
          await DbModel.getInstance().batchWriteESBackup(dataMap);
          await EsModel.getInstance().deleteByIds(esIndex, idMap);
        } catch (batchWDError) {
          console.error(`Something went wrong while backing-up ${esIndex} logs`, batchWDError);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }




  console.log(`Processing ended: ${ new Date().toISOString() }`);
};
