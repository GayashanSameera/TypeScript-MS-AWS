const AWS = require('../../libs/models/AWS');
const { documentClient: dynamo } = AWS.getInstance();
const { AUDIT_TRAIL_TABLE, AUDIT_TRAIL_ES_BACKUP_TABLE } = process.env;

let instance = null;
export default class DbModule {
  static getInstance() {
    if (instance === null) instance = new DbModule();

    return instance;
  }

  /**
   * Create trail in Database - @auditTrail
   *
   * @param {Object} payload
   * @returns {Promise} Promise - object with the result of the async operation of the database transaction
   */
  async createTrail(payload) {
    const params = {
      TableName: AUDIT_TRAIL_TABLE,
      Item: { ...payload }
    };
    await dynamo.put(params).promise();
  }

  /**
   * Create ES Backup in Database - @auditTrailEsBackup
   *
   * @param {Array} dataMap
   * @returns {Promise} Promise - object with the result of the async operation of the database transaction
   */
  async batchWriteESBackup(dataMap) {
    const criteria = {
      RequestItems: {
        [AUDIT_TRAIL_ES_BACKUP_TABLE]: dataMap
      },
    };

    await dynamo.batchWrite(criteria).promise();
  }

  /**
   * Validate trail with id - (ID already exist in the database)
   *
   * @param {string: uuidv1} id - trail ID
   * @returns {Promise} Promise - object with the result item
   */
  async isTrailExist(id) {
    const criteria = {
      TableName: AUDIT_TRAIL_TABLE,
      Key: { id },
      consistentRead: true,
    };

    const result = await dynamo.get(criteria).promise();
    return result && typeof result.Item !== 'undefined';
  }

  async getTrailById(id) {
    const criteria = {
      TableName: AUDIT_TRAIL_TABLE,
      Key: { id },
      consistentRead: true,
    };

    const result = await dynamo.get(criteria).promise();
    if (!result || !result.Item) return null;

    return result.Item;
  }

  async getTrailsByIds(idMap) {
    const criteria = {
      RequestItems: {
        [AUDIT_TRAIL_TABLE]: {
          Keys: idMap,
        },
      },
    };

    const result = await dynamo.batchGet(criteria).promise();
    if (!result || (result && !result.Responses))
      return [];

    return result.Responses.auditTrail;
  }
}
