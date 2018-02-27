'use strict';

window.onload = function() {
    var apiKeyNum = "915de969c95b481981e233903172106";
    var zipCode;

    $('button').click(function() {
      zipCode = $("#zipInput").val();
      console.log(zipCode);
    });

    $.getJSON("http://api.apixu.com/v1/forecast.json?key=915de969c95b481981e233903172106&q=18976&days=5", function(i) {
        var lat = i.location.lat;
        var lon = i .location.lon;

        console.log(lon);
        console.log(lat);

        var apiLink = "http://api.apixu.com/v1/forecast.json?key=";
        var fiveDays = "&q=" + zipCode + "&days=5";
        var api = apiLink + apiKeyNum + lat + ',' + lon + fiveDays;

        $.getJSON("http://api.apixu.com/v1/forecast.json?key=915de969c95b481981e233903172106&q=18976&days=5", function(data) {
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

            //Reutsn Objects of weather details for the next days
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

            function forecastDays() {

                var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                                    'Friday', 'Saturday', 'Sunday'];
                var today = new Date();
                var dayID = today.getDay();

                //Loop through and insert future days of the week
                $('.forecastDayNumber').each(function(i, el) {
                    $(el).html(daysOfTheWeek[(dayID + i) % 7]);
                });

                //Loop through and insert Low - High temperature of the day
                $('.forecastDayHighsAndLows').each(function(i) {
                   $(this).html(Math.round(minTempC[i]) + " - " + Math.round(maxTempC[i]));
                });

                //Loop through an insert weather icons
                $('.forecastIcon').each(function(i) {
                    $(this).attr('src', days[i].condition.icon);
                });

            };

            function determineBackground() {
                var dayDescribe = data.current.condition.text;
                var dayDescribeCode = data.current.condition.code; //data.current.condition.code
                var bigBack = $("body");
                var smallBack = $(".currentWeather");

                //Tests if the function was called
                console.log("determineBackground() was called");

                console.log(dayDescribe);
                console.log(dayDescribeCode);

                if (dayDescribeCode === 1003) {
                    bigBack.css({'background-image': 'url("assets/images/Cloudy.jpg")', "background-size": "cover"});
                    smallBack.css({'background-image': 'url("assets/images/Cloudy.jpg")', "background-size": "cover"});
                    console.log("Cloudy");
                } else if (dayDescribeCode === 1000) {
                    bigBack.css({'background-image': 'url("assets/images/Sunny.jpg")', "background-size": "cover"});
                    smallBack.css({'background-image': 'url("assets/images/Sunny.jpg")', "background-size": "cover"});
                    console.log("Sunny");
                } else if (dayDescribeCode === 1183 || dayDescribeCode === 1063) {
                    bigBack.css({'background-image': 'url("assets/images/Rainy.jpg")', "background-size": "cover"});
                    smallBack.css({'background-image': 'url("assets/images/Rainy.jpg")', "background-size": "cover"});
                    console.log("Light Rain");
                }

            };

            function forecastHours() {
                var hoursOfTheDay = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
                var today = new Date();
                var hour = today.getHours();

                //Loop through hour elements and print out the future ones

            };

            $('.place').html("<h1>" + name + " " + region + ", " + country + "</h1>");
            $('.tempFahr').html("<h2>" + tempFahr + "&#8457; | " + tempCelc + "&#8451;</h2>");
            $('.text').html("<h3>" + weatherText + "</h3>");
            $('.wind').html("<h3>" + windMPH + "mph " + windDir + "<h3>");

            forecastDays();
            determineBackground();
            forecastHours();
        });
    });
};