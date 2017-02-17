'use strict';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
  console.log("hhhh");
  $('.message-submit').click(sendMessage);
}

function sendMessage(e) {
  e.preventDefault();
  var content = $('.message-input').val();
  var roomName = $('#roomName').text();
  console.log("room name is " + $('#roomName').length);
  $('.message-input').val("");
  if(content.length == 0){
    console.log("empty input received");
  }
  else{
    var message = {
      "content":content
    };
    $.post('/room/message' + roomName, message, renderMessage);
  }
}

function renderMessage(data){
  var content = data.content;
  var date = new Date();
  var time = date.getHours() + ":" + date.getMinutes();
  var addHTML = '<div class="message-block">\
    <div class="msg-content">' + content +
    '</div>\
    <img id="" class="" src="./img/profile-max.jpg" alt="">\
    <div class="timestamp" id="">' + time + '\
    </div>\
  </div>';
  $('.messages').append(addHTML);
  console.log($('.messages').height());
  $(".messages").scrollTop($('.messages').height());
  //updateScrollBar();
}

function updateScrollBar() {
  $('.messages').mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}
