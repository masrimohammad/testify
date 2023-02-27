"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDynamodbTableDefinition = exports.createTable = exports.dynamodb = void 0;
const AWS = __importStar(require("aws-sdk"));
const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DYNAMODB_ENDPOINT_URL, } = process.env;
exports.dynamodb = new AWS.DynamoDB({
    region: AWS_REGION || 'someRegion',
    endpoint: AWS_DYNAMODB_ENDPOINT_URL || 'http://localhost:8000',
    accessKeyId: AWS_ACCESS_KEY_ID || 'someAccessKeyId',
    secretAccessKey: AWS_SECRET_ACCESS_KEY || 'someSecretAccessKey',
});
const createTable = async (tableInput) => {
    exports.dynamodb.createTable(tableInput, (err) => {
        if (err) {
            console.error(err.message);
        }
        else {
            console.log('The %s table has been created!', tableInput.TableName);
        }
    });
};
exports.createTable = createTable;
const generateDynamodbTableDefinition = (name, resource) => ({
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
exports.generateDynamodbTableDefinition = generateDynamodbTableDefinition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1vZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2R5bmFtb2RiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStCO0FBRy9CLE1BQU0sRUFDSixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHFCQUFxQixFQUNyQix5QkFBeUIsR0FDMUIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBRUgsUUFBQSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQ3ZDLE1BQU0sRUFBRSxVQUFVLElBQUksWUFBWTtJQUNsQyxRQUFRLEVBQUUseUJBQXlCLElBQUksdUJBQXVCO0lBQzlELFdBQVcsRUFBRSxpQkFBaUIsSUFBSSxpQkFBaUI7SUFDbkQsZUFBZSxFQUFFLHFCQUFxQixJQUFJLHFCQUFxQjtDQUNoRSxDQUFDLENBQUM7QUFFSSxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsVUFBNEIsRUFBRSxFQUFFO0lBQ2hFLGdCQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3ZDLElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFSVyxRQUFBLFdBQVcsZUFRdEI7QUFFSyxNQUFNLCtCQUErQixHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBb0IsRUFBRSxDQUFDLENBQUM7SUFDcEYsR0FBRyxRQUFRLENBQUMsVUFBVTtJQUN0QixHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsSUFBSTtRQUM3QyxtQkFBbUIsRUFBRTtZQUNuQixHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsbUJBQW1CO1lBQzFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxJQUFJO2dCQUM3RCxhQUFhLEVBQUUsSUFBSTthQUNwQixDQUFDO1NBQ0g7S0FDRixDQUFDO0lBQ0YsU0FBUyxFQUFFLElBQUk7Q0FDaEIsQ0FBQyxDQUFDO0FBWFUsUUFBQSwrQkFBK0IsbUNBV3pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgQ3JlYXRlVGFibGVJbnB1dCB9IGZyb20gJ2F3cy1zZGsvY2xpZW50cy9keW5hbW9kYic7XG5cbmNvbnN0IHtcbiAgQVdTX1JFR0lPTixcbiAgQVdTX0FDQ0VTU19LRVlfSUQsXG4gIEFXU19TRUNSRVRfQUNDRVNTX0tFWSxcbiAgQVdTX0RZTkFNT0RCX0VORFBPSU5UX1VSTCxcbn0gPSBwcm9jZXNzLmVudjtcblxuZXhwb3J0IGNvbnN0IGR5bmFtb2RiID0gbmV3IEFXUy5EeW5hbW9EQih7XG4gIHJlZ2lvbjogQVdTX1JFR0lPTiB8fCAnc29tZVJlZ2lvbicsXG4gIGVuZHBvaW50OiBBV1NfRFlOQU1PREJfRU5EUE9JTlRfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjgwMDAnLFxuICBhY2Nlc3NLZXlJZDogQVdTX0FDQ0VTU19LRVlfSUQgfHwgJ3NvbWVBY2Nlc3NLZXlJZCcsXG4gIHNlY3JldEFjY2Vzc0tleTogQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZIHx8ICdzb21lU2VjcmV0QWNjZXNzS2V5Jyxcbn0pO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVGFibGUgPSBhc3luYyAodGFibGVJbnB1dDogQ3JlYXRlVGFibGVJbnB1dCkgPT4ge1xuICBkeW5hbW9kYi5jcmVhdGVUYWJsZSh0YWJsZUlucHV0LCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIubWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdUaGUgJXMgdGFibGUgaGFzIGJlZW4gY3JlYXRlZCEnLCB0YWJsZUlucHV0LlRhYmxlTmFtZSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUR5bmFtb2RiVGFibGVEZWZpbml0aW9uID0gKG5hbWUsIHJlc291cmNlKTogQ3JlYXRlVGFibGVJbnB1dCA9PiAoe1xuICAuLi5yZXNvdXJjZS5Qcm9wZXJ0aWVzLFxuICAuLi4ocmVzb3VyY2UuUHJvcGVydGllcy5TdHJlYW1TcGVjaWZpY2F0aW9uICYmIHtcbiAgICBTdHJlYW1TcGVjaWZpY2F0aW9uOiB7XG4gICAgICAuLi5yZXNvdXJjZS5Qcm9wZXJ0aWVzLlN0cmVhbVNwZWNpZmljYXRpb24sXG4gICAgICAuLi4oIXJlc291cmNlLlByb3BlcnRpZXMuU3RyZWFtU3BlY2lmaWNhdGlvbj8uU3RyZWFtRW5hYmxlZCAmJiB7XG4gICAgICAgIFN0cmVhbUVuYWJsZWQ6IHRydWUsXG4gICAgICB9KSxcbiAgICB9LFxuICB9KSxcbiAgVGFibGVOYW1lOiBuYW1lLFxufSk7XG4iXX0=