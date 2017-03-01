var models = require('../model');

exports.view = function(req, res) {
  models.Program
    .find()
    .exec(function(err, programs){
      var wrapper = {'programs':programs};
      wrapper['search'] = false;
      res.render('category', wrapper);
    });
}

exports.search = function(req, res){

  var searchString = req.query.searchString;

  models.Program.
    find({ $text: { $search: searchString } }, function(err, searchResult) {
      console.log(searchResult);

      if(searchResult != null){
        console.log("now != null");
        var wrapper = {'programs':searchResult};
        wrapper['search'] = true;
        res.render('category', wrapper);
      }
      else{
        console.log("now == null");
        res.redirect('/category');
      }
  
    });


  // var category = req.query.category;
  // var programs = req.db.get('programs');
  // programs.find({"category": category}, {}, function(e, docs){
  //   console.log(docs);
  //   if(docs != null){
  //     console.log("now != null");
  //     var wrapper = {'programs':docs};
  //     wrapper['search'] = true;
  //     res.render('category', wrapper);
  //   }
  //   else{
  //     console.log("now == null");
  //     res.redirect('/category');
  //   }
  // });
}
