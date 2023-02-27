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
const AWS = __importStar(require("aws-sdk"));
const dynamodb_1 = require("../../../../src/lib/dynamodb");
describe('dynamoDB', () => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient({ service: dynamodb_1.dynamodb });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1vREIudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2V4YW1wbGVzL2R5bmFtb0RiL3Rlc3QvaW50ZWdyYXRpb24vZHluYW1vREIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStCO0FBQy9CLDJEQUF3RDtBQUV4RCxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtJQUN4QixNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFRLEVBQUUsQ0FBQyxDQUFDO0lBRXhFLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7UUFDM0MsRUFBRSxDQUFDLDJCQUEyQixFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ3pDLE1BQU0sTUFBTSxHQUFHO2dCQUNiLFNBQVMsRUFBRSxZQUFZO2dCQUN2QixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7YUFDMUMsQ0FBQztZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxLQUFLLElBQUksRUFBRTtZQUN6QyxNQUFNLE1BQU0sR0FBRztnQkFDYixTQUFTLEVBQUUsWUFBWTtnQkFDdkIsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTthQUN2QixDQUFDO1lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLElBQUksRUFBRTtZQUM1QyxNQUFNLE1BQU0sR0FBRztnQkFDYixTQUFTLEVBQUUsWUFBWTtnQkFDdkIsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDdEIsZ0JBQWdCLEVBQUUsc0JBQXNCO2dCQUN4Qyx3QkFBd0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7Z0JBQzdDLHlCQUF5QixFQUFFLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRTtnQkFDckQsWUFBWSxFQUFFLFNBQVM7YUFDeEIsQ0FBQztZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2RCxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsOEJBQThCLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDNUMsTUFBTSxNQUFNLEdBQUc7Z0JBQ2IsU0FBUyxFQUFFLFlBQVk7Z0JBQ3ZCLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7YUFDdkIsQ0FBQztZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2RCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgeyBkeW5hbW9kYiB9IGZyb20gJy4uLy4uLy4uLy4uL3NyYy9saWIvZHluYW1vZGInO1xuXG5kZXNjcmliZSgnZHluYW1vREInLCAoKSA9PiB7XG4gIGNvbnN0IGR5bmFtb0RiID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7IHNlcnZpY2U6IGR5bmFtb2RiIH0pO1xuXG4gIGRlc2NyaWJlKCdVc2VycyB0YWJsZSBDUlVEIG9wZXJhdGlvbnMnLCAoKSA9PiB7XG4gICAgaXQoJ3Rlc3QgdGhhdCBpdCBwdXRzIGFuIGl0ZW0nLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIFRhYmxlTmFtZTogJ1VzZXJzVGFibGUnLFxuICAgICAgICBJdGVtOiB7IHVzZXJJZDogJzEyMycsIG5hbWU6ICdKb2huIERvZScgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkeW5hbW9EYi5wdXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICBleHBlY3QocmVzdWx0LiRyZXNwb25zZS5lcnJvcikudG9CZUZhbHN5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGVzdCB0aGF0IGl0IGdldHMgYW4gaXRlbScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgVGFibGVOYW1lOiAnVXNlcnNUYWJsZScsXG4gICAgICAgIEtleTogeyB1c2VySWQ6ICcxMjMnIH0sXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZHluYW1vRGIuZ2V0KHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgZXhwZWN0KHJlc3VsdC5JdGVtLm5hbWUpLnRvQmUoJ0pvaG4gRG9lJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndGVzdCB0aGF0IGl0IHVwZGF0ZXMgYW4gaXRlbScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgVGFibGVOYW1lOiAnVXNlcnNUYWJsZScsXG4gICAgICAgIEtleTogeyB1c2VySWQ6ICcxMjMnIH0sXG4gICAgICAgIFVwZGF0ZUV4cHJlc3Npb246ICdzZXQgI25hbWUgPSA6bmV3TmFtZScsXG4gICAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczogeyAnI25hbWUnOiAnbmFtZScgfSxcbiAgICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczogeyAnOm5ld05hbWUnOiAnSmFuZSBEb2UnIH0sXG4gICAgICAgIFJldHVyblZhbHVlczogJ0FMTF9ORVcnLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGR5bmFtb0RiLnVwZGF0ZShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIGV4cGVjdChyZXN1bHQuQXR0cmlidXRlcy5uYW1lKS50b0JlKCdKYW5lIERvZScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rlc3QgdGhhdCBpdCBkZWxldGVzIGFuIGl0ZW0nLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIFRhYmxlTmFtZTogJ1VzZXJzVGFibGUnLFxuICAgICAgICBLZXk6IHsgdXNlcklkOiAnMTIzJyB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGR5bmFtb0RiLmRlbGV0ZShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIGV4cGVjdChyZXN1bHQuJHJlc3BvbnNlLmVycm9yKS50b0JlRmFsc3koKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==