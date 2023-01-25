import * as AWS from 'aws-sdk';
import { CreateQueueRequest } from 'aws-sdk/clients/sqs';

const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} = process.env;

const sqs = new AWS.SQS({
  region: AWS_REGION || 'someRegion',
  accessKeyId: AWS_ACCESS_KEY_ID || 'someAccessKeyId',
  secretAccessKey: AWS_SECRET_ACCESS_KEY || 'someSecretAccessKey',
});

export const createQueue = async (queueRequest: CreateQueueRequest) => {
  sqs.createQueue(queueRequest, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('The %s queue has been created!', queueRequest.QueueName);
    }
  });
};

export const generateSQSDefinition = (name, resource): CreateQueueRequest => ({
  Attributes: {
    ...resource.Properties,
    ...(resource.Properties.VisibilityTimeout && {
      VisibilityTimeout: resource.Properties.VisibilityTimeout.toString(),
    }),
  },
  QueueName: name,
});
