exports.program = function(req, res) {
  var db = req.db;
  var collection = db.get('programs');
  collection.find({},{},function(e,docs){
        res.json(docs);
    });
};
