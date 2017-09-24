/*
* Handling communication between our server and twilio API
*/

const MessagingResponse = require('twilio').twiml.MessagingResponse;

const response = new MessagingResponse();
const message = response.message();
message.body('Hello World!');
response.redirect('https://taxisms.azurewebsites.net/sms');

console.log(response.toString());

