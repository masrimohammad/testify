# AWS Cloudformation Template Stacks Parser (YML/CDK)

A cli tool to read aws cloudformation template yml stack files from a specific directory and converts it into `aws-sdk` compatible definitions to simplify replication.

### Setup Instructions
* make sure that `npm` is installed on your machine
* run `npm install .` in the cloned repo root directory
* run `npm install -g .` in the cloned repo root directory. (if you face any permission errors, please prepend `sudo` to this command)

### ENV
Make sure to set all required env params properly to ensure the success of replication

* AWS_REGION
* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* AWS_DYNAMODB_ENDPOINT_URL

### Usage
Below is an example about how to use the parser cli command.

`testify --type=cdk --directory=stacks --filter=someKeyword`
* **type:** cdk / yml
* **directory:** directory path containing the stack files (for cdk type, use the cdk build output directory)
* **filter:** any keyword you wish to filter directory files (**endsWith**) 

You can always call the below command to get a descriptive usage hints.
`testify --help`


### Support
Supported cloudformation templates:
* DynamoDB Tables
* SQS Queues
* SNS Notifications

_(more coming soon)_
