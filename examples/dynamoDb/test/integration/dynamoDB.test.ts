import * as AWS from 'aws-sdk';
import { dynamodb } from '../../../../src/lib/dynamodb';

describe('dynamoDB', () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient({ service: dynamodb });

  describe('Users table CRUD operations', () => {
    it('test that it puts an item', async () => {
      const params = {
        TableName: 'UsersTable',
        Item: { userId: '123', name: 'John Doe' },
      };
      const result = await dynamoDb.put(params).promise();
      expect(result.$response.error).toBeFalsy();
    });

    it('test that it gets an item', async () => {
      const params = {
        TableName: 'UsersTable',
        Key: { userId: '123' },
      };
      const result = await dynamoDb.get(params).promise();
      expect(result.Item.name).toBe('John Doe');
    });

    it('test that it updates an item', async () => {
      const params = {
        TableName: 'UsersTable',
        Key: { userId: '123' },
        UpdateExpression: 'set #name = :newName',
        ExpressionAttributeNames: { '#name': 'name' },
        ExpressionAttributeValues: { ':newName': 'Jane Doe' },
        ReturnValues: 'ALL_NEW',
      };
      const result = await dynamoDb.update(params).promise();
      expect(result.Attributes.name).toBe('Jane Doe');
    });

    it('test that it deletes an item', async () => {
      const params = {
        TableName: 'UsersTable',
        Key: { userId: '123' },
      };
      const result = await dynamoDb.delete(params).promise();
      expect(result.$response.error).toBeFalsy();
    });
  });
});
