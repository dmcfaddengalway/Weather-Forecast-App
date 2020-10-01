require('dotenv').config();
'use strict';

window.onload = function() {
    const apiKeyNum = process.env.API_KEY;
    let apiURL = process.env.API_URL;
    let zipCode;

    $('button').click(function() {
      zipCode = $("#zipInput").val();
      console.log(zipCode);
    });

    $.getJSON(apiURL, function(i) {
        let lat = i.location.lat;
        let lon = i.location.lon;

        console.log(lon);
        console.log(lat);

        let fiveDays = "&q=" + zipCode + "&days=5";
        let api = apiLink + apiKeyNum + lat + ',' + lon + fiveDays;

        $.getJSON(apiURL, function(data) {
            let name = data.location.name;
            let region = data.location.region;
            let country = data.location.country;
            let tempCelc = data.current.temp_c;
            let tempFahr = data.current.temp_f;
            let weatherText = data.current.condition.text;
            let windMPH = data.current.wind_mph;
            let windDir = data.current.wind_dir;
            let weatherIconCode = data.current.condition.code;

            let forecastDayData = data.forecast.forecastday;
            let days = forecastDayData.map(function(x) {
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

                let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                                    'Friday', 'Saturday', 'Sunday'];
                let today = new Date();
                let dayID = today.getDay();

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
