var http = require('http');
var express = require('express');
var twilio = require('twilio');

var app = express();

http.createServer(app).listen(1337, function () {
  console.log("Express server listening on port 1337");
});

app.post('/sms', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  twiml.message('Baby carrots are just cut up normal carrots.');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
