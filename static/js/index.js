'use strict';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
  $('.collect').click(changeCollect);
}


function changeCollect(e){
  e.preventDefault();
  var origImg = $(this).find('img').attr("src");
  if(origImg == "./img/star_gold_small.png"){
    origImg = $(this).find('img').attr("src","./img/star_grey_small.png" );
		
  }
  else{
    origImg = $(this).find('img').attr("src","./img/star_gold_small.png" );
  }
}
