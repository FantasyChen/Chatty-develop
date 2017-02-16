/**
 * Server Deployment
 * --------------
 * Created by: Lifan Chen, Max Mao, Xiaowen Mao
 * Last updated: Feb 10
 */
var PORT = 3000;

// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require('express');

// dependencies
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var index = require('./routes/index');
// Create the server instance
var app = express();

// Create MongoDB
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/Chatty-develop';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
	insertDocuments(db, function() {
    db.close();
  });
  // console.log("Connected successfully to server");
	// console.log(db.getCollectionNames());
});

//test
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length); //true
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

// Print logs to the console and compress pages we send
app.set('views', path.join(__dirname, 'views'));
app.use(express.logger());
app.use(express.compress());
app.engine('handlebars',handlebars());
app.set('view engine', 'handlebars');

// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
app.use(express.static(__dirname + '/static'));

// add routes here
app.get('/',index.view);

// Start the server
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
app.listen(port, function() {
	console.log("Node.js server running on port %s", port);
});
