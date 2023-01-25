import { stackParser } from './src/stackParser';

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

const {
  type,
  directory,
  filter,
} = argv;

stackParser(type, directory, filter);
