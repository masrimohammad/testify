"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeStackResources = exports.generateStackDefinitions = exports.readDirectoryFiles = exports.StackTypes = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dynamodb_1 = require("./dynamodb");
const sns_1 = require("./sns");
const sqs_1 = require("./sqs");
var StackTypes;
(function (StackTypes) {
    StackTypes["DYNAMODB_TABLE"] = "AWS::DynamoDB::Table";
    StackTypes["SNS_TOPIC"] = "AWS::SNS::Topic";
    StackTypes["SQS_QUEUE"] = "AWS::SQS::Queue";
})(StackTypes = exports.StackTypes || (exports.StackTypes = {}));
const readDirectoryFiles = (directory, filter) => fs_1.default.readdirSync(directory)
    .filter(file => file.endsWith(filter))
    .map(file => path_1.default.join(directory, file));
exports.readDirectoryFiles = readDirectoryFiles;
const generateStackDefinitions = (resourceName, resource) => {
    switch (resource.Type) {
        case StackTypes.DYNAMODB_TABLE:
            return (0, dynamodb_1.generateDynamodbTableDefinition)(resourceName, resource);
        case StackTypes.SNS_TOPIC:
            return (0, sns_1.generateSNSDefinition)(resourceName, resource);
        case StackTypes.SQS_QUEUE:
            return (0, sqs_1.generateSQSDefinition)(resourceName, resource);
        default:
            return resource.Properties;
    }
};
exports.generateStackDefinitions = generateStackDefinitions;
const sanitizeStackResources = (stack) => {
    const { Resources: resources } = stack;
    const resourceNames = Object.keys(resources);
    return resourceNames.map(resourceName => ({
        ...resources[resourceName],
        Definition: {
            ...(0, exports.generateStackDefinitions)(resourceName, resources[resourceName]),
        },
    }));
};
exports.sanitizeStackResources = sanitizeStackResources;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRDQUFvQjtBQUNwQixnREFBd0I7QUFDeEIseUNBQTZEO0FBQzdELCtCQUE4QztBQUM5QywrQkFBOEM7QUFFOUMsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ3BCLHFEQUF1QyxDQUFBO0lBQ3ZDLDJDQUE2QixDQUFBO0lBQzdCLDJDQUE2QixDQUFBO0FBQy9CLENBQUMsRUFKVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUlyQjtBQUVNLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxTQUFpQixFQUFFLE1BQWMsRUFBRSxFQUFFLENBQUMsWUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7S0FDL0YsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNyQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBRjlCLFFBQUEsa0JBQWtCLHNCQUVZO0FBRXBDLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxZQUFvQixFQUFFLFFBQTZCLEVBQUUsRUFBRTtJQUM5RixRQUFRLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDckIsS0FBSyxVQUFVLENBQUMsY0FBYztZQUM1QixPQUFPLElBQUEsMENBQStCLEVBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLEtBQUssVUFBVSxDQUFDLFNBQVM7WUFDdkIsT0FBTyxJQUFBLDJCQUFxQixFQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN2RCxLQUFLLFVBQVUsQ0FBQyxTQUFTO1lBQ3ZCLE9BQU8sSUFBQSwyQkFBcUIsRUFBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdkQ7WUFDRSxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUM7S0FDOUI7QUFDSCxDQUFDLENBQUM7QUFYVyxRQUFBLHdCQUF3Qiw0QkFXbkM7QUFFSyxNQUFNLHNCQUFzQixHQUFHLENBQUMsS0FBMEIsRUFBRSxFQUFFO0lBQ25FLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ3ZDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0MsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUM7UUFDMUIsVUFBVSxFQUFFO1lBQ1YsR0FBRyxJQUFBLGdDQUF3QixFQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbkU7S0FDRixDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQztBQVRXLFFBQUEsc0JBQXNCLDBCQVNqQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGdlbmVyYXRlRHluYW1vZGJUYWJsZURlZmluaXRpb24gfSBmcm9tICcuL2R5bmFtb2RiJztcbmltcG9ydCB7IGdlbmVyYXRlU05TRGVmaW5pdGlvbiB9IGZyb20gJy4vc25zJztcbmltcG9ydCB7IGdlbmVyYXRlU1FTRGVmaW5pdGlvbiB9IGZyb20gJy4vc3FzJztcblxuZXhwb3J0IGVudW0gU3RhY2tUeXBlcyB7XG4gIERZTkFNT0RCX1RBQkxFID0gJ0FXUzo6RHluYW1vREI6OlRhYmxlJyxcbiAgU05TX1RPUElDID0gJ0FXUzo6U05TOjpUb3BpYycsXG4gIFNRU19RVUVVRSA9ICdBV1M6OlNRUzo6UXVldWUnLFxufVxuXG5leHBvcnQgY29uc3QgcmVhZERpcmVjdG9yeUZpbGVzID0gKGRpcmVjdG9yeTogc3RyaW5nLCBmaWx0ZXI6IHN0cmluZykgPT4gZnMucmVhZGRpclN5bmMoZGlyZWN0b3J5KVxuICAuZmlsdGVyKGZpbGUgPT4gZmlsZS5lbmRzV2l0aChmaWx0ZXIpKVxuICAubWFwKGZpbGUgPT4gcGF0aC5qb2luKGRpcmVjdG9yeSwgZmlsZSkpO1xuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTdGFja0RlZmluaXRpb25zID0gKHJlc291cmNlTmFtZTogc3RyaW5nLCByZXNvdXJjZTogUmVjb3JkPHN0cmluZywgYW55PikgPT4ge1xuICBzd2l0Y2ggKHJlc291cmNlLlR5cGUpIHtcbiAgICBjYXNlIFN0YWNrVHlwZXMuRFlOQU1PREJfVEFCTEU6XG4gICAgICByZXR1cm4gZ2VuZXJhdGVEeW5hbW9kYlRhYmxlRGVmaW5pdGlvbihyZXNvdXJjZU5hbWUsIHJlc291cmNlKTtcbiAgICBjYXNlIFN0YWNrVHlwZXMuU05TX1RPUElDOlxuICAgICAgcmV0dXJuIGdlbmVyYXRlU05TRGVmaW5pdGlvbihyZXNvdXJjZU5hbWUsIHJlc291cmNlKTtcbiAgICBjYXNlIFN0YWNrVHlwZXMuU1FTX1FVRVVFOlxuICAgICAgcmV0dXJuIGdlbmVyYXRlU1FTRGVmaW5pdGlvbihyZXNvdXJjZU5hbWUsIHJlc291cmNlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHJlc291cmNlLlByb3BlcnRpZXM7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzYW5pdGl6ZVN0YWNrUmVzb3VyY2VzID0gKHN0YWNrOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSA9PiB7XG4gIGNvbnN0IHsgUmVzb3VyY2VzOiByZXNvdXJjZXMgfSA9IHN0YWNrO1xuICBjb25zdCByZXNvdXJjZU5hbWVzID0gT2JqZWN0LmtleXMocmVzb3VyY2VzKTtcbiAgcmV0dXJuIHJlc291cmNlTmFtZXMubWFwKHJlc291cmNlTmFtZSA9PiAoe1xuICAgIC4uLnJlc291cmNlc1tyZXNvdXJjZU5hbWVdLFxuICAgIERlZmluaXRpb246IHtcbiAgICAgIC4uLmdlbmVyYXRlU3RhY2tEZWZpbml0aW9ucyhyZXNvdXJjZU5hbWUsIHJlc291cmNlc1tyZXNvdXJjZU5hbWVdKSxcbiAgICB9LFxuICB9KSk7XG59O1xuIl19