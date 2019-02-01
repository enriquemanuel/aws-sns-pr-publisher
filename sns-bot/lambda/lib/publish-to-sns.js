module.exports = async (context) => {
  context.log("Loading Config...")
  const config = require('../../config.json');
  const pull_request = context.payload.pull_request

  var AWS = require('aws-sdk');

  context.log.info("Initializing AWS...")

  var payload = {
    default: {
      "pr_number" : pull_request.number,
      "pr_title" : pull_request.title,
      "pr_status" : pull_request.state,
      "pr_from_branch" : pull_request.head.ref,
      "pr_to_branch" : pull_request.base.ref,
      "repo" : pull_request.head.repo.name
    },
    lambda : {
      "pr_number" : pull_request.number,
      "pr_title" : pull_request.title,
      "pr_status" : pull_request.state,
      "pr_from_branch" : pull_request.head.ref,
      "pr_to_branch" : pull_request.base.ref,
      "repo" : pull_request.head.repo.name
    }
  }

  // first have to stringify the inner object...
  payload.default = JSON.stringify(payload.default);
  payload.lambda = JSON.stringify(payload.lambda);
  // then have to stringify the entire message payload
  payload = JSON.stringify(payload);

  var sns = new AWS.SNS();
  context.log.info("Sending SNS message...")

  var params = {
    Message: payload,
    MessageStructure: 'json',
    TopicArn: config.aws.topic_arn
  };


  var sns = new AWS.SNS();
  sns.publish( params, function(err, data)
  {
    if(err) {
        console.error('error publishing to SNS');
        console.log(err);

    } else {
        console.info('message published to SNS');
        return
    }
  });

}
