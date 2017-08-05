var fs = require('fs');
var express = require('express');

var app = express();

var options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'alex'
};


app.get('/', function (req, res) {
  res.send('Hello World!');
});
//listener
app.post('/api/test', function (req, res) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        console.log('/api/test');
        console.log(body);
    });

    res.writeHead(200);
    res.end();
});

var https = require('https');
https.createServer(options, app).listen(8001);