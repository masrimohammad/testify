export declare enum StackTypes {
    DYNAMODB_TABLE = "AWS::DynamoDB::Table",
    SNS_TOPIC = "AWS::SNS::Topic",
    SQS_QUEUE = "AWS::SQS::Queue"
}
export declare const readDirectoryFiles: (directory: string, filter: string) => string[];
export declare const generateStackDefinitions: (resourceName: string, resource: Record<string, any>) => any;
export declare const sanitizeStackResources: (stack: Record<string, any>) => any[];
