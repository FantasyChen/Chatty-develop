var models = require('../model');
var passport = require('passport');

exports.view = function(req, res){
  //console.log(data);
  res.render('login');
};

exports.session = function(req, res){
  res.render('login', {'error' : true});
};


exports.logout = function(req, res){
  console.log("User logged out");
  req.logout();
  res.redirect('/account/login');
}
