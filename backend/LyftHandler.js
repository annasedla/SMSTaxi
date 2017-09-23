/*
* Handling communication between our server and lyft API
*/

var lyft = require('node-lyft');
var defaultClient = lyft.ApiClient.instance;

/*
* Authorization
*/

//if you're only using your Client Token for non-user specific endpoints, you can add that token directly
defaultClient.authentications['Client Authentication'].accessToken = 'YOUR-CLIENT-TOKEN';
//if you're using endpoints that require a user context, you need to get your token via three-legged OAuth, then add it here:
defaultClient.authentications['User Authentication'].accessToken = '3-LEGGED-OAUTH-TOKEN';

/*
*
*/
//create a new lyft-node PublicApi() instance
var lyftPublicApi = new lyft.PublicApi()
//the getETA endpoint works with both user and non-user context:
//leaving the options field empty {}
//and using promises/then to print out result
lyftPublicApi.getETA(37.7884, -122.4076, {}).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
  //send back to user's cellphone!
}, (error) => {
  console.error(error);
  //send back to user's cellphone!
});
