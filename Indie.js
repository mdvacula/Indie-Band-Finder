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
		$("#eventLink").empty();
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

						// Displays event object properties
						var show = $("<li class='list-group-item'>");
						console.log(event.title);
						console.log(event.artist);
						show.html(event.title);
						show.append('<br/>');
						show.append(event.artist);
						show.append('<br/>');
						var showLink = $('<a>');
						showLink.html(event.eventURL);
						showLink.attr('href', event.eventURL);
						show.append(showLink);
						show.append('<br/>');
						show.append(event.date);
						show.append('<br/>');

						var showPic = $('<img src=' + event.image + '>');
						show.append(showPic);
						show.append('<br/>');
						show.append(event.description);

						showShows.append(show);
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

						  nEvent.videoId = result.items[0].id.videoId;

						 return nEvent;
						//var id = result.items[0].id.channelId;  //get the channelId of the first result
						//console.log("Channel id: " + id);
						});
				}
