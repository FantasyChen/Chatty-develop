exports.view = function(req, res){
  //console.log(data);
  var db = req.db;
  var collection = db.get("programs");
  collection.find({},{},function(e,docs){
        var wrapper = {'programs':docs};
        res.render('index', wrapper);
    });
};

exports.room = function(req, res) {
  res.render('room');
}
exports.favorites = function(req, res) {
  res.render('favorites');
}
exports.category = function(req, res) {
  res.render('category');
}
exports.account = function(req, res) {
  res.render('account');
}
