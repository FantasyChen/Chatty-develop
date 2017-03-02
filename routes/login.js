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

exports.registerView = function(req, res){
  res.render('register');
};

exports.register = function(req, res){
  console.log(req.body);
  models.User
    .findOne({'userID':req.body.userID})
    .exec(function(err, user){
      console.log(user);
      if(user){
        res.render('register',{'error' : true, 'errorMsg': 'Username has already existed.'});
      }
      else{
        if(req.body.password.length < 6){
          res.render('register',{'error' : true, 'errorMsg': 'The password should have least length of 6.'});
        }
        else if(req.body.password != req.body.confirm){
          res.render('register',{'error' : true, 'errorMsg': 'The password does not match the confirmation.'});
        }
        else{
          var newUser = new models.User({
            'userID': req.body.userID,
            'pwd': req.body.password,
            'userName': req.body.username,
            'img': "/img/profile-max.jpg",
            'favorte': []
          });
          newUser.save(function (errs){
            if(errs)
              return errs;
            console.log("The new user has been saved.");
            req.login(newUser, function(e){
              res.redirect('/');
            });
          })
        }
      }
    });
};
