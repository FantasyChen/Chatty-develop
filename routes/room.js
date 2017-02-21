var userCount = {};

exports.view = function(req, res){
  //console.log(data);
  var programName = req.params.program;

  console.log("The room name is " + programName);
  res.render('room', {
    'name' : programName
  });
};


// Chatroom sockets is handled here
exports.socketListener = function(socket){
  var room = "";
  socket.on("sendMsg", function(data){
    console.log("Server received message: " + data.content);
    socket.broadcast.to(room).emit('receiveMsg', data);   // broadcast the message to everyone in the room except self.
  });
  socket.on('login', function(data){
    console.log("An user have logged in");
    room = data.programName;
    socket.join(room, function(){
      if(userCount[room] == undefined){
        userCount[room] = 1;
      }
      else{
        userCount[room] += 1;
      }
      socket.to(room).emit("userCount", userCount[room]);
    });
  });

}
