require('dotenv').config();
//
const express = require('express');
const bodyParser = require('body-parser');
const WebClient = require('@slack/client').WebClient;
const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
var request = require("request");

// Retrieve bot token from dotenv file
const bot_token = process.env.SLACK_BOT_TOKEN || '';

// Authorization token
const auth_token = process.env.SLACK_AUTH_TOKEN || '';

// Verification token for Events Adapter, to make sure events we receive are from Slack
const slackEvents = createSlackEventAdapter(process.env.SLACK_VERIFICATION_TOKEN);

// Slack web client
const web = new WebClient(auth_token);
const bot = new WebClient(bot_token);

// Creates express app
const app = express();

// Use BodyParser for app
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// The port used for  Express server
const PORT = 4390;

let channel = '#general'
let botID;

// Starts server
// Starts our server
// Heroku dynamically assigns your app a port so must do OR statement
app.listen(process.env.PORT || PORT, function() {
  console.log('Bot is listening on port ' + PORT);

  // Get userID for bot
  bot.auth.test()
		.then((info) => {
			if (info.user_id) {
				botID = info.user_id;
			}
		})
		.catch(console.error)
});


app.post('/', (req, res) => {
var data = {form: {
      token: process.env.SLACK_AUTH_TOKEN,
      channel: "#general",
      text: "Hi! :wave: \n I'm your new bot."
    }};
request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
      // Sends welcome message
      res.json();
    });
});
