$(document).ready(function() {
	$("#search-form").submit(function(e) {
		e.preventDefault();
	});
	var content;
	$("#span").hide();
	$("#history").hide();
	$("#search").click(function() {
		var val = $("#query").val();
		content = val;
		if(val == '') {
			$("#query").css('box-shadow', 'inset 0 1px 2px rgba(0,0,0,0.1), 0 0 0 6px #dd2826');
			$("#results").html('');
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

				 				$("#results").append(output);
				 			});

				 		}
			);
		}
	});

	$("#hist").click(function() {
		$("#display").fadeOut(1000);
		$("#history").show(1000);
		$("#s_history").append('<br><br>' + content + " " + "______________________" + " " + new Date($.now()));

	});

	$("#return").click(function() {
		$("#history").fadeOut(1000);
		$("#display").show(1000);
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
	'<div class="list-left">' +
	'<img src="'+thumb+'">' +
	'</div>'+
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">' +title+ '</a></h3>' +
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small><br>' +
	'<br><p>'+description+'</p>' +
	'</div>'+
	'</li>';
	'';

	return output;
}

// function getButtons(nextPage, prevPage) {
// 	if(!prevPage) {
// 		var btnoutput = '<div class="button-container">' +
// 		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" onclick="nextPage();">Next Page</button></div>';
// 	}
// 	else {
// 		'<div class="button-container">' +
// 		'<button id="next-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'" onclick="prevPage();">Prev Page</button>' +
// 		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" onclick="nextPage();">Next Page</button></div>';
// 	}

// 	return btnoutput;
// }
