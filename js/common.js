
function scrollBox(){
	var first=$('#scrollbox ul li:first');
	var width=-(first.outerWidth(true))+'px';
	$('#scrollbox ul').animate({left:width},{duration:600,complete:
		function (){
			$('#scrollbox ul').append(first).css("left","0");
		}
	});
}
			
			
			
$(document).ready(function (){

});
