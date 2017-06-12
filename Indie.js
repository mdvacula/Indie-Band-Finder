var band = $(this).attr("data-name");
var keywords = 'indie';
var l = '08901'; // Zip code search parameter
var within = '30';
var units = 'miles';
var app_key = 'hNbJCFtMGbfsfr9T';

// $(document).on('click', '#zip', function(){
// 	if($('#zipBands').val().trim().length!=5){
// 		console.log($('#zipBands').val());
// 		$('#zipBands').attr('placeholder', "Please enter a zip code.");
// 	}
// 	else{
// 		l = $('#zipBands').val();
// 		$('#eventLink').empty();
// 		bandTickets();
// 	}
// 	});

$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=iR1kIlj68zTArGWwpJQfZ18ER3WRtj4G&attractionId=music&postalCode=07927",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});


var numArray = ["0","1","2","3","4","5","6","7","8","9"];
var testString1 = "07927";
var testString2 = "t7893";

function testValid(string){
  var valid = true;

  for(var x=0; x<string.length; x++){
    if(numArray.indexOf(string.charAt(x)) == -1){
       valid = false;
    }
    else{
      //do nothing
    }

  }

  return valid;

}

console.log("Should be valid " + testValid(testString1));
console.log("Should be invalid " + testValid(testString2));


// function bandTickets (){

// 	var searchUrl = 'http://api.eventful.com/json/events/search?...?q=music&keywords=' + keywords + '&l=' + l + '&within=' + within + '&units=' + units + '&app_key=' + app_key;

// 	$.ajax({
// 	url: searchUrl,
// 	dataType: 'jsonp',
// 	method: "GET"
// 	}).done(function(response){
// 	// Store ajax JSON results
// 	var results = response.events;

// 	for(var i=0; i<5; i++){

// 		var a = $('<a>');
// 		a.attr('id', 'title');
// 		a.attr('href', results.event[i].url);
// 		a.html(results.event[i].title);
// 		var b = $('<img src=' + results.event[i].image.medium.url + '>');
// 		var c = $('<a>');
// 		c.attr("href", results.event[i].url);
// 		c.attr("target", "_blank");
// 		c.html(results.event[i].title);
// 		console.log(c);
// 		$('#eventLink').append('<br />');
// 		$('#eventLink').append(a);
// 		$('#eventLink').append('<br />');
// 		$('#eventLink').append(b);
// 		$('#eventLink').append('<br />');
// 		$('#eventLink').append(c);
// 		$('#eventLink').append("br")
// 		}
// 	});
// 	}
// bandTickets();
