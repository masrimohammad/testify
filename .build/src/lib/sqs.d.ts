import { CreateQueueRequest } from 'aws-sdk/clients/sqs';
export declare const createQueue: (queueRequest: CreateQueueRequest) => Promise<void>;
export declare const generateSQSDefinition: (name: any, resource: any) => CreateQueueRequest;
