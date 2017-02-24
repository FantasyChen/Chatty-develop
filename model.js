var Mongoose = require('mongoose');


var ProgramSchema = new Mongoose.Schema({
  // fields are defined here
  "imgURL": String,
  "channel-name": String,
  "program-name": String,
  "program-time": String,
  "category": String,
  "viewerNum": String
});

var UserSchema = new Mongoose.Schema({
  "userID": String,
  "pwd": String,
  "userName": String,
  "img": String
});

exports.Program = Mongoose.model('Program', ProgramSchema, 'programs');
exports.User = Mongoose.model('User', UserSchema, 'users');
