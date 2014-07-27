var Fiber = Npm.require('fibers');

var Yo = Npm.require('yo-api');

twit = new TwitMaker({
	consumer_key: Meteor.settings.twitterApiKey,
	consumer_secret: Meteor.settings.twitterApiSecret,
	access_token: Meteor.settings.twitterAccessToken,
	access_token_secret: Meteor.settings.twitterAccessSecret
});

Meteor.startup(function () {
	var stream = twit.stream('statuses/sample', {'language': 'en'});	

	stream.on('tweet', function(tweet) {
		Fiber(function() {
			Tweets.insert ({
				text: tweet.text
				});
		}).run();
	});
});