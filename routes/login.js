var models = require('../model');
var passport = require('passport');
var path = require('path');
var fs = require('fs');

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
        else if(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(req.body.userID)){
          res.render('register',{'error' : true, 'errorMsg': 'Username should not contain special symbols.'});
        }
        else{
          if(req.body.username.length == 0){
            req.body.username =  req.body.userID;
          }
          var newUser = new models.User({
            'userID': req.body.userID,
            'pwd': req.body.password,
            'userName': req.body.username,
            'img': "/img/test-user-icon-3.jpeg",
            'favorte': []
          });
          newUser.save(function (errs){
            if(errs)
              return errs;
            console.log("The new user has been saved.");
            req.login(newUser, function(e){
              res.redirect('/test');
            });
          })
        }
      }
    });
};

exports.changeIcon = function(req, res){
  if(!req.files || !req.files.iconImage){
    res.redirect("/account");
    return;
  }
  fs.readFile(req.files.iconImage.path, function(err, data){
    if(err){
      res.redirect("/account");
    }
    var newPath = "./static/img/upload/" + req.user.userID + ".png";
    var userImagePath = "/img/upload/" +  req.user.userID + ".png";
    fs.rename(req.files.iconImage.path, newPath, function(err){
      if(err) throw err;
      models.User
        .findOne({'userID':req.user.userID})
        .exec(function(err, user){
          user.img = userImagePath;
          user.save(function(err, user){
          res.redirect("/account");
          });
        });
    });
  });
}

exports.changeNickName = function(req, res){
  if(req.body.username == 0){
    res.redirect("/account");
  }
  models.User
    .findOne({'userID':req.user.userID})
    .exec(function(err, user){
      user.userName = req.body.username;
      user.save(function(err, user){
      res.redirect("/account");
      });
    });
}
