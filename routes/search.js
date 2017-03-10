var models = require('../model');

exports.view = function(req, res) {
  models.Program
    .find()
    .exec(function(err, programs){
      res.render('category', {'programs':programs, 
                              'search': false,
                              'result': false});
    });
}

exports.search = function(req, res){

  var searchString = req.query.searchString;


  console.log(searchString);

  models.Program.
    find({ $text: { $search: searchString } }, function(err, searchResult) {
      console.log(searchResult);

      if(searchResult.length == 0){
        console.log("result is null");
        res.render('category', {'search': true,
                                'result': false});
        // res.redirect('/category');
      }
      else{
        console.log("result is not null");
        res.render('category', {'programs':searchResult, 
                                'search': true,
                                'result': true});
        
      }
  
    });

  // }

  


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
