import * as AWS from 'aws-sdk';
import { CreateTopicInput } from 'aws-sdk/clients/sns';

const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} = process.env;

const sns = new AWS.SNS({
  region: AWS_REGION || 'someRegion',
  accessKeyId: AWS_ACCESS_KEY_ID || 'someAccessKeyId',
  secretAccessKey: AWS_SECRET_ACCESS_KEY || 'someSecretAccessKey',
});

export const createTopic = async (topicInput: CreateTopicInput) => {
  sns.createTopic(topicInput, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('The %s topic has been created!', topicInput.Name);
    }
  });
};

export const generateSNSDefinition = (name, resource): CreateTopicInput => ({
  ...resource.Properties,
  Name: name,
});
