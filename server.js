var express = require('express');			// Import express
var bodyParser = require('body-parser');	// We use bodyParser to parse POST requests
var mongoose = require('mongoose');			// Import mongoose

mongoose.Promise = Promise;							// Set the default Promise handler to the global ES6 Promise.
mongoose.connect('mongodb://localhost/okcoders');	// Connect to the local MongoDB instance and use 'okcoders' as the database.

var app = express();								// Create our express application
app.use(express.static('./public'));				// Serve our static content out of public/
app.use(bodyParser());								// Use the bodyParser to parse our POST requests
app.listen(8080, function() {						// Start our server
	console.log('Listening on http://localhost:8080');
});

var Post = require('./models/post');				// Import our Post model (defined in models/post.js)

app.get('/posts', function(req,res) {				// Define a GET /posts route
	Post.find().exec().then(function(posts) {		// Find all posts
		res.json(posts);							// Return all posts found
	});
});

app.post('/posts', function(req,res) {				// Define a POST /posts route
	var post = new Post(req.body);					// Create a new post document from the body
	post.date = Date.now();
	post.save().then(function() {					// Save the post and then...
		res.json(true);								// Return true (true has no meaning here, we easily could return the post we just created)
	});
});