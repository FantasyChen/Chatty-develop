'use strict';


var socket;
var room = "";
var user = null;

var i = 0;
var Fake = [
	'The program is so interesting:)',
  'Hi there, I\'m Trump and you?',
  'Nice to meet you.',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'I think all the students should have one day off today.',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you.',
  'Hope to see you later.',
  'Bye',
  ':)'
];


$(document).ready(function() {
	initializePage();
  $(window).unload(function(){
    socket.disconnect();
  })
})


function initializePage() {
  room = $('#roomName').text();

	// get user
	var userString = $('#savedLoginInfo').text().toString();
	if(userString.length>2)
		user = JSON.parse(userString);
	// Create socket connection
	//console.log(user);
  socket = io.connect();
	socket.on("userJoined", renderUserJoined);
  socket.on("receiveMsg", renderReceivedMessage);
  $('.message-submit').click(sendMessage);
  $('input[type="text"].message-input').keydown(function(e){
    if (e.keyCode == 13){
      sendMessage(e);
    }
  });
	socket.emit("login", {programName: room});
	fakeMessage();
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
      "program":room,
			"user": user
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
	var imageIcon = "/img/anonymous-icon.jpg";
	var userName = "Anonymous";
	if(user){
		imageIcon = user.img;
		userName = user.userName;
	}
  var addHTML = '<div class="message-block">\
    <div class="msg-content">' + content +
    '</div>\
    <img id="" class="" src="' + imageIcon + '" alt="">\
    <div class="timestamp" id="">' + getCurrentTime() + '\
    </div>\
		<div class="username" id="">' + userName + '\
    </div>\
  </div>';
  $('.messages').append(addHTML);
  updateScrollBar();
	setTimeout(function() {
	fakeMessage();
	}, 1000 + (Math.random() * 20) * 100);
}

function renderReceivedMessage(data){
	//console.log("received");
	var content = data.content;
	var receivedUser = data.user;
	var imageIcon = "/img/anonymous-icon.jpg";
	var userName = "Anonymous";
	if(receivedUser){
		imageIcon = receivedUser.img;
		userName = receivedUser.userName;
	}
  var addHTML = '<div class="message-inverse">\
    <div class="msg-content">' + content +
    '</div>\
    <img id="" class="" src="' + imageIcon + '"alt="">\
    <div class="timestamp" id="">' + getCurrentTime() + '\
    </div>\
		<div class="username" id="">' + userName + '\
		</div>\
  </div>';
  $('.messages').append(addHTML);
  updateScrollBar();
}

function renderUserJoined(data){
  console.log("current number of connected users:" + data);
	$('#viewerNum #Text').text(data.toString());
}


function updateScrollBar() {
  $('html, body').scrollTop( $(document).height() - $(window).height() );
}

function getCurrentTime(){
	var date = new Date();
	var hour = date.getHours().toString(), minute = date.getMinutes().toString();
	if(hour.length == 1)
		hour = '0' + hour;
	if(minute.length == 1)
		minute = '0' + minute;
	var time = hour + ":" + minute;
	return time;
}
