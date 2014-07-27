Template.counter.count = function () {
	return Tweets.find().count();
};
Template.tweetList.tweet = function () {
	var tweet = Tweets.findOne();
	return tweet;
};
Template.controlPanel.events = {
	'click .start-collecting': function(event) {
		Meteor.call('startStream');
	},
	'click .stop-collecting': function(event) {
		Meteor.call('stopStream');
	}
}