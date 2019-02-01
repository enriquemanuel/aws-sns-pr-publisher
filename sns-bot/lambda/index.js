const publisher = require('./lib/publish-to-sns')
module.exports = app => {
  app.log('Loaded probot App')
  app.on(['pull_request.assigned',
          'pull_request.unassigned',
          'pull_request.labeled',
          'pull_request.unlabeled',
          'pull_request.opened',
          'pull_request.edited',
          'pull_request.closed',
          'pull_request.reopened',
          'pull_request.synchronized',
          'pull_request.*' // future proofing in case there are more in the future
        ], publisher)
}
