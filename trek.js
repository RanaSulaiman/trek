
var listUrl =  "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);
  //$("#show-trip").empty();

  var trips = _.template($('#trips').html());
  for (var i = 0; i < response.length; i++) {
    var generatedHtml = trips({
      data: response[i]
    });

    $("#alltrips table").append(generatedHtml);
  }

  // showTripClickHandler
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
  //  $("#alltrips table").empty();
   $("#alltrips table").hide();

// Show the trip information
  var trip = _.template($('#one-trip').html());
    var generatedHtml = trip({
      data: response
    });

    $("#show-trip").append(generatedHtml);

    // Submit post to reserve a spot
    $('form').submit(function(e){
      e.preventDefault();
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
  $("#show-trip").empty();
  $("#alltrips table").show();


  $.get(listUrl, successCallback).fail(failureCallback);
};

$(document).ready(function() {
  $("#alltrips table").hide();

  $('#load').click(clickHandler);
  // $('#load').on("click",'table',clickHandler);
});
