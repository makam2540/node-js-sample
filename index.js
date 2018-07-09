const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    var sender = req.body.events[0].source.userId

    reply(reply_token, msg)
    console.log(typeof sender, typeof text)

    res.sendStatus(200)
})

app.listen(port)
function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {Rz8z1ee8jjPGKgYsiVruxdBDpWA4ryYEh5QKu7KLtb4o1HN3h38LHyWUEoWYOGVolNmGP1fFw7UbxocelHU/0Y/j+b2/jch/cpqEW6dhyi8smlFI+vsQVttuzLtCZPHm5K7MNg39sFK7Z8jWxhv7ngdB04t89/1O/w1cDnyilFU=}'
    }
    
    if (msg === 'สวัสดี') {
      sendText(sender, text)
    }
    res.sendStatus(200)
  }
        
  function sendText (sender, text) {
    let data = {
      to: sender,
      messages: [
        {
          type: 'text',
          text: 'สวัสดีค่ะ'
        }
      ]
    }

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
