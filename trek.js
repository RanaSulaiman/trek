
var listUrl =  "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var trips = _.template($('#trips').html());
  for (var i = 0; i < response.length; i++) {
    var generatedHtml = trips({
      data: response[i]
    });

    $("#tbody").append(generatedHtml);
  }
  // showTripClickHand
  $('.trip-link').click(showTripClickHandler);
};

var clickHandler = function(event) {
  $("#show-trip").empty();
  $("#alltrips table").show();
  $("#tbody").empty();


  $.get(listUrl, successCallback).fail(failureCallback);
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

// Show one trip information
var showTripClickHandler = function(event){
  console.log("clicked on trip-link");

// data is jQuery function, shows in the console object{tripId: 2}
  console.log("trip_id = " , $(this).data().tripId);
  var id = $(this).data().tripId;
  $.get(listUrl + "/" + id , showTripCallback).fail(failureCallback);
};

var showTripCallback= function(response){
   $("#alltrips table").hide();

  var trip = _.template($('#one-trip').html());
    var generatedHtml = trip({
      data: response
    });

    $("#show-trip").empty().append(generatedHtml);
    // or $("#show-trip").html(generatedHtml);

    // FormSubmitEventHabdler
    $('#reserve-form').submit(formSubmitHandler);
};

var formSubmitHandler = function(e){
  e.preventDefault();
  console.log("we are here");

  var url = $(this).attr("action");
  var formData = $(this).serialize();

  $.post(url, formData, function(response){
    $('#message').html('<p> Thanks for the reservation </p>');
    console.log(response);
  }).fail(function(){
    $('#message').html("<p>Sorry, You couldn't reserve for this trip</p>");
  });
};

var filterClickHandler = function(e){
  $("#alltrips table").show();
  $("#show-trip").empty();
  $("#tbody").empty();

  e.preventDefault();
  console.log("clicked trips by continent");

  var url = $(this).attr("action");
  console.log(this);
  var continent = $("#continent option:selected").html();
  // var formData = $(this).serialize();
  console.log(continent);
  var url = $(this).attr("action") + continent;
  console.log(url);

  $.get(url, successCallback).fail(function(){
    $('#message').html("<p>Sorry, Couldn't filter your trips</p>");
  });
};

$(document).ready(function() {
  $("#alltrips table").hide();
  $('#load').click(clickHandler);

  // Filter by Continenet
  $('header').on("submit","#trips-continent", filterClickHandler);
});
