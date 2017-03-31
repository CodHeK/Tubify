$(document).ready(function() {
	$("#search").click(function() {
		var val = $("#query").val();

		if(val == '') {
			$("#query").css('box-shadow', 'inset 0 1px 2px rgba(0,0,0,0.1), 0 0 0 6px #dd2826');
		}
		else {
			$("#query").css('box-shadow', 'inset 0 1px 2px rgba(0,0,0,0.1), 0 0 0 6px #f0f0f0');
		}
	})
	
});