var app = require('express')();

var sql = require('mssql');
var sqlInstance = require("mssql");
var bodyParser = require('body-parser');
var request = require('request')
var app = express()

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.post('/webhook', (req, res) => {
  var msg = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text, sender, replyToken)
  console.log(typeof sender, typeof text)
  // console.log(req.body.events[0])
          var conn = new sql.ConnectionPool(dbConfig);
          conn.connect().then(function () {
                        var req = new sql.Request(conn);
                        req.query('SELECT * FROM Question q_topic ='+msg).then(function (recordset) {
                          // res.send(recordset);
                              // res.send(recordset);
                              // conn.close();    
                              sendText(sender, msg)                
                        })
                        .catch(function (err) {
                            conn.close();
                            res.send(err);
                        });        
          })
          .catch(function (err) {
              res.send(err);
          });
  // if (msg === 'สวัสดี' || msg === 'Hello' || msg === 'hello') {
  //   sendText(sender, msg)
  // }
  res.sendStatus(200)
})

function sendText (sender, msg) {
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'สวัสดีค่ะ'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {Rz8z1ee8jjPGKgYsiVruxdBDpWA4ryYEh5QKu7KLtb4o1HN3h38LHyWUEoWYOGVolNmGP1fFw7UbxocelHU/0Y/j+b2/jch/cpqEW6dhyi8smlFI+vsQVttuzLtCZPHm5K7MNg39sFK7Z8jWxhv7ngdB04t89/1O/w1cDnyilFU=}'
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}

app.listen(port, function() {
  console.log('Starting node.js on port ' + port);
});

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})

