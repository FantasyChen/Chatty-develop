exports.view = function(req, res){
  //console.log(data);
  var db = req.db;
  var collection = db.get("programs");
  collection.find({},{},function(e,docs){
        console.log("Length is" + docs.length);
        // res.json(docs);
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
exports.profile = function(req, res) {
  res.render('profile');
}
