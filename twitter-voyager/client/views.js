Template.counter.count = function () {
	return Tweets.find().count();
};
Template.tweetList.tweet = function () {
	return Tweets.findOne();
};