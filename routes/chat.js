var data = require("../chat.json");

exports.addChat = function(req, res) { 
  var newchat = {};
  newchat.content = req.query.message;
  console.log(newFriends);
  data.chat.push(newchat);
  // res.render('index',data);
	// Your code goes here
 }
