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
exports.generateSNSDefinition = exports.createTopic = void 0;
const AWS = __importStar(require("aws-sdk"));
const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, } = process.env;
const sns = new AWS.SNS({
    region: AWS_REGION || 'someRegion',
    accessKeyId: AWS_ACCESS_KEY_ID || 'someAccessKeyId',
    secretAccessKey: AWS_SECRET_ACCESS_KEY || 'someSecretAccessKey',
});
const createTopic = async (topicInput) => {
    sns.createTopic(topicInput, (err) => {
        if (err) {
            console.error(err.message);
        }
        else {
            console.log('The %s topic has been created!', topicInput.Name);
        }
    });
};
exports.createTopic = createTopic;
const generateSNSDefinition = (name, resource) => ({
    ...resource.Properties,
    Name: name,
});
exports.generateSNSDefinition = generateSNSDefinition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFHL0IsTUFBTSxFQUNKLFVBQVUsRUFDVixpQkFBaUIsRUFDakIscUJBQXFCLEdBQ3RCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUVoQixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDdEIsTUFBTSxFQUFFLFVBQVUsSUFBSSxZQUFZO0lBQ2xDLFdBQVcsRUFBRSxpQkFBaUIsSUFBSSxpQkFBaUI7SUFDbkQsZUFBZSxFQUFFLHFCQUFxQixJQUFJLHFCQUFxQjtDQUNoRSxDQUFDLENBQUM7QUFFSSxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsVUFBNEIsRUFBRSxFQUFFO0lBQ2hFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxHQUFHLEVBQUU7WUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQVJXLFFBQUEsV0FBVyxlQVF0QjtBQUVLLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFvQixFQUFFLENBQUMsQ0FBQztJQUMxRSxHQUFHLFFBQVEsQ0FBQyxVQUFVO0lBQ3RCLElBQUksRUFBRSxJQUFJO0NBQ1gsQ0FBQyxDQUFDO0FBSFUsUUFBQSxxQkFBcUIseUJBRy9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgQ3JlYXRlVG9waWNJbnB1dCB9IGZyb20gJ2F3cy1zZGsvY2xpZW50cy9zbnMnO1xuXG5jb25zdCB7XG4gIEFXU19SRUdJT04sXG4gIEFXU19BQ0NFU1NfS0VZX0lELFxuICBBV1NfU0VDUkVUX0FDQ0VTU19LRVksXG59ID0gcHJvY2Vzcy5lbnY7XG5cbmNvbnN0IHNucyA9IG5ldyBBV1MuU05TKHtcbiAgcmVnaW9uOiBBV1NfUkVHSU9OIHx8ICdzb21lUmVnaW9uJyxcbiAgYWNjZXNzS2V5SWQ6IEFXU19BQ0NFU1NfS0VZX0lEIHx8ICdzb21lQWNjZXNzS2V5SWQnLFxuICBzZWNyZXRBY2Nlc3NLZXk6IEFXU19TRUNSRVRfQUNDRVNTX0tFWSB8fCAnc29tZVNlY3JldEFjY2Vzc0tleScsXG59KTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRvcGljID0gYXN5bmMgKHRvcGljSW5wdXQ6IENyZWF0ZVRvcGljSW5wdXQpID0+IHtcbiAgc25zLmNyZWF0ZVRvcGljKHRvcGljSW5wdXQsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVyci5tZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1RoZSAlcyB0b3BpYyBoYXMgYmVlbiBjcmVhdGVkIScsIHRvcGljSW5wdXQuTmFtZSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVNOU0RlZmluaXRpb24gPSAobmFtZSwgcmVzb3VyY2UpOiBDcmVhdGVUb3BpY0lucHV0ID0+ICh7XG4gIC4uLnJlc291cmNlLlByb3BlcnRpZXMsXG4gIE5hbWU6IG5hbWUsXG59KTtcbiJdfQ==