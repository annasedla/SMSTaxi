/*
* Handling communication between our server and twilio API
*/
exports.onSms = function(req, res){
	const MessagingResponse = require('twilio').twiml.MessagingResponse;
	const response = new MessagingResponse();
	const message = res.message();
	console.log("Message: " + message);
	message.body('test');
	response.redirect('https://taxisms.azurewebsites.net/sms');
	console.log(response.toString());
}

exports.sendMessage = function(number){
	var accountSid = 'AC1918662f562deac18b8766153be12b60'; 
	var authToken = 'f599c2a39a0a09e9084a34970697d982'; 
	 
	var client = require('twilio')(accountSid, authToken); 
	 
	client.messages.create({ 
	    to: "+1" + number, 
	    from: "+18448952275", 
	    body: "Welcome to SMSTaxi! You can now message this number to call Lyft rides. To request a ride, text \"ride\".", 
	}, function(err, message) { 
	    console.log(message.sid); 
	});
}
