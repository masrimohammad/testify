import fs from 'fs';
import path from 'path';
import { generateDynamodbTableDefinition } from './dynamodb';
import { generateSNSDefinition } from './sns';
import { generateSQSDefinition } from './sqs';

export enum StackTypes {
  DYNAMODB_TABLE = 'AWS::DynamoDB::Table',
  SNS_TOPIC = 'AWS::SNS::Topic',
  SQS_QUEUE = 'AWS::SQS::Queue',
}

export const readDirectoryFiles = (directory: string, filter: string) => fs.readdirSync(directory)
  .filter(file => file.endsWith(filter))
  .map(file => path.join(directory, file));

export const generateStackDefinitions = (resourceName: string, resource: Record<string, any>) => {
  switch (resource.Type) {
    case StackTypes.DYNAMODB_TABLE:
      return generateDynamodbTableDefinition(resourceName, resource);
    case StackTypes.SNS_TOPIC:
      return generateSNSDefinition(resourceName, resource);
    case StackTypes.SQS_QUEUE:
      return generateSQSDefinition(resourceName, resource);
    default:
      return resource.Properties;
  }
};

export const sanitizeStackResources = (stack: Record<string, any>) => {
  const { Resources: resources } = stack;
  const resourceNames = Object.keys(resources);
  return resourceNames.map(resourceName => ({
    ...resources[resourceName],
    Definition: {
      ...generateStackDefinitions(resourceName, resources[resourceName]),
    },
  }));
};
