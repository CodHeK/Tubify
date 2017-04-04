$(document).ready(function() {
	$("#search-form").submit(function(e) {
		e.preventDefault();
	});
	var content;
	$("#span").hide();
	$("#nil").hide();
	$("#history").hide();
	$("#search").click(function() {
		var val = $("#query").val();
		content = val;
		if(val == '') {
			$("#query").css('box-shadow', 'inset 0 1px 2px rgba(0,0,0,0.1), 0 0 0 6px #dd2826');
			// $("#results").html('');
			$("#s_history").html('');
		}
		else {
			$("#query").css('box-shadow', 'inset 0 1px 2px rgba(0,0,0,0.1), 0 0 0 6px #f0f0f0');
			$("#results").html('');
			$.get(

				 "https://www.googleapis.com/youtube/v3/search", {
				 		part: 'snippet, id',
				 		q: encodeURIComponent($("#query").val()).replace(/%20/g, "+"),
				 		type: 'video',
				 		key: 'AIzaSyDv3TkvD7OO4S4-wlIGEz_odJG1T5Qrbao' },

				 		function(data) {
				 			$.each(data.items, function(i,item) {

				 				var output = getOutput(item);

				 				$("#results").append(output).fadeIn(1000);
				 			});

				 		}
			);
			$("#query").val('');
		}
	});


	$("#hist").click(function() {
		$("#display").fadeOut(1000);
		$("#history").show(1000);
		// if(content != '') {
			$("#s_history").append('<br><br>' + content + " " + "______________________" + " " + new Date($.now()));
		
		// else {
		// 	$("#nil").show(1000);
		// }

	});	

	$("#return").click(function() {
		$("#history").fadeOut(1000);
		$("#display").show(1000);
	});

	$("#clear").click(function() {
		$("#s_history").html('');
	});
});

function getOutput(item) {
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	// $('#tit').html(title);
	// $("#owner").html(channelTitle);
	// $("#date").html(videoDate);
	// $("#desp").html(description);
	var output = '<li>' + 
	'<div class="list-left col-lg-3 col-md-3 col-sm-12 col-xs-12">' +
	'<a href="http://www.youtube.com/embed/'+videoId+'"><img src="'+thumb+'"></a>' +
	'</div>'+
	'<div class="list-right col-lg-3 col-md-3 col-sm-12 col-xs-12">' +
	'<h3><a class="video" href="http://www.youtube.com/embed/'+videoId+'">' +title+ '</a></h3>' +
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small><br>' +
	'<br><p>'+description+'</p>' +
	'<form type="submit" action="http://www.ssyoutube.com/embed/'+videoId+'">' +
	'<button class="btn btn-default btn-lg">Download</button>' +
	'</form>' +
	'</div>'+
	'</li>';
	'';

	return output;
}
