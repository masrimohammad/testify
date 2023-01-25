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
exports.generateDynamodbTableDefinition = exports.createTable = void 0;
const AWS = __importStar(require("aws-sdk"));
const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DYNAMODB_ENDPOINT_URL, } = process.env;
const dynamodb = new AWS.DynamoDB({
    region: AWS_REGION || 'someRegion',
    endpoint: AWS_DYNAMODB_ENDPOINT_URL || 'http://localhost:8000',
    accessKeyId: AWS_ACCESS_KEY_ID || 'someAccessKeyId',
    secretAccessKey: AWS_SECRET_ACCESS_KEY || 'someSecretAccessKey',
});
const createTable = async (tableInput) => {
    dynamodb.createTable(tableInput, (err) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1vZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2R5bmFtb2RiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStCO0FBRy9CLE1BQU0sRUFDSixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLHFCQUFxQixFQUNyQix5QkFBeUIsR0FDMUIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBRWhCLE1BQU0sUUFBUSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUNoQyxNQUFNLEVBQUUsVUFBVSxJQUFJLFlBQVk7SUFDbEMsUUFBUSxFQUFFLHlCQUF5QixJQUFJLHVCQUF1QjtJQUM5RCxXQUFXLEVBQUUsaUJBQWlCLElBQUksaUJBQWlCO0lBQ25ELGVBQWUsRUFBRSxxQkFBcUIsSUFBSSxxQkFBcUI7Q0FDaEUsQ0FBQyxDQUFDO0FBRUksTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLFVBQTRCLEVBQUUsRUFBRTtJQUNoRSxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3ZDLElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFSVyxRQUFBLFdBQVcsZUFRdEI7QUFFSyxNQUFNLCtCQUErQixHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBb0IsRUFBRSxDQUFDLENBQUM7SUFDcEYsR0FBRyxRQUFRLENBQUMsVUFBVTtJQUN0QixHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsSUFBSTtRQUM3QyxtQkFBbUIsRUFBRTtZQUNuQixHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsbUJBQW1CO1lBQzFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxJQUFJO2dCQUM3RCxhQUFhLEVBQUUsSUFBSTthQUNwQixDQUFDO1NBQ0g7S0FDRixDQUFDO0lBQ0YsU0FBUyxFQUFFLElBQUk7Q0FDaEIsQ0FBQyxDQUFDO0FBWFUsUUFBQSwrQkFBK0IsbUNBV3pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgQ3JlYXRlVGFibGVJbnB1dCB9IGZyb20gJ2F3cy1zZGsvY2xpZW50cy9keW5hbW9kYic7XG5cbmNvbnN0IHtcbiAgQVdTX1JFR0lPTixcbiAgQVdTX0FDQ0VTU19LRVlfSUQsXG4gIEFXU19TRUNSRVRfQUNDRVNTX0tFWSxcbiAgQVdTX0RZTkFNT0RCX0VORFBPSU5UX1VSTCxcbn0gPSBwcm9jZXNzLmVudjtcblxuY29uc3QgZHluYW1vZGIgPSBuZXcgQVdTLkR5bmFtb0RCKHtcbiAgcmVnaW9uOiBBV1NfUkVHSU9OIHx8ICdzb21lUmVnaW9uJyxcbiAgZW5kcG9pbnQ6IEFXU19EWU5BTU9EQl9FTkRQT0lOVF9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMCcsXG4gIGFjY2Vzc0tleUlkOiBBV1NfQUNDRVNTX0tFWV9JRCB8fCAnc29tZUFjY2Vzc0tleUlkJyxcbiAgc2VjcmV0QWNjZXNzS2V5OiBBV1NfU0VDUkVUX0FDQ0VTU19LRVkgfHwgJ3NvbWVTZWNyZXRBY2Nlc3NLZXknLFxufSk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVUYWJsZSA9IGFzeW5jICh0YWJsZUlucHV0OiBDcmVhdGVUYWJsZUlucHV0KSA9PiB7XG4gIGR5bmFtb2RiLmNyZWF0ZVRhYmxlKHRhYmxlSW5wdXQsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVyci5tZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1RoZSAlcyB0YWJsZSBoYXMgYmVlbiBjcmVhdGVkIScsIHRhYmxlSW5wdXQuVGFibGVOYW1lKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlRHluYW1vZGJUYWJsZURlZmluaXRpb24gPSAobmFtZSwgcmVzb3VyY2UpOiBDcmVhdGVUYWJsZUlucHV0ID0+ICh7XG4gIC4uLnJlc291cmNlLlByb3BlcnRpZXMsXG4gIC4uLihyZXNvdXJjZS5Qcm9wZXJ0aWVzLlN0cmVhbVNwZWNpZmljYXRpb24gJiYge1xuICAgIFN0cmVhbVNwZWNpZmljYXRpb246IHtcbiAgICAgIC4uLnJlc291cmNlLlByb3BlcnRpZXMuU3RyZWFtU3BlY2lmaWNhdGlvbixcbiAgICAgIC4uLighcmVzb3VyY2UuUHJvcGVydGllcy5TdHJlYW1TcGVjaWZpY2F0aW9uPy5TdHJlYW1FbmFibGVkICYmIHtcbiAgICAgICAgU3RyZWFtRW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0pLFxuICAgIH0sXG4gIH0pLFxuICBUYWJsZU5hbWU6IG5hbWUsXG59KTtcbiJdfQ==