$(document).ready(function(){
// Get current month, date and day and set the date format
//const currentMonth = (dayjs().format("MM"));
// const dayOfWeek = (dayjs().format("dddd"));
//const dayOfMonth = (dayjs().format("D"));
//const currentYear = (dayjs().format("YYYY"));

//Reference https://zetcode.com/javascript/dayjs/
let now = dayjs();
let currentDayVal = (now.format("MM/DD/YYYY"));

let searchHistory = $(".city-searched");


// Return the current day, month and day 
$("#currentDay").text(currentDayVal);

// Initialize
  init();

 // Initialize Function
    function init() {
    $("#five-day-forecast").addClass("d-none");

    }

    // Trigger a Button Click on Enter
    // let searchInput = document.getElementById("citySearch");
    //     searchInput.addEventListener("keydown", function(event) {
    //         // Number 13 is the "Enter" key on keyboard
    //         if (event.key === 13) {
    //             // Cancel the default action, if needed
    //             event.preventDefault();
    //             // Trigger the button element with a click
    //             document.getElementById("button-search").click();
    //           }
    //     });

    // When the search button is clicked
    $("#button-search").click(function(){

        // Show 5 Day forecast cards
        $("#five-day-forecast").removeClass("d-none");

        var weatherCity ="https://api.openweathermap.org/data/2.5/weather";
        var uvIndex = "https://api.openweathermap.org/data/2.5/onecall";
        //let city = "london";
        let city = $("#citySearch").val().trim();
        var APIKEY = "0cc6bbe69909a36c9e8389677b2668e8";

        if (city === "") return;
      
        // Get data from weather API call
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
                $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
                $("#humidity").text("Humidity: " + response.main.humidity + "%");
                $("#city-weather-icon").text();
                
                // Convert the temp to fahrenheit
                var tempF = (response.main.temp - 273.15) * 1.80 + 32;

                // add temp content to html
                 $("#temperature").text("Temperature: " + tempF.toFixed(1) + " °F");

                // Get Lat/Long
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
                    $("#city-weather-icon img").attr("src", weatherIconURL + weatherIcons.scatteredClouds + weatherIconURLSuffix);
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
        
             
                // Data call for UV Index (OneCall) using Lat/Long from weather API URL
                $.ajax({
                    url: uvIndex + "?lat=" + cityLat + "&lon=" + cityLong + "&appid=" + APIKEY,
                    method: "GET"
                    }).then(function(response) {
                        // console.log(typeof response.daily[0].weather[0].icon);
                        $("#uvIndex").text("UV Index:");
                        $("#uvIndexNum").text(response.current.uvi);
                        
                        
                        addClassUVIndex(); 


                // Five Day Forecast Data
                    // Day 1
                    let forecastDay1Date = now.add('1', 'day');
                    $(".day1-forecast-date").text(forecastDay1Date.format('MM/DD/YYYY'));
                    $(".day1-forecast-icon").attr("src", weatherIconURL + response.daily[0].weather[0].icon + ".png");
                    $(".day1-forecast-icon").attr("alt", response.daily[0].weather[0].description);
                    let kelvinForecastDay1 = ((response.daily[0].temp.day - 273.15) * 1.80 + 32).toFixed(2);
                    $(".day1-forecast-temp").text("Temp: " + kelvinForecastDay1 + " °F");
                    $(".day1-forecast-humidity").text("Humidity: " + response.daily[0].humidity + "%");

                     // Day 2
                     let forecastDay2Date = now.add('2', 'day');
                     $(".day2-forecast-date").text(forecastDay2Date.format('MM/DD/YYYY'));
                     $(".day2-forecast-icon").attr("src", weatherIconURL + response.daily[1].weather[0].icon + ".png");
                     $(".day2-forecast-icon").attr("alt", response.daily[1].weather[0].description);
                     let kelvinForecastDay2 = ((response.daily[1].temp.day - 273.15) * 1.80 + 32).toFixed(2);
                     $(".day2-forecast-temp").text("Temp: " + kelvinForecastDay2 + " °F");
                     $(".day2-forecast-humidity").text("Humidity: " + response.daily[1].humidity + "%");

                     // Day 3
                     let forecastDay3Date = now.add('3', 'day');
                     $(".day3-forecast-date").text(forecastDay3Date.format('MM/DD/YYYY'));
                     $(".day3-forecast-icon").attr("src", weatherIconURL + response.daily[2].weather[0].icon + ".png");
                     $(".day3-forecast-icon").attr("alt", response.daily[2].weather[0].description);
                     let kelvinForecastDay3 = ((response.daily[2].temp.day - 273.15) * 1.80 + 32).toFixed(2);
                     $(".day3-forecast-temp").text("Temp: " + kelvinForecastDay3 + " °F");
                     $(".day3-forecast-humidity").text("Humidity: " + response.daily[2].humidity + "%");

                     // Day 4
                     let forecastDay4Date = now.add('4', 'day');
                     $(".day4-forecast-date").text(forecastDay4Date.format('MM/DD/YYYY'));
                     $(".day4-forecast-icon").attr("src", weatherIconURL + response.daily[3].weather[0].icon + ".png");
                     $(".day4-forecast-icon").attr("alt", response.daily[3].weather[0].description);
                     let kelvinForecastDay4 = ((response.daily[3].temp.day - 273.15) * 1.80 + 32).toFixed(2);
                     $(".day4-forecast-temp").text("Temp: " + kelvinForecastDay4 + " °F");
                     $(".day4-forecast-humidity").text("Humidity: " + response.daily[3].humidity + "%");

                     // Day 5
                     let forecastDay5Date = now.add('5', 'day');
                     $(".day5-forecast-date").text(forecastDay5Date.format('MM/DD/YYYY'));
                     $(".day5-forecast-icon").attr("src", weatherIconURL + response.daily[4].weather[0].icon + ".png");
                     $(".day5-forecast-icon").attr("alt", response.daily[4].weather[0].description);
                     let kelvinForecastDay5 = ((response.daily[4].temp.day - 273.15) * 1.80 + 32).toFixed(2);
                     $(".day5-forecast-temp").text("Temp: " + kelvinForecastDay5 + " °F");
                     $(".day5-forecast-humidity").text("Humidity: " + response.daily[4].humidity + "%");
                       
                });

                // // Use .setItem() to store object in storage and JSON.stringify to convert it as a string. Stores the new search in the 0 index.

                    let storeObj = {"citysearchlist":city};
                    localStorage.setItem("weatherDash" + 0, JSON.stringify(storeObj));
                    $("#city-list").prepend('<li class="list-group-item city-searched">' + city + '</li>');
                

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

    // function renderCityList() {
    //     // Use JSON.parse() to convert text to JavaScript object
    //     var lastGrade = JSON.parse(localStorage.getItem(storeObj));
    //     // Check if data is returned, if not exit out of the function
    //     if (lastGrade !== null) {
    //     document.getElementById("saved-name").innerHTML = lastGrade.student;
    //     document.getElementById("saved-grade").innerHTML = lastGrade.grade;
    //     document.getElementById("saved-comment").innerHTML = lastGrade.comment;
    //     } else {
    //       return;
    //     }
    //   }
   

});