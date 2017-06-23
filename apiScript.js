$(document).ready(function() {
    var apiKey = "http://api.apixu.com/v1/current.json?key=915de969c95b481981e233903172106&q=18976";
  
    $('button').click(function() {
      var zipCode = $("#zipInput").val();
      console.log(zipCode);
    });
  
    $.getJSON(apiKey, function(data) {
      var name = data.location.name;
      var region = data.location.region;
      var country = data.location.country;
      var tempCelc = data.current.temp_c;
      var tempFahr = data.current.temp_f;
      var weatherText = data.current.condition.text;
      var windMPH = data.current.wind_mph;
      var windDir = data.current.wind_dir;
      var weatherIconCode = data.current.condition.code;
      console.log(name);
      console.log(region);
      console.log(country);
      console.log(tempCelc);
      console.log(tempFahr);
      console.log(weatherIconCode);
      
      $('.place').html("<h1>" + name + " " + region + ", " + country + "</h1>");
      $('.tempFahr').html("<h2>" + tempFahr + "&#730; (F) | " + tempCelc + "&#730; (C)</h2>");
      $('.text').html("<h3>" + weatherText + "</h3>");
      $('.wind').html("<h3>" + windMPH + "mph " + windDir + "<h3>");
    });
});