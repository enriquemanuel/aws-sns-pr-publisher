const { serverless } = require('@probot/serverless-lambda')

// before even loading the app try loading the app
try {
  require('../config.json');
}
catch (e) {
  console.log("Error: "+ e)
  process.exit(1);
}

require('dotenv').config()
console.log(process.env.APP_ID)

const appFn = require('./')
module.exports.handler = serverless(appFn)
