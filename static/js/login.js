$(document).ready(function() {
	initializePage();
})

function initializePage() {
  $('.register-button').click(showRegister);
}

function showRegister(e) {
  e.preventDefault();

  var page = $('.login-box');
  var $confirmPwd = $("<div class='confirmPwd-box'><input type='text' class='confirmPwd' placeholder='Confirm Your Password'/></div>");
  $("document").removeClass(".login-button");
  page.append($confirmPwd);

}
