var Twitter = require('twitter');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var command = process.argv[2];

var params = '';

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var spotify = new Spotify({
  id: keys.spotifyKeys.id,
  secret: keys.spotifyKeys.secret
});

var songData = '';
if(command === 'my-tweets'){
	params = {screen_name: 'donjohnsonvice'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for(i = 0; i < 19; i++){
				console.log(tweets[i].text);
			}   
		}
	});
} else if (command === 'spotify-this-song') {
	spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    songData = data.tracks.items[0];

	    // Artist Name
	    console.log(songData.album.artists[0].name);
	});
}

