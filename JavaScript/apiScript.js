$(document).ready(function() {
    var apiKeyNum = "915de969c95b481981e233903172106";
    var apiKey = "http://api.apixu.com/v1/current.json?key=915de969c95b481981e233903172106&q=18976&days=5";
    var apiLink = "http://api.apixu.com/v1/current.json?key=";
    var dayLength = "&days=5";
    var loc;
  
    $('button').click(function() {
      var zipCode = $("#zipInput").val();
      console.log(zipCode);
    });
  
    $.getJSON('http://ipinfo.io', function(data) {
      loc = data.loc.split(",");
      
      var api = apiLink + apiKey + loc[0] + "," + loc[1] + dayLength;
      console.log(api);
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
	  var forecastDayData = data.forecast.forecastday;
		
	  var days = forecastDayData.map(function(x) {
		  return x.day;
		  console.log(days);
	  });
		
	  $('.forecastList .foreDay').each(function(x) {
		 $(this).html(x.condition); 
	  });
      
	  console.log(name);
      console.log(region);
      console.log(country);
      console.log(tempCelc);
      console.log(tempFahr);
      console.log(weatherIconCode);
      
      $('.place').html("<h1>" + name + " " + region + ", " + country + "</h1>");
      $('.tempFahr').html("<h2>" + tempFahr + "&#730;(F) | " + tempCelc + "&#730;(C)</h2>");
      $('.text').html("<h3>" + weatherText + "</h3>");
      $('.wind').html("<h3>" + windMPH + "mph " + windDir + "<h3>");
    });
});