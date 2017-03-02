var Mongoose = require('mongoose');


var ProgramSchema = new Mongoose.Schema({
  // fields are defined here
  "imgURL": String,
  "channel-name": String,
  "program-name": String,
  "program-time": String,
  "category": String,
  "viewerNum": String,
  "favorete": Array
});


//  for search
ProgramSchema.index({'$**': 'text'});

var UserSchema = new Mongoose.Schema({
  "userID": String,
  "pwd": String,
  "userName": String,
  "img": String,
  "favorite": Array
});

exports.Program = Mongoose.model('Program', ProgramSchema, 'programs');
exports.User = Mongoose.model('User', UserSchema, 'users');
exports.UserSchema = UserSchema;
exports.ProgramSchema = ProgramSchema;
