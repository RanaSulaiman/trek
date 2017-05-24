
var listUrl =  "https://trektravel.herokuapp.com/trips";


var successCallback = function(response) {
  console.log("Success!");
  console.log(response);
  var trips = _.template($('#trips').html());
  for (var i = 0; i < response.length; i++) {
    var generatedHtml = trips({
      data: response[i]
    });

    // $("#alltrips table").append(generatedHtml);
    $("#show-trip").empty();
    $("#alltrips").append(generatedHtml);

  }

  $('.trip-link').click(function(event){
    console.log("clicked on trip-link");
    // data is jQuery function, shows in the console object{tripId: 2}
    console.log("trip_id = " , $(this).data().tripId);
    var id = $(this).data().tripId;
    $.get(listUrl + "/" + id , showTripCallback).fail(failureCallback);

  });
};


var showTripCallback= function(response){
  // $("#alltrips").hide();
   $("#alltrips").empty();



// Show the trip information
  var trip = _.template($('#one-trip').html());
    var generatedHtml = trip({
      data: response
    });

    $("#show-trip").append(generatedHtml);

    // Form
    $('form').submit(function(e){
      e.preventDefault();
      // return false;
      console.log("we are here");

      var url = $(this).attr("action");
      var formData = $(this).serialize();

      $.post(url, formData, function(response){
        $('#message').html('<p> Thanks for the reservation </p>');

        console.log(response);

      })
      .fail(function(){
        $('#message').html("<p>Sorry, You couldn't reserve for this trip</p>");
    });
    });
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  //$.get(url, successCallback);
  var target = $("#alltrips")
  target.append(
  "<table>" +
  "<thead>"+
  "<th> ID</th>" +
    "<th> Name</th>" +
    "<th> Continent</th>" +
    "<th> Weeks</th>" +
    "</thead>" +
    "</table>"
);
  $.get(listUrl, successCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#load').click(clickHandler);


});
