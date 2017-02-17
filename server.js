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

// routes
var index = require('./routes/index');
var findProgram = require('./routes/findProgram');
var login = require('./routes/login');

// Create the server instance
var app = express();


// MongoDB Connection
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/Chatty');

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

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


/// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });


// add routes here
app.get('/',index.view);
app.get('/room',index.room);
app.get('/favorites',index.favorites);
app.get('/category', index.category);
app.get('/account', index.account);
app.get('/program', findProgram.program);
app.get('/account/login', login.view);
app.get('/account/session', login.session);
app.get('/account/login/user', login.log);


// Start the server
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
app.listen(port, function() {
	console.log("Node.js server running on port %s", port);
});
