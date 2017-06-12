var band = $(this).attr("data-name");
var keywords = 'indie';
var l = '08901'; // Zip code search parameter
var within = '30';
var units = 'miles';
var app_key = 'hNbJCFtMGbfsfr9T';

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
		l = $('#zipBands').val();
		$('#eventLink').empty();
		bandTickets();
		validEntry=false;
	}
	});

function bandTickets (){
	// Built url = http://api.eventful.com/json/events/search?...?q=music&category=music&keywords=indie&l=08901&within=10&units=miles&app_key=hNbJCFtMGbfsfr9T
	var searchUrl = 'http://api.eventful.com/json/events/search?...?q=music&category=music&keywords=' + keywords + '&l=' + l + '&within=' + within + '&units=' + units + '&app_key=' + app_key;
	$.ajax({
	url: searchUrl,
	dataType: 'jsonp',
	method: "GET"
	}).done(function(response){
	// Store ajax JSON results
		var results = response.events

		for(var i=0; i<10; i++){

			var a = $('<a>');
			a.attr('href', results.event[i].url);
			a.attr('target', '_blank');
			a.html(results.event[i].title);
			$('#eventLink').append('<br />');
			$('#eventLink').append(a);
			$('#eventLink').append('<br />');

			if(results.event[i].description!=null){
				var b = $('<div>');
				b.html(results.event[i].description);
				$('#eventLink').append(b);
				$('#eventLink').append('<br />');
			}

			if(results.event[i].image!=null){
				var c = $('<img src=' + results.event[i].image.medium.url + '>');
				c.attr('href', results.event[i].url);
				$('#eventLink').append(c);
				$('#eventLink').append('<br />');
			}
		}
	});
	}
bandTickets();
