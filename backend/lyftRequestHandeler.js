// /* global configuration */
// var config = require('./config');
// var lyft = require('node-lyft');
// let defaultClient = lyft.ApiClient.instance;
//
// // Configure OAuth2 access token for authorization: User Authentication
// defaultClient.authentications['User Authentication'].accessToken = '3-LEGGED-OAUTH-TOKEN';
// let apiInstance = new lyft.UserApi();
//
// /**
// * REQUEST A LYFT RIDE
// */
// let request = new lyft.Ride('lyft', new lyft.Location(37.77663, -122.39227));
// request.destination = new lyft.Location(37.771, -122.39123);
//
// apiInstance.newRide(request).then((data) => {
//   console.log('API called successfully. Returned data: ' + data); //TODO instead of console send a message
// }, (error) => {
//   console.error(error);
// });
// 
// /**
// * CANCEL A LYFT RIDE
// */
//
// let id = "<ride_id>"; // String | The ID of the ride
//
// apiInstance.cancelRide(id).then(() => {
//   console.log('API called successfully.');
// }, (error) => {
//   console.error(error);
// });
