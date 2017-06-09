
var key = "AIzaSyBNaBVt7q6kyHvRgRBvIaxdRieoHqKJsL8";

var queryString = $.param({
	key: "AIzaSyBNaBVt7q6kyHvRgRBvIaxdRieoHqKJsL8",
	q: "surfing",
	part: "snippet"  
})

$.ajax({
	url: "https://www.googleapis.com/youtube/v3/search?" + queryString,
	method:"GET"
}).done(function(response){
	console.log(response);
});

// https://www.googleapis.com/youtube/v3/videos?part=statistics&id=Q5mHPo2yDG8&key=AIzaSyBNaBVt7q6kyHvRgRBvIaxdRieoHqKJsL8

// https://www.googleapis.com/youtube/v3/search?part=snippet&q=".urlencode($kwd)."&maxResults=".$max."&order=viewCount&key=

// https://www.googleapis.com/youtube/v3/videos?part=statistics%2C+contentDetails&id=Pxb5lSPLy9c&key=