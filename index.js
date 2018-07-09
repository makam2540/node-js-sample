var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.use(bodyParser.json())
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', function(request, response) {
  response.send('Hello Worldaaaaaa!')
})

app.post('/webhook', (req, res) => {
    res.sendStatus(200)
})


// function sendText (sender, text) {
//   let data = {
//     to: sender,
//     messages: [
//       {
//         type: 'text',
//         text: 'สวัสดีค่ะ เราเป็นผู้ช่วยปรึกษาด้านความรัก สำหรับหมามิ้น 💞'
//       }
//     ]
//   }
//   request({
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer 7YR60AJ855Zu1Etxsc7aCdFqhip1o8yAKj7PzLe90ClE9Po0fz5o81BeghtpCki4+zFZ7FrYjjbrFvQw84+Axi+P1zWPnxSCTl/lF5gVTDaDqdC5IHk30qnjo7GQ1hHKizexgGNpBPn/Fwz3slJqkQdB04t89/1O/w1cDnyilFU='
//     },
//     url: 'https://api.line.me/v2/bot/message/push',
//     method: 'POST',
//     body: data,
//     json: true
//   }, function (err, res, body) {
//     if (err) console.log('error')
//     if (res) console.log('success')
//     if (body) console.log(body)
//   })
}


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

