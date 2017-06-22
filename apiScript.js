$(document).ready(function() {
    var apiLink = "http://api.apixu.com/v1/current.json?key=";
    var apiKey  = "915de969c95b481981e233903172106";
    var api = apiLink + apiKey;
    var loc;

    $.getJSON(apiKey, function(data) {
      var region = data.location.region;
      var tempCelc = data.current.temp_c;
      var tempFahr = data.current.temp_f;
      var visibility = data.current.vis_miles;
    });
});