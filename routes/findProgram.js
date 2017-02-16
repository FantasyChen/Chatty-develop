exports.program = function(req, res) {
  var db = req.db;
  var collection = db.get('programs');
  req.userId = "Westworld"
  collection.find({},{},function(e,docs){
        res.json(docs);
    });
};
