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

            var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                                'Friday', 'Saturday', 'Sunday'];
            var today = new Date();
            var dayID = today.getDay();

            //Loop through an insert weather icons
            $('.forecastIcon').each(function(i) {
                $(this).attr('src', days[i].condition.icon);
            });

            //Loop through and insert future days of the week
            $('.forecastDayNumber').each(function(i, el) {
                $(el).html(daysOfTheWeek, [(dayID + i) % 7]);
            });

            //Loop through and insert Low - High temperature of the day
            $('.forecastDayHighsAndLows').each(function(i) {
               $(this).html((minTempC[i]) + " - " + (maxTempC));
            });

        }

        $('.place').html("<h1>" + name + " " + region + ", " + country + "</h1>");
        $('.tempFahr').html("<h2>" + tempFahr + "(F) | " + tempCelc + "(C)</h2>");
        $('.text').html("<h3>" + weatherText + "</h3>");
        $('.wind').html("<h3>" + windMPH + "mph " + windDir + "<h3>");

        forecastData();
    });
});