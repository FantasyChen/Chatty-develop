'use strict';



$(document).ready(function() {
	initializePage();
})

function initializePage() {
  $('.registerBtn').click(showRegister);
}

function showRegister(e) {
  e.preventDefault();
	console.log("JS connected");
  var page = $('.login-box');
  var $confirmPwd = $("<div class='confirmPwd-box'><input type='text' class='confirmPwd' placeholder='Confirm Your Password'/></div>");
  $("document").removeClass(".loginBtn");
  page.append($confirmPwd);
}
