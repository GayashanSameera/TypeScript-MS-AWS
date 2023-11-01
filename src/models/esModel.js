// import * as AWS from 'aws-sdk';
import * as path from 'path';

const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const { REGION, ES_ENDPOINT_URL } = process.env;
// const ES_ENDPOINT_URL = 'search-audit-es-k2fxd7usvurax2mrp3kyiuk3ye.eu-west-2.es.amazonaws.com';

const endpoint = new AWS.Endpoint(ES_ENDPOINT_URL);
const httpClient = new AWS.HttpClient();
const credentials = new AWS.EnvironmentCredentials('AWS');

let instance = null;
export default class EsModule {
  static getInstance() {
    if (instance === null) instance = new EsModule();

    return instance;
  }

  /**
   * Sends a request to Elasticsearch
   *
   * @param {string} httpMethod - the HTTP method, e.g. 'GET', 'PUT', 'DELETE', etc
   * @param {string} requestPath - the HTTP path (relative to the Elasticsearch domain), e.g. '.kibana'
   * @param {Object} [payload] - an optional JavaScript object that will be serialized to the HTTP request body
   * @returns {Promise} Promise - object with the result of the HTTP response
   */
  sendRequest(httpMethod, requestPath, payload) {
    const request = new AWS.HttpRequest(endpoint, REGION);

    request.method = httpMethod;
    request.path = path.join('/', requestPath);
    request.body = JSON.stringify(payload);
    request.headers['Content-Type'] = 'application/json';
    request.headers.Host = ES_ENDPOINT_URL;

    const signer = new AWS.Signers.V4(request, 'es');
    signer.addAuthorization(credentials, new Date());

    return new Promise((resolve, reject) => {
      httpClient.handleRequest(
        request,
        null,
        response => {
          const { statusCode, statusMessage, headers } = response;
          let body = '';
          response.on('data', chunk => {
            body += chunk;
          });
          response.on('end', () => {
            const data = {
              statusCode,
              statusMessage,
              headers,
            };
            if (body) {
              data.body = JSON.parse(body);
            }
            resolve(data);
          });
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * Health Check of Elasticsearch
   * @returns {Promise} Promise - object with the result of the HTTP response
   */
  async healthCheck() {
    const response = await this.sendRequest('GET', '_cluster/health');
    return response;
  }

  /**
   * Create trail in Elasticsearch
   *
   * @param {string} index - esindex name
   * @param {Object} body - data object to be created in the Elasticsearch under "@index/_doc"
   * @description {sting} [body.id] - uuidv1
   * @returns {Promise} Promise - object with the result of the HTTP response
   */
  async createTrail(index, body) {
    const requestPath = `${index}/_doc/${body.id}`;
    const response = await this.sendRequest('PUT', requestPath, body);
    return response;
  }

  /**
   * Validate trail with index and trail-id (ID already exist in the database)
   *
   * @param {string} index - esindex name
   * @param {string: uuidv1} id - trail ID
   * @returns {Promise} Promise - object with the result of the HTTP response
   */
  async isTrailExist(index, id) {
    const requestPath = `${index}/_doc/${id}`;
    const response = await this.sendRequest('GET', requestPath);
    return response && response.statusCode === 200;
  }

  /**
   * Query trails in Elasticsearch
   *
   * @param {string} fields
   * @param {string} index - esindex name
   * @param {Object} { sort, from, size } - sorting & pagination
   * @returns {Promise} Promise - object with the paginated result of the HTTP response
   */
  async query(fields, index, { sort, query, from = 0, size = 10 } = {}) {
    const requestPath = '_opendistro/_sql';

    let sql = `SELECT ${fields} FROM ${index}`;
    if (query) sql += ` WHERE ${query}`;
    if (sort) sql += ` ORDER BY ${sort.key} ${sort.order}`;
    if (fields.toLocaleLowerCase() !== 'count') sql += ` LIMIT ${from},${size}`;
    console.log('sql.................', sql);
    const response = await this.sendRequest('POST', requestPath, {
      query: sql,
    });
    console.log('response.................', response);
    if (response.statusCode !== 200 && !response.body.error.type === 'IndexNotFoundException')
      throw Error('ES query error');

    const { total = 0, hits = [] } = response.body.hits ? response.body.hits : { total: 0, hits: [] };

    if (fields === 'COUNT') return { total };

    return {
      from,
      size,
      total,
      hits: hits.map(hit => hit._source),
    };
  }

  async deleteByIds(index, idMap) {
    const requestPath = `${index}/_delete_by_query`;
    const response = await this.sendRequest('POST', requestPath, {
      query: {
        terms: {
          _id: idMap,
        },
      },
    });

    if (response.statusCode !== 200) throw Error('Something went wrong while deleting indices');
  }
}
