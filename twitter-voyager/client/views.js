Template.counter.count = function () {
	return Tweets.find().count();
};
Template.tweetList.tweet = function () {
	var tweet = Tweets.findOne();
	return tweet;
};