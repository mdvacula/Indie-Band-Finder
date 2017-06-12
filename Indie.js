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
	else if(eventObject.performers === null ){
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
		keywords = $(this).attr("value");
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

			for(var i=0; i<results.event.length;i++){
				console.log("in for loop" + i);
				if(events.length < 7){
					console.log("if events" + events.length);

					if(valueCheck(results.event[i]) == true){
						var event = {
							title: results.event[i].title,
							artist: results.event[i].performers.performer.name,
							eventURL: results.event[i].url,
							videoId: "",
							image: results.event[i].image.medium.url,
							description: results.event[i].description
						}

						events.push(event);
						console.log(event);
						console.log(events);
					}
					else{
						//do nothing
					}
				}
				else{
					break;
				}
		console.log(events);
		}

			});




}
			// if(results.event[i].description!=null){
			// 	event.description = results.event[i].description;
			// 	//var b = $('<div>');
			// 	//b.html(results.event[i].description);
			// 	//$('#eventLink').append(b);
			// 	//$('#eventLink').append('<br />');
			// }

			// if(results.event[i].image!=null){
			// 	event.image = results.event[i].image.medium.url;
			// 	//var c = $('<img src=' + results.event[i].image.medium.url + '>');
			// 	//c.attr('href', results.event[i].url);
			// 	//$('#eventLink').append(c);
			// 	//$('#eventLink').append('<br />');
			// }
//bandTickets();
