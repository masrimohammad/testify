import * as AWS from 'aws-sdk';
import { CreateTableInput } from 'aws-sdk/clients/dynamodb';

const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_DYNAMODB_ENDPOINT_URL,
} = process.env;

const dynamodb = new AWS.DynamoDB({
  region: AWS_REGION || 'someRegion',
  endpoint: AWS_DYNAMODB_ENDPOINT_URL || 'http://localhost:8000',
  accessKeyId: AWS_ACCESS_KEY_ID || 'someAccessKeyId',
  secretAccessKey: AWS_SECRET_ACCESS_KEY || 'someSecretAccessKey',
});

export const createTable = async (tableInput: CreateTableInput) => {
  dynamodb.createTable(tableInput, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('The %s table has been created!', tableInput.TableName);
    }
  });
};

export const generateDynamodbTableDefinition = (name, resource): CreateTableInput => ({
  ...resource.Properties,
  ...(resource.Properties.StreamSpecification && {
    StreamSpecification: {
      ...resource.Properties.StreamSpecification,
      ...(!resource.Properties.StreamSpecification?.StreamEnabled && {
        StreamEnabled: true,
      }),
    },
  }),
  TableName: name,
});
