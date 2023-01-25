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
exports.generateSQSDefinition = exports.createQueue = void 0;
const AWS = __importStar(require("aws-sdk"));
const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, } = process.env;
const sqs = new AWS.SQS({
    region: AWS_REGION || 'someRegion',
    accessKeyId: AWS_ACCESS_KEY_ID || 'someAccessKeyId',
    secretAccessKey: AWS_SECRET_ACCESS_KEY || 'someSecretAccessKey',
});
const createQueue = async (queueRequest) => {
    sqs.createQueue(queueRequest, (err) => {
        if (err) {
            console.error(err.message);
        }
        else {
            console.log('The %s queue has been created!', queueRequest.QueueName);
        }
    });
};
exports.createQueue = createQueue;
const generateSQSDefinition = (name, resource) => ({
    Attributes: {
        ...resource.Properties,
        ...(resource.Properties.VisibilityTimeout && {
            VisibilityTimeout: resource.Properties.VisibilityTimeout.toString(),
        }),
    },
    QueueName: name,
});
exports.generateSQSDefinition = generateSQSDefinition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zcXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFHL0IsTUFBTSxFQUNKLFVBQVUsRUFDVixpQkFBaUIsRUFDakIscUJBQXFCLEdBQ3RCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUVoQixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDdEIsTUFBTSxFQUFFLFVBQVUsSUFBSSxZQUFZO0lBQ2xDLFdBQVcsRUFBRSxpQkFBaUIsSUFBSSxpQkFBaUI7SUFDbkQsZUFBZSxFQUFFLHFCQUFxQixJQUFJLHFCQUFxQjtDQUNoRSxDQUFDLENBQUM7QUFFSSxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsWUFBZ0MsRUFBRSxFQUFFO0lBQ3BFLEdBQUcsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxHQUFHLEVBQUU7WUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdkU7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQVJXLFFBQUEsV0FBVyxlQVF0QjtBQUVLLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFzQixFQUFFLENBQUMsQ0FBQztJQUM1RSxVQUFVLEVBQUU7UUFDVixHQUFHLFFBQVEsQ0FBQyxVQUFVO1FBQ3RCLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGlCQUFpQixJQUFJO1lBQzNDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFO1NBQ3BFLENBQUM7S0FDSDtJQUNELFNBQVMsRUFBRSxJQUFJO0NBQ2hCLENBQUMsQ0FBQztBQVJVLFFBQUEscUJBQXFCLHlCQVEvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEFXUyBmcm9tICdhd3Mtc2RrJztcbmltcG9ydCB7IENyZWF0ZVF1ZXVlUmVxdWVzdCB9IGZyb20gJ2F3cy1zZGsvY2xpZW50cy9zcXMnO1xuXG5jb25zdCB7XG4gIEFXU19SRUdJT04sXG4gIEFXU19BQ0NFU1NfS0VZX0lELFxuICBBV1NfU0VDUkVUX0FDQ0VTU19LRVksXG59ID0gcHJvY2Vzcy5lbnY7XG5cbmNvbnN0IHNxcyA9IG5ldyBBV1MuU1FTKHtcbiAgcmVnaW9uOiBBV1NfUkVHSU9OIHx8ICdzb21lUmVnaW9uJyxcbiAgYWNjZXNzS2V5SWQ6IEFXU19BQ0NFU1NfS0VZX0lEIHx8ICdzb21lQWNjZXNzS2V5SWQnLFxuICBzZWNyZXRBY2Nlc3NLZXk6IEFXU19TRUNSRVRfQUNDRVNTX0tFWSB8fCAnc29tZVNlY3JldEFjY2Vzc0tleScsXG59KTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVF1ZXVlID0gYXN5bmMgKHF1ZXVlUmVxdWVzdDogQ3JlYXRlUXVldWVSZXF1ZXN0KSA9PiB7XG4gIHNxcy5jcmVhdGVRdWV1ZShxdWV1ZVJlcXVlc3QsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVyci5tZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1RoZSAlcyBxdWV1ZSBoYXMgYmVlbiBjcmVhdGVkIScsIHF1ZXVlUmVxdWVzdC5RdWV1ZU5hbWUpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTUVNEZWZpbml0aW9uID0gKG5hbWUsIHJlc291cmNlKTogQ3JlYXRlUXVldWVSZXF1ZXN0ID0+ICh7XG4gIEF0dHJpYnV0ZXM6IHtcbiAgICAuLi5yZXNvdXJjZS5Qcm9wZXJ0aWVzLFxuICAgIC4uLihyZXNvdXJjZS5Qcm9wZXJ0aWVzLlZpc2liaWxpdHlUaW1lb3V0ICYmIHtcbiAgICAgIFZpc2liaWxpdHlUaW1lb3V0OiByZXNvdXJjZS5Qcm9wZXJ0aWVzLlZpc2liaWxpdHlUaW1lb3V0LnRvU3RyaW5nKCksXG4gICAgfSksXG4gIH0sXG4gIFF1ZXVlTmFtZTogbmFtZSxcbn0pO1xuIl19