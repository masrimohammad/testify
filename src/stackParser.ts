import fs from 'fs';
import { readDirectoryFiles, sanitizeStackResources, StackTypes } from './lib/utils';
import { createTable } from './lib/dynamodb';
import { createTopic } from './lib/sns';
import { createQueue } from './lib/sqs';

const { schema } = require('yaml-cfn');
const { safeLoad } = require('js-yaml');
const { execSync } = require('child_process');

const path = require('path');

export const applyParserSideEffects = async (parsedStackResource: Record<string, any>) => {
  const { Type, Definition } = parsedStackResource;
  console.log(`${Type} stack resource definition %j:`);
  console.log(Definition);
  switch (Type) {
    case StackTypes.DYNAMODB_TABLE:
      await createTable(Definition);
      break;
    case StackTypes.SNS_TOPIC:
      await createTopic(Definition);
      break;
    case StackTypes.SQS_QUEUE:
      await createQueue(Definition);
      break;
    default:
      console.log(`no side effect to apply for ${Type}...`);
      break;
  }
};

export const cdkStackParser = (directory: string, filter?: string) => {
  // trigger cdk synth to get cloudformation template
  console.log('cdk synth in running, please be patient...');
  execSync('cdk synth --no-staging');
  console.log('cdk template compilation is done, sanitizing templates...');

  // Read all stack definition files in the specified directory
  const stackFiles = readDirectoryFiles(directory, filter || '.template.json');

  // Parse the stack definition files and
  return stackFiles.map((file) => {
    // remove extension from file name
    const fileName = path.parse(file).name;
    console.log('fileName', fileName);

    // Read and parse YAML file schema
    const jsonContent = fs.readFileSync(`${directory}/${fileName}.json`, 'utf8');
    const stack = JSON.parse(jsonContent);

    // Prepare and testify stack resource
    return sanitizeStackResources(stack);
  }).flat();
};

export const ymlStackParser = (directory: string, filter?: string) => {
  // Read all stack definition files in the specified directory
  const stackFiles = readDirectoryFiles(directory, filter || '.yml');

  // Parse the stack definition files and
  return stackFiles.map((file) => {
    // Read and parse YAML file schema
    const ymlContent = fs.readFileSync(file, 'utf8');
    const stack = safeLoad(ymlContent, { schema });

    // Prepare and testify stack resource
    return sanitizeStackResources(stack);
  }).flat();
};

export const stackParser = async (type: string, directory: string, filter?: string) => {
  const parsedStackResources = type === 'cdk'
    ? cdkStackParser(directory, filter)
    : ymlStackParser(directory, filter);
  parsedStackResources.map(async parsedStackResource => applyParserSideEffects(parsedStackResource));
};
