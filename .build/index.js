"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stackParser_1 = require("./src/stackParser");
const yargs = require('yargs');
// Define the command and its options
const { argv } = yargs
    .option('type', {
    demandOption: true,
    type: 'string',
    describe: 'Type of stacks to extract aws cloudformation template from',
    choices: ['cdk', 'yml'],
})
    .option('directory', {
    demandOption: true,
    type: 'string',
    describe: 'Directory to read aws stack definition files from',
})
    .option('filter', {
    demandOption: false,
    type: 'string',
    describe: 'files end-with keyword filter',
})
    .help();
const { type, directory, filter, } = argv;
(0, stackParser_1.stackParser)(type, directory, filter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUVoRCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFL0IscUNBQXFDO0FBQ3JDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxLQUFLO0tBQ25CLE1BQU0sQ0FBQyxNQUFNLEVBQUU7SUFDZCxZQUFZLEVBQUUsSUFBSTtJQUNsQixJQUFJLEVBQUUsUUFBUTtJQUNkLFFBQVEsRUFBRSw0REFBNEQ7SUFDdEUsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztDQUN4QixDQUFDO0tBQ0QsTUFBTSxDQUFDLFdBQVcsRUFBRTtJQUNuQixZQUFZLEVBQUUsSUFBSTtJQUNsQixJQUFJLEVBQUUsUUFBUTtJQUNkLFFBQVEsRUFBRSxtREFBbUQ7Q0FDOUQsQ0FBQztLQUNELE1BQU0sQ0FBQyxRQUFRLEVBQUU7SUFDaEIsWUFBWSxFQUFFLEtBQUs7SUFDbkIsSUFBSSxFQUFFLFFBQVE7SUFDZCxRQUFRLEVBQUUsK0JBQStCO0NBQzFDLENBQUM7S0FDRCxJQUFJLEVBQUUsQ0FBQztBQUVWLE1BQU0sRUFDSixJQUFJLEVBQ0osU0FBUyxFQUNULE1BQU0sR0FDUCxHQUFHLElBQUksQ0FBQztBQUVULElBQUEseUJBQVcsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3RhY2tQYXJzZXIgfSBmcm9tICcuL3NyYy9zdGFja1BhcnNlcic7XG5cbmNvbnN0IHlhcmdzID0gcmVxdWlyZSgneWFyZ3MnKTtcblxuLy8gRGVmaW5lIHRoZSBjb21tYW5kIGFuZCBpdHMgb3B0aW9uc1xuY29uc3QgeyBhcmd2IH0gPSB5YXJnc1xuICAub3B0aW9uKCd0eXBlJywge1xuICAgIGRlbWFuZE9wdGlvbjogdHJ1ZSxcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZXNjcmliZTogJ1R5cGUgb2Ygc3RhY2tzIHRvIGV4dHJhY3QgYXdzIGNsb3VkZm9ybWF0aW9uIHRlbXBsYXRlIGZyb20nLFxuICAgIGNob2ljZXM6IFsnY2RrJywgJ3ltbCddLFxuICB9KVxuICAub3B0aW9uKCdkaXJlY3RvcnknLCB7XG4gICAgZGVtYW5kT3B0aW9uOiB0cnVlLFxuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlc2NyaWJlOiAnRGlyZWN0b3J5IHRvIHJlYWQgYXdzIHN0YWNrIGRlZmluaXRpb24gZmlsZXMgZnJvbScsXG4gIH0pXG4gIC5vcHRpb24oJ2ZpbHRlcicsIHtcbiAgICBkZW1hbmRPcHRpb246IGZhbHNlLFxuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlc2NyaWJlOiAnZmlsZXMgZW5kLXdpdGgga2V5d29yZCBmaWx0ZXInLFxuICB9KVxuICAuaGVscCgpO1xuXG5jb25zdCB7XG4gIHR5cGUsXG4gIGRpcmVjdG9yeSxcbiAgZmlsdGVyLFxufSA9IGFyZ3Y7XG5cbnN0YWNrUGFyc2VyKHR5cGUsIGRpcmVjdG9yeSwgZmlsdGVyKTtcbiJdfQ==