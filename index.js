require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

// Creates express app
const app = express();
// The port used for Express server
const PORT = 4390;
// Starts server
app.listen(process.env.PORT || PORT, function() {
  console.log('Bot is listening on port ' + PORT);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  var data = {form: {
    token: process.env.SLACK_AUTH_TOKEN,
    channel: "#general",
    text: res.req.body.text,
  }};

  var originalChannel = res.req.body.channel_id;
  console.log(originalChannel);

  var originalUser = res.req.body.user_id;

  request.get('https://slack.com/api/conversations.list?token=' + process.env.SLACK_AUTH_TOKEN, function (req, res){

    let channels = JSON.parse(res.body).channels;
    let randomChannelNum = Math.floor(Math.random()*channels.length);
    let randomChannel = channels[randomChannelNum];
    data.form.channel = randomChannel.id;

    request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
      // console.log(res.channel);
    });

    // console.log(res);

    let funnyArray = [" rewired ", " beep booped ", " unfortunately headed out ", " yeeted "]
    var data2 = {form: {
      token: process.env.SLACK_AUTH_TOKEN,
      channel: originalChannel,
      text: "yPur mesAGe haas been" + funnyArray[Math.floor(Math.random()*funnyArray.length)]+ "to: #" + randomChannel.name,
      user: originalUser
    }};

    if (randomChannel.id == originalChannel) {
      data2.form.text = "luKC yyou! your msg made it bk to the same ChanNELllll wohoo , try again"
    }

    request.post('https://slack.com/api/chat.postEphemeral', data2, function (error, response, body) {
      // console.log(res.channel);
    });
  });
  res.end();
});
