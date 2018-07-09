const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000

var app = require('express')();
var sql = require('mssql');
var sqlInstance = require("mssql");
// var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
// var port = process.env.PORT || 7777;

var arrName = [];
var arraName = [];
// parse application/json

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

var dbConfig = {
        user: 'sa',
        password: 'p@ssw0rd',
        server: 'localhost', 
        database: 'DB1',
        port:1433,
        options: {
            encrypt: false // Use this if you're on Windows Azure
        }
};

var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
    user: 'predapon.t@gmail.com',
    pass: 'prem0197'
}
});



app.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1>');
});


app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)

    res.sendStatus(200)
})


app.listen(port)
function reply(reply_token,req,res) {
  var conn = new sql.ConnectionPool(dbConfig);
        conn.connect().then(function () {
                  var req = new sql.Request(conn);
                  req.query('SELECT * FROM Customer').then(function (rows) {
                        let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: rows
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
                          conn.close();                    
                  })
        })
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {7YR60AJ855Zu1Etxsc7aCdFqhip1o8yAKj7PzLe90ClE9Po0fz5o81BeghtpCki4+zFZ7FrYjjbrFvQw84+Axi+P1zWPnxSCTl/lF5gVTDaDqdC5IHk30qnjo7GQ1hHKizexgGNpBPn/Fwz3slJqkQdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: rows
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
