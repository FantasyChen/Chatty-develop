'use strict';


var isAuthen = false;
var user;

$(document).ready(function() {
	$('#loginPopUp').popup();
	initializePage();
})

function initializePage() {
	var userString = $('#savedLoginInfo').text().toString();
	console.log(userString.length);
	if(userString.length>2){
		isAuthen = true;
		user = JSON.parse(userString);
		for(var i = 0; i < user.favorite.length; i++){
			console.log('#' + user.favorite[i]);
			$("[id='" + user.favorite[i] + "']").find('img').attr("src", "./img/star_gold_small.png");
		}
	}
	// Create socket connection
	console.log(user);
	$('.backBtn').click(function(e){
		$('#loginPopUp').popup('hide');
	});
  $('.collect').click(changeCollect);
}


function changeCollect(e){
  e.preventDefault();
	if(!isAuthen){
		$('#loginPopUp').popup('show');
		return;
	}
  var origImg = $(this).find('img').attr("src");
	var programID = $(this).attr('id');
  if(origImg == "./img/star_gold_small.png"){
		$.get('/addFavorite',{
			"userID": user.userID,
			"program": programID,
			"type": "remove"
		});
    origImg = $(this).find('img').attr("src","./img/star_grey_small.png" );
  }
  else{
		$.get('/addFavorite', {
			"userID": user.userID,
			"program": programID,
			"type": "add"
		});
    origImg = $(this).find('img').attr("src","./img/star_gold_small.png" );
  }
}
