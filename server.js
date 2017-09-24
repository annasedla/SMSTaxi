var oa = require("./backend/oauth.js");
var lrh = require("./backend/lyftRequestHandeler.js");
var th = require("./backend/twilioHandler.js");
var http = require('http');
var express = require('express');
var messagingResponse = require('twilio').twiml.MessagingResponse;
var app = express();
var port = process.env.PORT || 5757;
//new database
var sqlite3 = require('sqlite3').verbose(); //variables for databases
var db = new sqlite3.Database('mydb.db');


//connect database
/*
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var dburl = 'mongodb://13.72.76.129:27017';
MongoClient.connect(dburl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongo");
  db.close();
});
*/

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
  oa.finalAuthorization(req, res);
});

app.get("/lyft", function(req,res){
//  oa.handleAuthorization(req, res, request.query.state);
oa.handleAuthorization(req,res);
  /*
  *Sending information that is filled out in the form into the database
  */
      // intergrating databases
      db.serialize(function() {
        var name = req.param('name'); // database columns
        var number = req.param('phoneNumber');


        db.run("CREATE TABLE if not exists user_info (id INTEGER primary key, name TEXT, phoneNumber TEXT");
        var stmt = db.prepare("INSERT INTO user_info (name, phoneNumber) VALUES (?, ?)");
        stmt.run([name, phoneNumber]);
        stmt.finalize();
      });
});

app.post('/sms', function(req, res) {
  th.onSms(req, res);
});
