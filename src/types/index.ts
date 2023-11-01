import { SQSEvent } from 'aws-lambda';

// - Domain for Trails
export enum EDomains {
  user = 'user',
  scheme = 'scheme',
  workflow = 'workflow',
  comment = 'comment',
  tasks = 'tasks',
  activeworkflow = 'activeworkflow',
  reports = 'reports',
  mlcworkflow = 'mlcworkflow',
  mlccomment = 'mlccomment',
}

// - ES indexes mapped to Domains
export enum EESIndexes {
  user = 'user-logs',
  scheme = 'scheme-logs',
  workflow = 'workflow-logs',
  comment = 'comment-logs',
  tasks = 'tasks-logs',
  activeworkflow = 'activeworkflow-log',
  reports = 'reports-logs',
  mlcworkflow = 'mlcworkflow-logs',
  mlcComment = 'mlccomment-logs',
}

// - Trail Payload
export interface ITrail {
  domain: EDomains;
  action: string;
  actionOwner: string | null;
  loggedAt: Date;
  then: Object | null;
  now: Object;
  rest: any;
}

// - ES Response
export interface IESResponse {
  statusCode: number;
}

// - SQS Receive Messages
export interface ISQSReceiveMessage {
  Messages: Array<ISQSMessages>;
}

// - SQS Receive Message
export interface ISQSMessages {
  Body: string;
  ReceiptHandle: string;
}

// - SQS Receive Message Body
export interface ISQSMessageBody {
  id: string;
  domain: EDomains;
}

// - SQS Event Trigger
export type TSQSEventTrigger<TEvent = SQSEvent> = (event: TEvent) => void | Promise<string | Error>;
