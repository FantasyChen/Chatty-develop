var models = require('../model');

exports.view = function(req, res){
  //console.log(data);
  res.render('login');
};


exports.log = function(req, res){
  var userName = req.query.username;
  var password = req.query.password;
  models.User
    .findOne({'userID':userName})
    .exec(function(err, docs){
      console.log(docs);
      if(docs == null || docs.pwd != password ){
        res.redirect('/account/session');
      }
      else{
        res.redirect('/');
      }
    });
}


exports.session = function(req, res){
  res.render('login', {'error' : true});
};
