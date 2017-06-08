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

	var searchUrl = 'http://api.eventful.com/json/events/search?...?q=music&keywords=' + keywords + '&l=' + l + '&within=' + within + '&units=' + units + '&app_key=' + app_key;
	
	$.ajax({
	url: searchUrl,
	dataType: 'jsonp',
	method: "GET"
	}).done(function(response){
	// Store ajax JSON results
	var results = response.events

	for(var i=0; i<5; i++){

		var a = $('<div>');
		a.attr('id', 'title');
		a.html(results.event[i].title);
		var b = $('<img src=' + results.event[i].image.medium.url + '>');
		b.attr('href', results.event[i].url);
		var c = $('<div>');
		c.html(results.event[i].url);
		console.log(c);
		$('#eventLink').append('<br />');
		$('#eventLink').append(a);
		$('#eventLink').append('<br />');
		$('#eventLink').append(b);
		$('#eventLink').append('<br />');
		$('#eventLink').append(c);
		}
	});
	}
bandTickets();

// 	// Clear GIF area before displaying newly searched GIFS
// 	$('#viewGif').empty();
// 	// Loop over the results (Limit = 10)
// 	for(var i = 0; i < response.data.length; i++){



// 	// var p = $('<p>');
	// 	// p.html = response.data[i].rating;
	// 	// Create new div per wrestler
	// 	// Create new image still per wrestler
	// 	var wrestlerDiv = $('<div>');
		// 	var wrestlerImage = $('<img src=' + response.data[i].images.fixed_height_still.url + '>');
		// 	// Add class so I can monitor all gifs with later click event with animate on click option
		// 	wrestlerImage.addClass('gif');
		// 	// Animate on click switches image source from still to animated link based on these properties
		// 	wrestlerImage.attr('data-still', response.data[i].images.fixed_height_still.url);
		// 	wrestlerImage.attr('data-animate', response.data[i].images.fixed_height.url);
		// 	wrestlerImage.attr('data-state', 'still');
		// 	wrestlerDiv.append(wrestlerImage);
		//       			// Add new GIF to view GIF area appending per result
		// 	$('#viewGif').append(wrestlerDiv);
		// 	}
		// }); // End of ajax response function
		// } // End of displaywrestlerGifs
		// // On gif click this function is run
		// function startStop(){
		// 	// Current state determines click response
		// 	var state = $(this).attr('data-state')
		// 	// If still click will animate
		// 	if (state === 'still'){
		// 		$(this).attr('src', $(this).attr('data-animate'));
		// 		$(this).attr('data-state', 'animate');
		// 	}
		// 	// If animated click will switch to still
		// 	else{
		// 		$(this).attr('src', $(this).attr('data-still'));
		// 		$(this).attr('data-state', 'still');
		// 	}
		// }
		// $(document).on('click', '.gif', startStop);
		// // Render buttons per wrestler in array
		// function displayButtons(){
		// 	// Start by clearing buttons
		// 	$('#wrestlerButtons').empty();
		// 	// Rerender buttons per wrestler appending results
		// 	for(var i in topics){
		// 		var a = $('<button>');
		// 		a.addClass('wrestler');
		//       				a.attr("data-name", topics[i]);
		//       				a.text(topics[i]);;
		// 		$('#wrestlerButtons').append(a);
		// 	}
		// }
		// // All buttons have a wrestler class, so any one clicked will trigger displaywrestlerGifs();
		// $(document).on('click', '.wrestler', displayWrestlerGifs)
		// displayButtons();