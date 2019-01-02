module.exports = snsPublish

// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');

require('dotenv').config()

function snsPublish (app, context) {

  // Set Vars from the context
  pull_request = context.payload.pull_request

  // get everything that we need and construct message
  var message = {
    "pr_number" : pull_request.number,
    "pr_title" : pull_request.title,
    "pr_status" : pull_request.state,
    "pr_from_branch" : pull_request.head.ref,
    "pr_to_branch" : pull_request.base.ref,
    "repo" : pull_request.repo.name
  }

  // AWS Config
  aws_sak = process.env.AWS_SECRET_ACCESS_KEY
  aws_ski = process.env.AWS_SECRET_KEY_ID
  aws_region = process.env.AWS_REGION
  aws_topic_arn = process.env.AWS_TOPIC_ARN

  AWS.config.update({
    accessKeyId: aws_ski,
    secretAccessKey: aws_sak,
    region: aws_region
  });

  // Publish to SNS
  // Create publish parameters
  var params = {
    Message: message, /* required */
    TopicArn: aws_topic_arn
  };

  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

  // Handle promise's fulfilled/rejected states
  publishTextPromise.then(
    function(data) {
      app.log(`Message sent to the topic ${params.TopicArn}`);
      app.log("MessageID is " + data.MessageId);
    }).catch(
      function(err) {
      app.error(err, err.stack);
    });
}
