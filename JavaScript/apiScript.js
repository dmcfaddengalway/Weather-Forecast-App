$(document).ready(function() {
    var apiKeyNum = "a79b350f005b4306b1313540170308";
    var apiKey = "http://api.apixu.com/v1/forecast.json?key=a79b350f005b4306b1313540170308&q=18976";
    var apiLink = "http://api.apixu.com/v1/current.json?key=";
    var dayLength = "&days=5";
    var loc;

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

        var forecastDayData = data.forecast.forecastday;
        var days = forecastDayData.map(function(x) {
            return x.day;
        });

        console.log(days);

        var maxTempC = days.map(function(x) {
            return x.maxtemp_c;
        });

        var minTempC = days.map(function(x) {
            return x.mintemp_c;
        });

        var maxTempF = days.map(function(x) {
            return x.maxtemp_f;
        });

        var minTempF = days.map(function(x) {
            return x.mintemp_f;
        });

        function forecastData() {
            $('.forecastList img').each(function(i) {
                $(this).attr('src', days[i].condition.code);
            });

            $('.forecastDayOne').each(function(i) {
               $(this).html((minTempC[i]) + " - " + (maxTempC));
            });

        }

        console.log(name);
        console.log(region);
        console.log(country);
        console.log(tempCelc);
        console.log(tempFahr);
        console.log(weatherIconCode);
        console.log(forecastDayData);

        $('.place').html("<h1>" + name + " " + region + ", " + country + "</h1>");
        $('.tempFahr').html("<h2>" + tempFahr + "(F) | " + tempCelc + "(C)</h2>");
        $('.text').html("<h3>" + weatherText + "</h3>");
        $('.wind').html("<h3>" + windMPH + "mph " + windDir + "<h3>");
    });
});