'use strict';


var socket;
var room = "";

// var i = 0;
// var Fake = [
//   'Hi there, I\'m Trump and you?',
//   'Nice to meet you',
//   'How are you?',
//   'Not too bad, thanks',
//   'What do you do?',
//   'That\'s awesome',
//   'Codepen is a nice place to stay',
//   'I think you\'re a nice person',
//   'Why do you think that?',
//   'Can you explain?',
//   'Anyway I\'ve gotta go now',
//   'It was a pleasure chat with you',
//   'Time to make a new codepen',
//   'Bye',
//   ':)'
// ];


$(document).ready(function() {
	initializePage();
  $(window).unload(function(){
    socket.disconnect();
  })
})



function initializePage() {
  room = $('#roomName').text();
  socket = io.connect();
  socket.emit("login", {programName: room});
  socket.on("receiveMsg", renderReceivedMessage);
  socket.on("userJoined", renderUserJoined);
  $('.message-submit').click(sendMessage);
  $('input[type="text"].message-input').keydown(function(e){
    if (e.keyCode == 13){
      sendMessage(e);
    }
  });
}

function sendMessage(e) {
  e.preventDefault();
  var content = $('.message-input').val();
  $('.message-input').val("");
  if(content.length == 0){
    console.log("empty input received");
  }
  else{
    var message = {
      "content":content,
      "program":room
    };
    renderMessage(message);
    socket.emit("sendMsg", message);
	}
}


function fakeMessage(){
	console.log("faked");
	var content = Fake[i];
	i ++;
  var date = new Date();
  var time = date.getHours() + ":" + date.getMinutes();
  var addHTML = '<div class="message-inverse">\
    <div class="msg-content">' + content +
    '</div>\
    <img id="" class="" src="/img/trump.jpeg" alt="">\
    <div class="timestamp" id="">' + time + '\
    </div>\
  </div>';
  $('.messages').append(addHTML);
  updateScrollBar();
}



function renderMessage(data){
  var content = data.content;
  var date = new Date();
  var time = date.getHours() + ":" + date.getMinutes();
  var addHTML = '<div class="message-block">\
    <div class="msg-content">' + content +
    '</div>\
    <img id="" class="" src="/img/profile-max.jpg" alt="">\
    <div class="timestamp" id="">' + time + '\
    </div>\
  </div>';
  $('.messages').append(addHTML);
  updateScrollBar();
	setTimeout(function() {
	// fakeMessage();
	}, 1000 + (Math.random() * 20) * 100);
}

function renderReceivedMessage(data){
	console.log("received");
	var content = data.content;
  var date = new Date();
  var time = date.getHours() + ":" + date.getMinutes();
  var addHTML = '<div class="message-inverse">\
    <div class="msg-content">' + content +
    '</div>\
    <img id="" class="" src="/img/trump.jpeg" alt="">\
    <div class="timestamp" id="">' + time + '\
    </div>\
  </div>';
  $('.messages').append(addHTML);
  updateScrollBar();
}

function renderUserJoined(data){
  console.log("current number of connected users:" + data
}



function updateScrollBar() {
  $('html, body').scrollTop( $(document).height() - $(window).height() );
}
