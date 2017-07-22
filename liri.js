var http = require('http');

var Twitter = require('twitter');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
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
var movieName = '';
var queryUrl = '';
var omdbBody = '';

if(command === 'my-tweets'){
	params = {screen_name: 'donjohnsonvice'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for(i = 0; i < 19; i++){
				console.log('\n' + tweets[i].created_at + ': ' + tweets[i].text);
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
	    console.log('\nSong: ' + songData.name);
	    console.log('Artist: ' + songData.album.artists[0].name);
	    console.log('Album: ' + songData.album.name);
	    console.log('Link: ' + songData.external_urls.spotify);
	});
} else if (command === 'movie-this') {
	for (i = 3; i < process.argv.length; i++) {
		if (i !== process.argv.length-1){
			movieName += process.argv[i] + '+';
		} else {
			movieName += process.argv[i]
		}		
	};
	if(movieName !== ''){
		queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
		request(queryUrl, function(error, response, body) {
			if (!error && response.statusCode === 200){
				omdbBody = JSON.parse(body);
				console.log('\nTitle: ' + omdbBody.Title);
				console.log('Release Date: ' + omdbBody.Released);
				console.log('Actors: ' + omdbBody.Actors);
				console.log('Plot: ' + omdbBody.Plot);
				console.log('Made in: ' + omdbBody.Country);
				console.log('Language: ' + omdbBody.Language);
				console.log('imdb Rating: ' + omdbBody.imdbRating);
				console.log('Rotten Tomatoes Rating: ' + omdbBody.Ratings[1].Value);
			}
		});
	} else {
		queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece";
		request(queryUrl, function(error, response, body) {
			if (!error && response.statusCode === 200){
				omdbBody = JSON.parse(body);
				console.log('\nTitle: ' + omdbBody.Title);
				console.log('Release Date: ' + omdbBody.Released);
				console.log('Actors: ' + omdbBody.Actors);
				console.log('Plot: ' + omdbBody.Plot);
				console.log('Made in: ' + omdbBody.Country);
				console.log('Language: ' + omdbBody.Language);
				console.log('imdb Rating: ' + omdbBody.imdbRating);
				console.log('Rotten Tomatoes Rating: ' + omdbBody.Ratings[1].Value);
			}
		});
	};
} else if (command === 'do-what-it-says') {
	var songdata = '';
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
		return console.log(error);
		}
		songData = data;
		spotify.search({ type: 'track', query: songData}, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		    songData = data.tracks.items[0];
		    console.log('\nSong: ' + songData.name);
		    console.log('Artist: ' + songData.album.artists[0].name);
		    console.log('Album: ' + songData.album.name);
		    console.log('Link: ' + songData.external_urls.spotify);
		});
	});
};
