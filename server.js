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
var room = require('./routes/room');
var search = require('./routes/search');

// Create the server instance
var app = express();


// MongoDB Connection
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoURL = 'mongodb://fantasy:123456@ds153729.mlab.com:53729/chatty-develop'
mongoose.connect(mongoURL);

// Print logs to the console and compress pages we send
app.set('views', path.join(__dirname, 'views'));
app.use(express.logger());
app.use(express.compress());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
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

// index routes
app.get('/',index.view);

// room routes
app.get('/room/:program', room.view);
app.get('/favorites',index.favorites);
// app.get('/category', index.category);
app.get('/category', search.view);
app.get('/category/search', search.search);

app.get('/account', index.account);
app.get('/program', findProgram.program);
app.get('/account/login', login.view);
app.get('/account/session', login.session);
app.get('/account/login/user', login.log);


// Start the server
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
var server = app.listen(port, function() {
	console.log("Node.js server running on port %s", port);
});


// Start the socket
var io = require('socket.io')(server);
io.on('connection', // Chatroom sockets is handled here
function(socket){
  var room = "";
  socket.on("sendMsg", function(data){
    console.log("Server received message: " + data.content);
    socket.broadcast.to(room).emit('receiveMsg', data);   // broadcast the message to everyone in the room except self.
  });
  socket.on('login', function(data){
    console.log("An user have logged in");
    room = data.programName;
    socket.join(room, function(){
      var userCount = io.sockets.adapter.rooms[room].length;
      console.log(userCount);
      socket.to(room).emit("userJoined", userCount);
    });
  });
});
