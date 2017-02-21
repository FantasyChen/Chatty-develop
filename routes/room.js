var userCount = {};

exports.view = function(req, res){
  //console.log(data);
  var programName = req.params.program;

  console.log("The room name is " + programName);
  res.render('room', {
    'name' : programName
  });
};
