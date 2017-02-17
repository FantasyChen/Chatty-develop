exports.view = function(req, res){
  //console.log(data);
  var db = req.db;
  var collection = db.get("programs");
  collection.find({},{},function(e,docs){
        var wrapper = {'programs':docs};
        res.render('index', wrapper);
    });
};
