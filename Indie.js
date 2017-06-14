var band = $(this).attr("data-name");
var keywords = 'indie';
var l = '08901'; // Zip code search parameter
var within = '30';
var units = 'miles';
var app_key = 'hNbJCFtMGbfsfr9T';

var events = [];

var valueCheck = function(eventObject){
	var check = true;
	console.log("checking value");
	if(eventObject.description === null){
		check = false;
	}
	else if (eventObject.image === null ) {
		check = false;
	}
	else if(eventObject.performers === null || eventObject.performers.performer === null || eventObject.performers.performer.name === null || eventObject.performers.performer.length > 1){
		check = false;
	}

	return check;
};

//On click of submit zipcode button
$(document).on('click', '#zip', function(){

	// Input validation variables
	var validation = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var userZip = $('#zipBands').val().trim();
	var zipCount = 0;
	var validEntry = false;

	// Input validation function
	function validKey(){
		for(var i in userZip){
			if(validation.indexOf(userZip.charAt(i)) != -1){
				zipCount++;
			}
		}
		if(zipCount === 5){
			validEntry = true;
		}

		return validEntry;
	}
	validKey();

	// If not valid let the user know
	if(userZip.length!=5 || validEntry === false){
		$('#zipBands').val('');
		$('#zipBands').attr('placeholder', 'Enter a valid zip code');
	}

	// If valid run the search
	else{
		l = $('#zipBands').val();							//set l to the zipcode entered
		window.location.href='2ndpage.html';		//progress to next page
		validEntry=false;											//resets validEnd
	}
	});

	$(".genre").on("click", function(){
		$("#eventDiv").empty();
		events.length = 0;
		keywords = $(this).attr("value");
		console.log($(this).attr("value"));
		bandTickets();

	});

function bandTickets (){
	// Built url = http://api.eventful.com/json/events/search?...?q=music&category=music&keywords=indie&l=08901&within=10&units=miles&app_key=hNbJCFtMGbfsfr9T
	var searchUrl = 'http://api.eventful.com/json/events/search?...?q=music&category=music&page_size=50&keywords=' + keywords + '&l=' + l + '&within=' + within + '&units=' + units + '&app_key=' + app_key;
	$.ajax({
	url: searchUrl,
	dataType: 'jsonp',
	method: "GET"
	}).done(function(response){
	// Store ajax JSON results
		var results = response.events
		console.log(results);
		//console.log(response.total_items);
		//console.log(results.event.length);

			// Empty ol outside of for loop to hold looped results
			var showShows = $("<ul class='list-group'>");

			$("#eventLink").append(showShows);

			for(var i=0; i<results.event.length;i++){
				console.log("in for loop: " + i);
				if(events.length < 7){
					console.log("if events: " + events.length);

					if(valueCheck(results.event[i]) == true){
						// Creates event object
						var event = {
							date: results.event[i].start_time,
							title: results.event[i].title,
							artist: results.event[i].performers.performer.name,
							eventURL: results.event[i].url,
							videoId: "",
							image: results.event[i].image.medium.url,
							description: results.event[i].description
						}
						showResults(event);
						events.push(event);
						console.log(event);
						console.log(events);
					}
					else{
						//do nothing
					}
				}
				else{
					for(var j=0;j<events.length;j++){
						//console.log(events[j]);
				console.log(getVideos(events[j]));
				}
					break;
				}

			console.log(events);
			}
		});

}

	var showResults = function(event){
		var dEvent = $("<div class='col-lg-4 col-md-4 col-sm-12 col-xs-12'>");
		var show = $("<div class='thumbnail'>");
		var showImg = $("<img>");
		var showCap = $("<div class='caption'>");
		var showH = $("<h5 class='text-center'>");
		var showDate = $("<p class='text-center'>");
		var pButton = $("<p class='text-center'>");
		var btn1 = $("<button class='btn btn-primary page3Link'>More Info</button>");
		var btn2 = $("<a target='_blank'><button class='btn btn-info'>Tickets</button></a>");
		showImg.attr("src", event.image);
		show.append(showImg);
		showH.html(event.title);
		showDate.html(moment(event.date).format("MM/DD/YYYY"));
		btn1.attr("value", events.length);
		btn2.attr("href", event.eventURL);
		pButton.append(btn1);
		pButton.append(btn2);
		showCap.append(showH);
		showCap.append(showDate);
		showCap.append(pButton);
		show.append(showCap);
		dEvent.append(show);
		$("#eventDiv").append(dEvent);
	}

	//Function to get video id's from youtube
			var getVideos = function (nEvent){
				console.log(nEvent);
				var key = "AIzaSyBNaBVt7q6kyHvRgRBvIaxdRieoHqKJsL8";
				var queryString1 = $.param({
						key: "AIzaSyBNaBVt7q6kyHvRgRBvIaxdRieoHqKJsL8",
						q: nEvent.artist,
						part: "snippet",
						type: "video"

				});

				//Ajax call to youtube to get the list of channels
				$.ajax({
						url: "https://www.googleapis.com/youtube/v3/search?" + queryString1,
						method:"GET"
				}).done(function(result){
						  alert(queryString1);
						  console.log(url);
						  nEvent.videoId = result.items[0].id.videoId;

						 return nEvent;
						//var id = result.items[0].id.channelId;  //get the channelId of the first result
						//console.log("Channel id: " + id);
						});
				}
var showVideo = function(vidId){
	$("#video").attr("src", "https://www.youtube.com/embed/" + vidId);
};

$(document).on('click', '.page3Link', function(){
	// window.location.href='3rdpage.html';
	var x = $(this).attr("value");
	nEvent = events[x];
	console.log(nEvent.videoId);
	$('#buttons').empty();
	$('#eventDiv').empty();
	addArtistCard();
	addDescription();
	addVideoButton();
	addArtistDescription();
	addVideo();
});

function addArtistCard(){
	var cardHov = $('<div>');
	cardHov.addClass('col-lg-6 col-sm-6');
	var cardHovercard = $('<div>');
	cardHovercard.addClass('card hovercard');
	var cardBackground = $('<div>');
	cardBackground.addClass('cardbackground');
	cardHov.append(cardHovercard);
	cardHov.append(cardBackground);

	var userAvatar = $('<div>');
	userAvatar.addClass('useravatar');
	var bandPic = $('<img src=' + nEvent.image + '>');
	userAvatar.append(bandPic);
	cardHov.append(userAvatar);

	var cardInfo = $('<div>');
	cardInfo.addClass('card-info');
	var cardTitle = $('<span>');
	cardTitle.addClass('card-title');
	cardTitle.html(nEvent.artist);
	cardInfo.append(cardTitle);
	cardHov.append(cardInfo);
	$('#eventDiv').append(cardHov);
}

function addDescription(){
	var group1 = $('<div>');
	group1.addClass('btn-pref btn-group btn-group-justified btn-group-lg');
	group1.attr('role', 'group');
	group1.attr('aria-label', '...');
	var group2 = $('<div>');
	group2.addClass('btn-group');
	group2.attr('role', 'group');
	group1.append(group2);
	var infoButton = $('<button>');
	infoButton.addClass('btn btn-primary btn1');
	infoButton.attr('type', 'button');
	infoButton.attr('href', '#tab1');
	infoButton.attr('data-toggle', 'tab');
	var glyph = $('<span>');
	glyph.addClass('glyphicon glyphicon-star fontA');
	glyph.attr('aria-hidden', true);
	infoButton.append(glyph);
	var bandDescription = $('<div>');
	bandDescription.addClass('hidden-xs');
	bandDescription.addClass('tabText');
	bandDescription.html('DESCRIPTION');
	infoButton.append(bandDescription);
	group1.append(infoButton);
	$('#eventDiv').append(group1);
}

function addVideoButton(){
	var a = $('<div>');
	a.addClass('btn-group');
	a.attr('role', 'group');
	var b = $('<button>');
	b.attr('type', 'button');
	b.attr('id', 'favorites');
	b.addClass('btn btn-default');
	b.attr('href', '#tab2');
	b.attr('data-toggle', 'tab');
	var c = $('<span>');
	c.addClass('glyphicon glyphicon-heart fontA');
	c.attr('aria-hidden', true);
	var d = $('<div>');
	d.addClass('hidden-xs');
	d.addClass('tabText');
	d.html('MUSIC VIDEO');
	b.append(c);
	b.append(d);
	a.append(b);
	$('#eventDiv').append(a);
}

function addArtistDescription(){
	var a = $('<div>');
	a.addClass('well wellBg');
	var b = $('<div>');
	b.addClass('tab-content');
	var c = $('<div>');
	c.addClass('tab-pane fade in active');
	c.attr('id', 'tab1');
	var d = $('<h4>');
	d.html(nEvent.description);
	c.append(d);
	a.append(b);
	a.append(c);
	$('#eventDiv').append(a);
}

function addVideo(){
	var e = $('<div>');
	e.addClass('tab-pane fade in');
	e.attr('id', 'tab2');
	var f = $('<iframe>');
	f.attr('id', 'video');
	f.attr('width', '300');
	f.attr('height', '200');
	f.attr('src', 'https://www.youtube.com/embed/' + nEvent.videoId);
	e.append(f);
	$('#eventDiv').append(e);
}
// $("#video").attr("src", "https://www.youtube.com/embed/" + vidId);
// showVideo(nEvent.videoId)
// <iframe id="myIframe" width="300" height="200"></iframe>
// Set the content of the src attribute of the iframe dynamically with jQuery:

//  var url = "https://www.youtube.com/embed/" + videoID;
//  $('#myIframe').attr('src', url)
