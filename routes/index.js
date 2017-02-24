var models = require('../model');

exports.view = function(req, res){
  //console.log(data);
  models.Program
		.find()
		.exec(function(err, programs){
      res.render('index', {'programs': programs, 'isAuthen':req.isAuthenticated(), 'user':req.user});
    });
};


exports.favorites = function(req, res) {
  models.Program
		.find()
		.exec(function(err, programs){
      res.render('favorites', {'programs': programs, 'isAuthen':req.isAuthenticated(), 'user':req.user});
    });
}

exports.account = function(req, res) {
  res.render('account', {'isAuthen':req.isAuthenticated(), 'user':req.user});
}
