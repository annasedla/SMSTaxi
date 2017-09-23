var lh = require("backend/LyftHandler.js");
var th = require("backend/TwilioHandler.js");
var http = require('http');
var express = require('express');
var twilio = require('twilio');

var app = express();

var port = process.env.port || 3001

http.createServer(app).listen(port, function () {
  console.log("Express server listening on port "+port);
});

app.get("/", function(req, res){
  res.sendfile("index.html");
});

app.get("/lyft", function(req, res){
  lh.getUser("14017145717", "1776");
});

app.post('/sms', function(req, res) {
  var twiml = new twilio.TwimlResponse();
  twiml.message('Baby carrots are just cut up normal carrots.');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
