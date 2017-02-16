exports.view = function(req, res){
  //console.log(data);
  var db = req.db;
  var collection = db.get("programs");
  collection.find({},{},function(e,docs){
        console.log(docs.length);
        // res.json(docs);
        var wrapper = {'programs':docs};
        res.render('index', wrapper);
    });
};
