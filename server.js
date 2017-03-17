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
var passport = require('passport');


// routes
var index = require('./routes/index');
var login = require('./routes/login');
var room = require('./routes/room');
var search = require('./routes/search');
var models = require('./model');
var contact = require('./routes/contact');
// Create the server instance
var app = express();


// MongoDB Connection
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoURL = 'mongodb://fantasy:123456@ds153729.mlab.com:53729/chatty-develop'
mongoose.connect(mongoURL);


// User authentication
// Express and Passport Session
var session = require('express-session');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	{
		usernameField:'username',
		passwordField:'password'
	},
  function(username, password, done) {
    models.User.findOne({ 'userID': username }, function(err, user) {
      if (err) {return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (user.pwd!= password) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
	  models.User.findOne({'userID':user.userID}, function (err, user) {
		done(err, user);
	});
});


app.use(session({secret: "Fantasy is awesome"}));
app.use(passport.initialize());
app.use(passport.session());


// Print logs to the console and compress pages we send
app.set('views', path.join(__dirname, 'views'));
app.use(express.logger());
app.use(express.compress());
app.use(express.bodyParser({uploadDir:'./static/img/upload'}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.engine('handlebars',handlebars());
app.set('view engine', 'handlebars');

// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
app.use(express.static(__dirname + '/static'));




// add routes here

// index routes
app.get('/',login.view);
app.get('/index',index.view2);


// room routes
app.get('/room/:program', room.view);
app.get('/favorites',index.favorites);
app.get('/category', search.view);
app.get('/category/search', search.search);
app.get('/account', index.account);

// for submit contact form
app.get('/contact',contact.contact);
app.get('/contact/submit', contact.submit);
//test
app.get('/help', index.help)

app.get('/account/login', login.view);
app.get('/account/logout', login.logout);
app.get('/account/session', login.session);
app.get('/account/register', login.registerView);
app.post('/account/register/user', login.register);
app.post('/account/login/user', passport.authenticate('local', { failureRedirect: '/account/session'}), function(req, res) {
    res.redirect('/index');
  });
app.get('/addFavorite', index.addFavorite);
app.post('/account/changeIcon', login.changeIcon);
app.post('/account/changeNickName', login.changeNickName);


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
      io.sockets.to(room).emit("userJoined", userCount);
    });
  });
});

app.set('socketio', io);
