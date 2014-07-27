var Fiber = Npm.require('fibers');

twit = new TwitMaker({
	consumer_key: Meteor.settings.twitterApiKey,
	consumer_secret: Meteor.settings.twitterApiSecret,
	access_token: Meteor.settings.twitterAccessToken,
	access_token_secret: Meteor.settings.twitterAccessSecret
});

Meteor.startup(function() {
	stream = undefined;
	
	voyager = new Voyager('voyagerjs.com', 'ba1948e7c6a819c294c1db67');
	
	voyager.on('saveMe', function(eventId,eventData) {

		console.log(eventData.direction, eventData.currentValue);

		if (eventData.direction === 'over') {
			
			voyager.log('error', "Threshold triggered: stream stopped and tweets deleted.")

			Meteor.call('stopStream');

			Meteor.call('removeAllTweets');
		}							

		voyager.eventCompleted(eventId);
	})
})

Meteor.methods({
	startStream: function() {

		voyager.log('debug', 'We\'re trying to start the stream!')

		if (!stream) {

			voyager.log('debug', 'Starting the stream.')

			stream = twit.stream('statuses/sample', {'language': 'en'});	

			stream.on('tweet', function(tweet) {
				Fiber(function() {
					
					if (Math.random() > 0.5) {
						Tweets.insert ({
						text: tweet.text
						});
					}
				}).run();
			});
		} else {
			voyager.log('debug', 'Using the restart.')
			stream.start();
		}
	},
	stopStream: function() {

		voyager.log('debug', 'Stopping stream')

		if (!!stream) {
			voyager.log('debug', 'Actually stopping')
			stream.stop();
		}
	},
	removeAllTweets: function() {
		Tweets.remove({});
	}
})