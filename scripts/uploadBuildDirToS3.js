/**
 * We use this script instead of using AWS CLI directly because this
 * script allows us to dynamically get the correct access & secret
 * keys from .env. This is useful when working with different projects
 * that have different sets of keys.
 */

require('dotenv');
const {spawn} = require('child_process');

// Construct the command and then break down its arguments
const command = `cross-env AWS_DEFAULT_REGION=${process.env.AWS_REGION} AWS_ACCESS_KEY_ID=${process.env.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${process.env.AWS_SECRET_ACCESS_KEY} aws s3 sync build s3://${process.env.AWS_S3_BUCKET_NAME} --exclude .DS_Store`;
const commandArray = command.split(' ');
const primaryCommand = commandArray.shift();

const child = spawn(primaryCommand, commandArray);

child.on('data', console.log);
child.on('error', (error) => {
  console.error(error, error.stack);
  process.exit(1);
});
child.on('close', () =>
  console.log('Build directory was successfully uploaded to S3.'),
);
