var band = $(this).attr("data-name");
var keywords = 'indie';
var l = '08901'; // Zip code search parameter
var within = '30';
var units = 'miles';
var app_key = 'hNbJCFtMGbfsfr9T';

$(document).on('click', '#zip', function(){
	if($('#zipBands').val().trim().length!=5){
		console.log($('#zipBands').val());
		$('#zipBands').attr('placeholder', "Please enter a zip code.");
	}
	else{
		l = $('#zipBands').val();
		$('#eventLink').empty();
		bandTickets();
	}
	});

// Search for and display wrestler GIFS
function bandTickets (){
// Build up the url with a wrestler and a limit added to the search

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