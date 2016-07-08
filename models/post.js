var mongoose = require('mongoose');

var Post = mongoose.model('Post', {		// Define a Post model with the schema below
	title: String,
	body: String,
	date: String
});

module.exports = Post;