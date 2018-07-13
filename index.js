var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

var fs = require('fs')
const line = require('@line/bot-sdk');

var Q_id
var topic

var sql = require('mssql')
var sqlInstance = require("mssql")

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var port = process.env.PORT || 7777;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// connect to your database

 var dbConfig = {
                      user: 'sa',
                      password: 'P@ssw0rd1234',
                      server: 'demomagic2.southeastasia.cloudapp.azure.com', 
                      database: 'LinebotDB',
                      port:1433,
                      options: {
                          encrypt: true // Use this if you're on Windows Azure
                      }                      
    };

app.post('/webhook', (req, res) => {
//   var text = req.body.events[0].message.text
  var text = req.body.events[0].message.id
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken

  console.log(text, sender, replyToken)
  console.log(typeof sender, typeof text)
  // console.log(JSON.stringify(req.headers))

  req.setEncoding(text)

    sendText(sender, text)

  res.sendStatus(200)
})



function sendText (sender, msg) {

  const client = new line.Client({
    channelAccessToken : 'Rz8z1ee8jjPGKgYsiVruxdBDpWA4ryYEh5QKu7KLtb4o1HN3h38LHyWUEoWYOGVolNmGP1fFw7UbxocelHU/0Y/j+b2/jch/cpqEW6dhyi8smlFI+vsQVttuzLtCZPHm5K7MNg39sFK7Z8jWxhv7ngdB04t89/1O/w1cDnyilFU='
  });

  client.getMessageContent(msg)
  .then((stream) => {
    stream.on('data', (chunk) => {

      // data1 += chunk
                          let data = {
                            to: sender,
                            messages: [
                              {
                                type: "text",
                                text :  ''+ chunk
                                
                              }
                            ]
                          }
                  
                  request({
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer Rz8z1ee8jjPGKgYsiVruxdBDpWA4ryYEh5QKu7KLtb4o1HN3h38LHyWUEoWYOGVolNmGP1fFw7UbxocelHU/0Y/j+b2/jch/cpqEW6dhyi8smlFI+vsQVttuzLtCZPHm5K7MNg39sFK7Z8jWxhv7ngdB04t89/1O/w1cDnyilFU='
                    },
                    url: 'https://api.line.me/v2/bot/message/push',
                    method: 'POST',
                    body: data,
                    json: true
                  }, function (err, res, body) {
                    if (err) console.log('error')
                    if (res) console.log('success')
                    if (body) console.log(body)
                  })    // end request

                });
                stream.on('error', (err) => {
                  // error handling
                });
              });

} // end function



app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})

