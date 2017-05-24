
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
  $("#alltrips").hide();

// Show the trip information
  var trip = _.template($('#one-trip').html());
    var generatedHtml = trip({
      data: response
    });

    $("#show-trip").append(generatedHtml);

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
  // Associate the click handler
  $('#load').click(clickHandler);
  // $('#load').on("click", "tbody", clickHandler);



});
