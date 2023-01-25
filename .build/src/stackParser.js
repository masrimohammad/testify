"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stackParser = exports.ymlStackParser = exports.cdkStackParser = exports.applyParserSideEffects = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./lib/utils");
const dynamodb_1 = require("./lib/dynamodb");
const sns_1 = require("./lib/sns");
const sqs_1 = require("./lib/sqs");
const { schema } = require('yaml-cfn');
const { safeLoad } = require('js-yaml');
const { execSync } = require('child_process');
const path = require('path');
const applyParserSideEffects = async (parsedStackResource) => {
    const { Type, Definition } = parsedStackResource;
    console.log(`${Type} stack resource definition %j:`);
    console.log(Definition);
    switch (Type) {
        case utils_1.StackTypes.DYNAMODB_TABLE:
            await (0, dynamodb_1.createTable)(Definition);
            break;
        case utils_1.StackTypes.SNS_TOPIC:
            await (0, sns_1.createTopic)(Definition);
            break;
        case utils_1.StackTypes.SQS_QUEUE:
            await (0, sqs_1.createQueue)(Definition);
            break;
        default:
            console.log(`no side effect to apply for ${Type}...`);
            break;
    }
};
exports.applyParserSideEffects = applyParserSideEffects;
const cdkStackParser = (directory, filter) => {
    // trigger cdk synth to get cloudformation template
    console.log('cdk synth in running, please wait...');
    execSync('cdk synth --no-staging');
    console.log('cdk template compilation is done, sanitizing templates...');
    // Read all stack definition files in the specified directory
    const stackFiles = (0, utils_1.readDirectoryFiles)(directory, filter || '.template.json');
    // Parse the stack definition files and
    return stackFiles.map((file) => {
        // remove extension from file name
        const fileName = path.parse(file).name;
        console.log('fileName', fileName);
        // Read and parse YAML file schema
        const jsonContent = fs_1.default.readFileSync(`${directory}/${fileName}.json`, 'utf8');
        const stack = JSON.parse(jsonContent);
        // Prepare and testify stack resource
        return (0, utils_1.sanitizeStackResources)(stack);
    }).flat();
};
exports.cdkStackParser = cdkStackParser;
const ymlStackParser = (directory, filter) => {
    // Read all stack definition files in the specified directory
    const stackFiles = (0, utils_1.readDirectoryFiles)(directory, filter || '.yml');
    // Parse the stack definition files and
    return stackFiles.map((file) => {
        // Read and parse YAML file schema
        const ymlContent = fs_1.default.readFileSync(file, 'utf8');
        const stack = safeLoad(ymlContent, { schema });
        // Prepare and testify stack resource
        return (0, utils_1.sanitizeStackResources)(stack);
    }).flat();
};
exports.ymlStackParser = ymlStackParser;
const stackParser = async (type, directory, filter) => {
    const parsedStackResources = type === 'cdk'
        ? (0, exports.cdkStackParser)(directory, filter)
        : (0, exports.ymlStackParser)(directory, filter);
    parsedStackResources.map(async (parsedStackResource) => (0, exports.applyParserSideEffects)(parsedStackResource));
};
exports.stackParser = stackParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2tQYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhY2tQYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQW9CO0FBQ3BCLHVDQUFxRjtBQUNyRiw2Q0FBNkM7QUFDN0MsbUNBQXdDO0FBQ3hDLG1DQUF3QztBQUV4QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUU5QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFdEIsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLEVBQUUsbUJBQXdDLEVBQUUsRUFBRTtJQUN2RixNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLG1CQUFtQixDQUFDO0lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGdDQUFnQyxDQUFDLENBQUM7SUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QixRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssa0JBQVUsQ0FBQyxjQUFjO1lBQzVCLE1BQU0sSUFBQSxzQkFBVyxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLE1BQU07UUFDUixLQUFLLGtCQUFVLENBQUMsU0FBUztZQUN2QixNQUFNLElBQUEsaUJBQVcsRUFBQyxVQUFVLENBQUMsQ0FBQztZQUM5QixNQUFNO1FBQ1IsS0FBSyxrQkFBVSxDQUFDLFNBQVM7WUFDdkIsTUFBTSxJQUFBLGlCQUFXLEVBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUIsTUFBTTtRQUNSO1lBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsSUFBSSxLQUFLLENBQUMsQ0FBQztZQUN0RCxNQUFNO0tBQ1Q7QUFDSCxDQUFDLENBQUM7QUFsQlcsUUFBQSxzQkFBc0IsMEJBa0JqQztBQUVLLE1BQU0sY0FBYyxHQUFHLENBQUMsU0FBaUIsRUFBRSxNQUFlLEVBQUUsRUFBRTtJQUNuRSxtREFBbUQ7SUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0lBQ3BELFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkRBQTJELENBQUMsQ0FBQztJQUV6RSw2REFBNkQ7SUFDN0QsTUFBTSxVQUFVLEdBQUcsSUFBQSwwQkFBa0IsRUFBQyxTQUFTLEVBQUUsTUFBTSxJQUFJLGdCQUFnQixDQUFDLENBQUM7SUFFN0UsdUNBQXVDO0lBQ3ZDLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzdCLGtDQUFrQztRQUNsQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVsQyxrQ0FBa0M7UUFDbEMsTUFBTSxXQUFXLEdBQUcsWUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLFNBQVMsSUFBSSxRQUFRLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXRDLHFDQUFxQztRQUNyQyxPQUFPLElBQUEsOEJBQXNCLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDWixDQUFDLENBQUM7QUF0QlcsUUFBQSxjQUFjLGtCQXNCekI7QUFFSyxNQUFNLGNBQWMsR0FBRyxDQUFDLFNBQWlCLEVBQUUsTUFBZSxFQUFFLEVBQUU7SUFDbkUsNkRBQTZEO0lBQzdELE1BQU0sVUFBVSxHQUFHLElBQUEsMEJBQWtCLEVBQUMsU0FBUyxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQztJQUVuRSx1Q0FBdUM7SUFDdkMsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDN0Isa0NBQWtDO1FBQ2xDLE1BQU0sVUFBVSxHQUFHLFlBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLHFDQUFxQztRQUNyQyxPQUFPLElBQUEsOEJBQXNCLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDWixDQUFDLENBQUM7QUFiVyxRQUFBLGNBQWMsa0JBYXpCO0FBRUssTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLElBQVksRUFBRSxTQUFpQixFQUFFLE1BQWUsRUFBRSxFQUFFO0lBQ3BGLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxLQUFLLEtBQUs7UUFDekMsQ0FBQyxDQUFDLElBQUEsc0JBQWMsRUFBQyxTQUFTLEVBQUUsTUFBTSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxJQUFBLHNCQUFjLEVBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsbUJBQW1CLEVBQUMsRUFBRSxDQUFDLElBQUEsOEJBQXNCLEVBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0FBQ3JHLENBQUMsQ0FBQztBQUxXLFFBQUEsV0FBVyxlQUt0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyByZWFkRGlyZWN0b3J5RmlsZXMsIHNhbml0aXplU3RhY2tSZXNvdXJjZXMsIFN0YWNrVHlwZXMgfSBmcm9tICcuL2xpYi91dGlscyc7XG5pbXBvcnQgeyBjcmVhdGVUYWJsZSB9IGZyb20gJy4vbGliL2R5bmFtb2RiJztcbmltcG9ydCB7IGNyZWF0ZVRvcGljIH0gZnJvbSAnLi9saWIvc25zJztcbmltcG9ydCB7IGNyZWF0ZVF1ZXVlIH0gZnJvbSAnLi9saWIvc3FzJztcblxuY29uc3QgeyBzY2hlbWEgfSA9IHJlcXVpcmUoJ3lhbWwtY2ZuJyk7XG5jb25zdCB7IHNhZmVMb2FkIH0gPSByZXF1aXJlKCdqcy15YW1sJyk7XG5jb25zdCB7IGV4ZWNTeW5jIH0gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJyk7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmV4cG9ydCBjb25zdCBhcHBseVBhcnNlclNpZGVFZmZlY3RzID0gYXN5bmMgKHBhcnNlZFN0YWNrUmVzb3VyY2U6IFJlY29yZDxzdHJpbmcsIGFueT4pID0+IHtcbiAgY29uc3QgeyBUeXBlLCBEZWZpbml0aW9uIH0gPSBwYXJzZWRTdGFja1Jlc291cmNlO1xuICBjb25zb2xlLmxvZyhgJHtUeXBlfSBzdGFjayByZXNvdXJjZSBkZWZpbml0aW9uICVqOmApO1xuICBjb25zb2xlLmxvZyhEZWZpbml0aW9uKTtcbiAgc3dpdGNoIChUeXBlKSB7XG4gICAgY2FzZSBTdGFja1R5cGVzLkRZTkFNT0RCX1RBQkxFOlxuICAgICAgYXdhaXQgY3JlYXRlVGFibGUoRGVmaW5pdGlvbik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFN0YWNrVHlwZXMuU05TX1RPUElDOlxuICAgICAgYXdhaXQgY3JlYXRlVG9waWMoRGVmaW5pdGlvbik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFN0YWNrVHlwZXMuU1FTX1FVRVVFOlxuICAgICAgYXdhaXQgY3JlYXRlUXVldWUoRGVmaW5pdGlvbik7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgY29uc29sZS5sb2coYG5vIHNpZGUgZWZmZWN0IHRvIGFwcGx5IGZvciAke1R5cGV9Li4uYCk7XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNka1N0YWNrUGFyc2VyID0gKGRpcmVjdG9yeTogc3RyaW5nLCBmaWx0ZXI/OiBzdHJpbmcpID0+IHtcbiAgLy8gdHJpZ2dlciBjZGsgc3ludGggdG8gZ2V0IGNsb3VkZm9ybWF0aW9uIHRlbXBsYXRlXG4gIGNvbnNvbGUubG9nKCdjZGsgc3ludGggaW4gcnVubmluZywgcGxlYXNlIHdhaXQuLi4nKTtcbiAgZXhlY1N5bmMoJ2NkayBzeW50aCAtLW5vLXN0YWdpbmcnKTtcbiAgY29uc29sZS5sb2coJ2NkayB0ZW1wbGF0ZSBjb21waWxhdGlvbiBpcyBkb25lLCBzYW5pdGl6aW5nIHRlbXBsYXRlcy4uLicpO1xuXG4gIC8vIFJlYWQgYWxsIHN0YWNrIGRlZmluaXRpb24gZmlsZXMgaW4gdGhlIHNwZWNpZmllZCBkaXJlY3RvcnlcbiAgY29uc3Qgc3RhY2tGaWxlcyA9IHJlYWREaXJlY3RvcnlGaWxlcyhkaXJlY3RvcnksIGZpbHRlciB8fCAnLnRlbXBsYXRlLmpzb24nKTtcblxuICAvLyBQYXJzZSB0aGUgc3RhY2sgZGVmaW5pdGlvbiBmaWxlcyBhbmRcbiAgcmV0dXJuIHN0YWNrRmlsZXMubWFwKChmaWxlKSA9PiB7XG4gICAgLy8gcmVtb3ZlIGV4dGVuc2lvbiBmcm9tIGZpbGUgbmFtZVxuICAgIGNvbnN0IGZpbGVOYW1lID0gcGF0aC5wYXJzZShmaWxlKS5uYW1lO1xuICAgIGNvbnNvbGUubG9nKCdmaWxlTmFtZScsIGZpbGVOYW1lKTtcblxuICAgIC8vIFJlYWQgYW5kIHBhcnNlIFlBTUwgZmlsZSBzY2hlbWFcbiAgICBjb25zdCBqc29uQ29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhgJHtkaXJlY3Rvcnl9LyR7ZmlsZU5hbWV9Lmpzb25gLCAndXRmOCcpO1xuICAgIGNvbnN0IHN0YWNrID0gSlNPTi5wYXJzZShqc29uQ29udGVudCk7XG5cbiAgICAvLyBQcmVwYXJlIGFuZCB0ZXN0aWZ5IHN0YWNrIHJlc291cmNlXG4gICAgcmV0dXJuIHNhbml0aXplU3RhY2tSZXNvdXJjZXMoc3RhY2spO1xuICB9KS5mbGF0KCk7XG59O1xuXG5leHBvcnQgY29uc3QgeW1sU3RhY2tQYXJzZXIgPSAoZGlyZWN0b3J5OiBzdHJpbmcsIGZpbHRlcj86IHN0cmluZykgPT4ge1xuICAvLyBSZWFkIGFsbCBzdGFjayBkZWZpbml0aW9uIGZpbGVzIGluIHRoZSBzcGVjaWZpZWQgZGlyZWN0b3J5XG4gIGNvbnN0IHN0YWNrRmlsZXMgPSByZWFkRGlyZWN0b3J5RmlsZXMoZGlyZWN0b3J5LCBmaWx0ZXIgfHwgJy55bWwnKTtcblxuICAvLyBQYXJzZSB0aGUgc3RhY2sgZGVmaW5pdGlvbiBmaWxlcyBhbmRcbiAgcmV0dXJuIHN0YWNrRmlsZXMubWFwKChmaWxlKSA9PiB7XG4gICAgLy8gUmVhZCBhbmQgcGFyc2UgWUFNTCBmaWxlIHNjaGVtYVxuICAgIGNvbnN0IHltbENvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZSwgJ3V0ZjgnKTtcbiAgICBjb25zdCBzdGFjayA9IHNhZmVMb2FkKHltbENvbnRlbnQsIHsgc2NoZW1hIH0pO1xuXG4gICAgLy8gUHJlcGFyZSBhbmQgdGVzdGlmeSBzdGFjayByZXNvdXJjZVxuICAgIHJldHVybiBzYW5pdGl6ZVN0YWNrUmVzb3VyY2VzKHN0YWNrKTtcbiAgfSkuZmxhdCgpO1xufTtcblxuZXhwb3J0IGNvbnN0IHN0YWNrUGFyc2VyID0gYXN5bmMgKHR5cGU6IHN0cmluZywgZGlyZWN0b3J5OiBzdHJpbmcsIGZpbHRlcj86IHN0cmluZykgPT4ge1xuICBjb25zdCBwYXJzZWRTdGFja1Jlc291cmNlcyA9IHR5cGUgPT09ICdjZGsnXG4gICAgPyBjZGtTdGFja1BhcnNlcihkaXJlY3RvcnksIGZpbHRlcilcbiAgICA6IHltbFN0YWNrUGFyc2VyKGRpcmVjdG9yeSwgZmlsdGVyKTtcbiAgcGFyc2VkU3RhY2tSZXNvdXJjZXMubWFwKGFzeW5jIHBhcnNlZFN0YWNrUmVzb3VyY2UgPT4gYXBwbHlQYXJzZXJTaWRlRWZmZWN0cyhwYXJzZWRTdGFja1Jlc291cmNlKSk7XG59O1xuIl19