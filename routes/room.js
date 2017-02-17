exports.view = function(req, res){
  //console.log(data);
  var programName = req.params.program;
  console.log(programName);
  res.render('room', {
    'name' : programName
  });
};


exports.message = function(req, res){
  res.json(req.body);
}
