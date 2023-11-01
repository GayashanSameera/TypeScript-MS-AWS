import 'source-map-support/register';
import { healthCheck, auditQl, getActivity, activityFilter } from './src/handlers/trailApi';
import { create, processDLQ, rotateES } from './src/handlers/trailEvent';

//- Health Handlers
export const healthCheckHandler: any = async (event: any, _context) => await healthCheck(event, _context, null);

export const auditQlHandler: any = async (event: any, _context) => await auditQl(event, _context, null);

export const getActivityHandler: any = async (event: any, _context) => getActivity(event, _context, null);

export const activityFilterHandler: any = async (event: any, _context) => activityFilter(event, _context, null);

//- Trail Events
export const createTrailHandler: any = async event => await create(event);

export const dlQHandler: any = processDLQ;

export const rotateESHandler: any = rotateES;
