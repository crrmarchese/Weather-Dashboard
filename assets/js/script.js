$(document).ready(function(){
// Get current month, date and day and set the date format
const currentMonth = (dayjs().format("MM"));
// const dayOfWeek = (dayjs().format("dddd"));
const dayOfMonth = (dayjs().format("D"));
const currentYear = (dayjs().format("YYYY"));


// Return the current day, month and day 
$("#currentDay").text(currentMonth + "/" + dayOfMonth + "/" + currentYear);

    $("#button-search").click(function(){
        
        var weatherCity ="https://api.openweathermap.org/data/2.5/weather";
        var uvIndex = "https://api.openweathermap.org/data/2.5/onecall";
        //let city = "london";
        let city = $("#citySearch").val().trim();
        var APIKEY = "0cc6bbe69909a36c9e8389677b2668e8";
      
  
        $.ajax({
            url: weatherCity + "?q=" + city + "&" + "APPID=" + APIKEY,
            method: "GET"
            }).then(function(response) {
                // Log the queryURL
                // console.log(queryURL);
                // Log the resulting object
                // console.log(response);

                // Transfer content to HTML
                $("#cityName").text(response.name);
                $("#windSpeed").text("Wind Speed: " + response.wind.speed);
                $("#humidity").text("Humidity: " + response.main.humidity);
                $("#city-weather-icon").text();
                
                // Convert the temp to fahrenheit
                var tempF = (response.main.temp - 273.15) * 1.80 + 32;

                // add temp content to html
                 $("#temperature").text("Temperature (F) " + tempF.toFixed(2));
                // Get Lat/Long/Weather
                let cityLat = response.coord.lat;
                let cityLong = response.coord.lon;

                // Get weather icon for current day
                let weatherIconRes = (response.weather[0].description).toLowerCase();

                const weatherIconURL = "http://openweathermap.org/img/wn/";
                const weatherIconURLSuffix = "@2x.png";
                const weatherIcons = {
                    clearSky: "01d",
                    fewClouds: "02d",
                    scatteredClouds: "03d",
                    brokenClouds: "04d",
                    showerRain: "09d",
                    rain: "10d",
                    thunderstorm: "11d",
                    snow: "13d",
                    mist: "50d",
                };
                
                // Return weather icon depending on weather description
                if (weatherIconRes === "clear sky") {
                    $("#city-weather-icon img").attr("src", weatherIconURL + weatherIcons.clearSky + weatherIconURLSuffix);
                } else if (weatherIconRes === "few clouds") {
                    $("#city-weather-icon img").attr("src", weatherIconURL + weatherIcons.fewClouds+ weatherIconURLSuffix);
                } else if (weatherIconRes === "scattered clouds") {
                    $("#city-weather-icon img").attr("src", weatherIconURL + weatherIcons.scatterdClouds + weatherIconURLSuffix);
                } else if (weatherIconRes === "broken clouds") {
                    $("#city-weather-icon img").attr("src", weatherIconURL + weatherIcons.brokenClouds + weatherIconURLSuffix);
                } else if (weatherIconRes === "shower rain") {
                    $("#city-weather-icon img").attr("src", weatherIconURL + weatherIcons.showerRain + weatherIconURLSuffix).attr("alt", weatherIconRes);
                } else if (weatherIconRes === "rain") {
                    $("#city-weather-icon img").attr("src", weatherIconURL + weatherIcons.rain + weatherIconURLSuffix);
                } else if (weatherIconRes === "thunderstorm") {
                    $("#city-weather-icon img").attr("src", weatherIconURL + weatherIcons.thunderstorm + weatherIconURLSuffix);
                } else if(weatherIconRes === "snow") {
                    $("#city-weather-icon img").attr("src", weatherIconURL + weatherIcons.snow + weatherIconURLSuffix);
                } else {
                    $("#city-weather-icon img").attr("src", weatherIconURL + weatherIcons.mist + weatherIconURLSuffix);
                }
        
             
                // Data call for UV Index
                $.ajax({
                    url: uvIndex + "?lat=" + cityLat + "&lon=" + cityLong + "&appid=" + APIKEY,
                    method: "GET"
                    }).then(function(response) {
                         //console.log(response);
                        $("#uvIndex").text("UV Index:");
                        $("#uvIndexNum").text(response.current.uvi);
                        
                        addClassUVIndex(); 
                       
                });
            });
        
    });

    function addClassUVIndex() {
        let uvIndex = parseFloat($("#uvIndexNum").text());
    //console.log(typeof uvIndex);
        if (uvIndex >=0 && uvIndex <= 2) {
            $("#uvIndexNum").addClass("uv-low");
        } else if (uvIndex > 2 && uvIndex <= 5) {
            $("#uvIndexNum").addClass("uv-moderate");
        } else if (uvIndex > 5 && uvIndex <= 7) {
            $("#uvIndexNum").addClass("uv-high");
        } else if (uvIndex > 7 && uvIndex <= 9){
            $("#uvIndexNum").addClass("uv-very-high");
        } else {
            $("#uvIndexNum").addClass("uv-extreme");
        }
    } 

});