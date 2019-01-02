# AWS SNS PR Publisher
A bot built using [Probot](http://probot.github.io).

The bot will accept all Pull Request actions and forward them to a SNS topic.

This bot should be deployed to an external service, like [Heroku](http://heroku.com). This way you can limit the permissions assigned so they can be very specific to publish to a SNS topic.

As a second iteration, I will create a script to deploy it to [Heroku](http://heroku.com) in its own folder, and thus why this is project is sectioned in a folder called `sns-bot`

## Idea
The idea behind this project is to have a pass-thru connection to an internal Jenkins that can't receive any Github Pushes, so with this, we are implementing the webhooks to an intermediate step that will then get to a Pub/Sub and finally a Lambda that will send it to Jenkins.

*This is still an idea in progress, and should be consider in **beta** until fully published.*
