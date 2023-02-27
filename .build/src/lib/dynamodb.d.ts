import * as AWS from 'aws-sdk';
import { CreateTableInput } from 'aws-sdk/clients/dynamodb';
export declare const dynamodb: AWS.DynamoDB;
export declare const createTable: (tableInput: CreateTableInput) => Promise<void>;
export declare const generateDynamodbTableDefinition: (name: any, resource: any) => CreateTableInput;
