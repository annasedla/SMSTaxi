/*
* Handling communication between our server and twilio API
*/
exports.onSms = function(req, res){
	const MessagingResponse = require('twilio').twiml.MessagingResponse;
	const response = new MessagingResponse();
	const message = res.message();
	console.log("Message: " + message);
	message.body('test');
  twiml.message('connection test');
	response.redirect('https://taxisms.azurewebsites.net/sms');
	console.log(response.toString());
}

exports.sendMessage = function(number){
	var accountSid = 'AC1918662f562deac18b8766153be12b60'; 
	var authToken = 'f599c2a39a0a09e9084a34970697d982';

	var client = require('twilio')(accountSid, authToken);

	client.messages.create({
	    to: "+1" + number.toString(),
	    from: "+18448952275",
	    body: "Welcome to SMSTaxi! You can now message this number to call Lyft rides. To request a ride, text \"ride\".",
	}, function(err, message) {
	    console.log(message.sid);
	});
}
exports.replyMessage = function(req, res){
	console.log("test test test");
	//Twilio response. 
	// var http = require('http');
	// var express = require('express');
	var twilio = require('twilio');

	console.log("test part 2");
  // var twiml = new twilio.TwimlResponse();
  // console.log("test part 3")
  // twiml.message('The Robots are coming! Head for the hills!');
  // res.writeHead(200, {'Content-Type': 'text/xml'});
  // res.end(twiml.toString());
	
	var accountSid = 'AC1918662f562deac18b8766153be12b60'; 
	var authToken = 'f599c2a39a0a09e9084a34970697d982';

	var client = require('twilio')(accountSid, authToken);
	console.log("TO FIELD::" + req.query.From);
	client.messages.create({
	    to: req.query.From,
	    from: "+18448952275",
	    body: "Thank you for your request, we have found a driver and they are on their way. Please meet them at your pickup location.",
	}, function(err, message) {
	    console.log(message.sid);
	});
}
