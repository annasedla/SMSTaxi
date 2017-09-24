
/*Global Configuration*/

var request = require('request');
var lyft = require('node-lyft');
let defaultClient = lyft.ApiClient.instance;
var db = require ('../mydb.db');
var sqlite3 = require('sqlite3').verbose();

/**
* REQUEST A LYFT RIDE
*/

// Configure OAuth2 access token for authorization: User Authentication
let accessToken = defaultClient.authentications['User Authentication'].accessToken;
//let accessToken = db.run("SELECT access * FROM user_info ORDER BY id DESC LIMIT 1");
let ride = {'ride_type' : 'lyft', 'origin' : {'lat' : 37.77663, 'lng' : -122.39227 },  'destination' : {'lat' : 37.771, 'lng' : -122.39123, 'address' : 'Mission Bay Boulevard North' }};

let req = {
  method: 'post',
  body: ride,
  json: true,
  url: 'https://api.lyft.com/v1/rides',
  headers: {
    'Authorization': 'Bearer ' + accessToken
  }
}

function callback(error, response, body) {
  console.log(error);
  console.log(response);
  console.log(body);
}

request(req,callback);


/**
* CANCEL A LYFT RIDE
*/
/*
let id = "<ride_id>"; // String | The ID of the ride

apiInstance.cancelRide(id).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});*/
