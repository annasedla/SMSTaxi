/*
* Handling communication between our server and lyft API
*/

/* global configuration */
var config = require('config.js');

var lyft = require('node-lyft');
var defaultClient = lyft.ApiClient.instance;

/*
* Authorization
*/
exports.handleAuthorization = function (req, res, next) {
  /* generate state value */
  var state = Date.now().toString();
  /* store state in session */
  req.session.state = state;
  /* redirect with state */
  res.redirect(
    config.LYFT_API_URI + '/oauth/authorize'
    + '?client_id='     + config.LYFT_CLIENT_ID+"SANDBOX-" + config.LYFT_CLIENT_SECRET
    + '&response_type=' + 'code'
    + '&scope='         + 'offline%20public%20profile%20rides.read%20rides.request'
    + '&state='         + state
  );
};

exports.handleLanding = function (req, res, next) {
  /* compare session state to returned state */
  if (req.session.state === req.query.state) {
    /* state is valid; save code */
    req.session.lyftAuthorizationCode = req.query.code;
    /* NOTE:
     * You should store the code in a secure database. Keeping the authorization code in
     * the session alone is not particularly secure, and when it expires the user will
     * have to go through the oauth authorization process again. You can greatly improve
     * the user experience by storing that code securely with your own user_id
     * implementation. This is where you should do that.
     */
    res.redirect('/');
  } else {
    /* state is invalid; discard code */
    res.redirect('/');
  }
};

exports.handleRevocation = function (req, res, next) {
  res.redirect(
    config.LYFT_WWW_URI + '/connected-services'
  );
};

//if you're only using your Client Token for non-user specific endpoints, you can add that token directly
//defaultClient.authentications['Client Authentication'].accessToken = 'YOUR-CLIENT-TOKEN';
//if you're using endpoints that require a user context, you need to get your token via three-legged OAuth, then add it here:
//defaultClient.authentications['User Authentication'].accessToken = '3-LEGGED-OAUTH-TOKEN';

/*
* Requesting a ride
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
