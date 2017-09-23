var oa = require("./backend/oauth.js");
var lrh = require("./backend/lyftRequestHandeler.js");
var th = require("./backend/twilioHandler.js");
var http = require('http');
var express = require('express');
var messagingResponse = require('twilio').twiml.MessagingResponse;
var app = express();
var port = process.env.port || 5757

http.createServer(app).listen(port, function () {
  console.log("Express server listening on port "+port);
});

app.get("/", function(req, res){
  res.sendFile("./frontend/index.html");
});

app.get("/lyft", function(req, res){
  oa.handleAuthorization(req, res);
});

//TODO: Make it call twilio handeler
app.post('/sms', function(req, res) {
  var twiml = new messagingResponse();
  twiml.message('Baby carrots are just cut up normal carrots.');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
