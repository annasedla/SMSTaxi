var oa = require("./backend/oauth.js");
var lrh = require("./backend/lyftRequestHandeler.js");
var th = require("./backend/twilioHandler.js");
var http = require('http');
var express = require('express');
var messagingResponse = require('twilio').twiml.MessagingResponse;
var app = express();
var port = process.env.PORT || 5757;

//connect database
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var dburl = 'mongodb://13.72.76.129:27017';
MongoClient.connect(dburl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongo");
  db.close();
});

http.createServer(app).listen(port, function () {
  console.log("Express server listening on port "+port);
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/confirmed", function(req,res){
  if(req.query){
    res.send(req.query);
  }
});

app.get("/lyft", function(req,res){
  oa.handleAuthorization(req, res)
});

//TODO: Make it call twilio handeler
app.post('/sms', function(req, res) {
  var twiml = new messagingResponse();
  twiml.message('Baby carrots are just cut up normal carrots.');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
