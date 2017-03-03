'use strict';

var isAuthen = false;
var user;

$(document).ready(function() {
	initializePage();
	var userString = $('#savedLoginInfo').text().toString();
	if(userString.length>2){
		isAuthen = true;
		user = JSON.parse(userString);
		}
})

function initializePage() {
  $('.collect').click(changeCollect);
}


function changeCollect(e){
  e.preventDefault();
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
