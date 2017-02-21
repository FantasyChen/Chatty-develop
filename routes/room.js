exports.view = function(req, res){
  //console.log(data);
  var programName = req.params.program;
  console.log(programName);
  res.render('room', {
    'name' : programName
  });
};


exports.message = function(req, res){
  var db = req.db;
  console.log(req.body.content);
  res.send(req.body);
}
