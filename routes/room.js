exports.view = function(req, res){
  //console.log(data);
  var programName = req.params.program;
  console.log(programName);
  res.render('room', {
    'name' : programName
  });
};



exports.socketListener = function(socket){
  socket.on("sendMsg", function(data){
    console.log("Server received message: " + data.content);
    socket.broadcast.emit('receiveMsg', data);
  });
}
