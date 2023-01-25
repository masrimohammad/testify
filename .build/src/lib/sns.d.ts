import { CreateTopicInput } from 'aws-sdk/clients/sns';
export declare const createTopic: (topicInput: CreateTopicInput) => Promise<void>;
export declare const generateSNSDefinition: (name: any, resource: any) => CreateTopicInput;
