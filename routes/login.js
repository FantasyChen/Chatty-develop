exports.view = function(req, res){
  //console.log(data);
  res.render('login');
};


exports.log = function(req, res){
  var userName = req.query.username;
  var password = req.query.password;
  var db = req.db;
  var allUsers = db.get('users');
  allUsers.findOne({userID:userName}, {}, function(e, docs){
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
  res.render('session');
};
