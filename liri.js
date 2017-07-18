var Twitter = require('twitter');
var keys = require("./keys.js");

// How do I access this object with the new twitter() around the object?
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

console.log(client.options.consumer_key);
console.log(client.options.consumer_secret);
console.log(client.options.access_token_key);
console.log(client.options.access_token_secret);

// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
// 	if (!error) {
// 	console.log(tweets);
// 	}
// });