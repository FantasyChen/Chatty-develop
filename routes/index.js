var models = require('../model');

exports.view = function(req, res){
  models.Program
		.find()
		.exec(function(err, programs){
      res.render('index', {'programs': programs, 'isAuthen':req.isAuthenticated(),
      'showAlt': false,
      'user':JSON.stringify(req.user)});
    });
};

exports.view2 = function(req, res){
  //console.log(data);
  var io = req.app.get('socketio');
  models.Program
		.find()
		.exec(function(err, programs){
      res.render('index', {'programs': programs, 'isAuthen':req.isAuthenticated(),
      'showAlt': true,
      'user':JSON.stringify(req.user)});
    });
};
exports.favorites = function(req, res) {
  if(!req.isAuthenticated()){
    res.render('favorites', {'programs': [], 'isAuthen':false, 'user':null});
  }
  else{
    if(req.user.favorite.length == 0){
      res.render('favorites' , {'programs': [], 'isAuthen':true, 'user':JSON.stringify(req.user), 'empty':true});
    }
    else{
      models.Program
        .find({"program-name":{$in:req.user.favorite}})
        .exec(function(err, programs){
          console.log(programs);
          res.render('favorites' , {'programs': programs, 'isAuthen':true, 'user':JSON.stringify(req.user), 'empty':false});
        });
    }
  }
}

exports.account = function(req, res) {
  res.render('account', {'isAuthen':req.isAuthenticated(), 'user':req.user});
}

exports.addFavorite = function(req, res) {
  models.User
    .findOne({"userID": req.query.userID})
    .exec(function(err, user){
      if(req.query.type == "add"){
        for(var i = user.favorite.length - 1; i >= 0; i--) {
          if(user.favorite[i] === req.query.program){
            break;
          }
        }
        user.favorite.push(req.query.program);
        user.save();
      }
      else{
        for(var i = user.favorite.length - 1; i >= 0; i--) {
          if(user.favorite[i] === req.query.program){
            user.favorite.splice(i, 1);
            break;
          }
        }
        user.save();
      }
    });
}

exports.help = function(req, res) {
  res.render('help');
}
