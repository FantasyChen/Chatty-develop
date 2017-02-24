var models = require('../model');

exports.view = function(req, res){
  //console.log(data);
  models.Program
		.find()
		.exec(function(err, programs){
      res.render('index', {'programs': programs});
    });
};

exports.room = function(req, res) {
  res.render('room');
}

exports.favorites = function(req, res) {
  models.Program
		.find()
		.exec(function(err, programs){
      res.render('favorites', {'programs': programs});
    });
}
exports.account = function(req, res) {
  res.render('account');
}
