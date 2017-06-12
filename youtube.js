var key = "AIzaSyBNaBVt7q6kyHvRgRBvIaxdRieoHqKJsL8";

//Pass in Performer name and search youtube for channel
var getChannel = function (query){
var queryString1 = $.param({
    key: "AIzaSyBNaBVt7q6kyHvRgRBvIaxdRieoHqKJsL8",
    q: query,
    part: "snippet"

});


//Ajax call to youtube to get the list of channels
$.ajax({
    url: "https://www.googleapis.com/youtube/v3/search?" + queryString1,
    method:"GET"
}).done(function(result){
    console.log(result);
    var id = result.items[0].id.channelId;  //get the channelId of the first result
    console.log("Channel id: " + id);
    getVideos(id);  //pass the channel id of the first result
});

};

//Take Channel ID and get list of videos
var getVideos = function(id) {

    var queryString2 = $.param({
        key: "AIzaSyBNaBVt7q6kyHvRgRBvIaxdRieoHqKJsL8",
        type: "video",
        channelId: id,
        part: "snippet"

    });

    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?" + queryString2,
        method: "GET"
    }).done(function(response){
        console.log(response);
        console.log(response.items[0].id.videoId);
    });
};
// Sample urls
// https://www.googleapis.com/youtube/v3/videos?part=statistics&id=Q5mHPo2yDG8&key=AIzaSyBNaBVt7q6kyHvRgRBvIaxdRieoHqKJsL8

// https://www.googleapis.com/youtube/v3/search?part=snippet&q=".urlencode($kwd)."&maxResults=".$max."&order=viewCount&key=AIzaSyBNaBVt7q6kyHvRgRBvIaxdRieoHqKJsL8

// https://www.googleapis.com/youtube/v3/videos?part=statistics%2C+contentDetails&id=Pxb5lSPLy9c&key=AIzaSyBNaBVt7q6kyHvRgRBvIaxdRieoHqKJsL8

// https://www.googleapis.com/youtube/v3/search?part=snippet&q=indieband&key=AIzaSyBNaBVt7q6kyHvRgRBvIaxdRieoHqKJsL8
