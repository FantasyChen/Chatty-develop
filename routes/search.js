var models = require('../model');

exports.view = function(req, res) {
  models.Program
    .find()
    .exec(function(err, programs){
      programs['search'] = false;
      res.render('category', {'programs': programs});
    });
}

exports.search = function(req, res){
  var category = req.query.category;
  var programs = req.db.get('programs');
  programs.find({"category": category}, {}, function(e, docs){
    console.log(docs);
    if(docs != null){
      console.log("now != null");
      var wrapper = {'programs':docs};
      wrapper['search'] = true;
      res.render('category', wrapper);
    }
    else{
      console.log("now == null");
      res.redirect('/category');
    }
  });
}
