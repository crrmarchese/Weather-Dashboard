$(document).ready(function(){
// Get current month, date and day and set the date format
const currentMonth = (dayjs().format("MM"));
const dayOfWeek = (dayjs().format("dddd"));
const dayOfMonth = (dayjs().format("D"));
const currentYear = (dayjs().format("YYYY"));


// Return the current day, month and day 
$("#currentDay").text(dayOfWeek + ", "+ currentMonth + "/" + dayOfMonth + "/" + currentYear);

    $("#button-search").click(function(){
        
        var weatherCity ="https://api.openweathermap.org/data/2.5/weather";
        var uvIndex = "https://api.openweathermap.org/data/2.5/onecall";
        //let city = "london";
        let city = $("#citySearch").val();
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
                
                // Convert the temp to fahrenheit
                var tempF = (response.main.temp - 273.15) * 1.80 + 32;

                // add temp content to html
                 $("#temperature").text("Temperature (F) " + tempF.toFixed(2));
                let cityLat = response.coord.lat;
                let cityLong = response.coord.lon;
                //console.log(cityLat, cityLong);
                $.ajax({
                    url: uvIndex + "?lat=" + cityLat + "&lon=" + cityLong + "&appid=" + APIKEY,
                    method: "GET"
                    }).then(function(response) {
                         console.log(response);
                        $("#uvIndex").text("UV Index: " + response.current.uvi);

                });
            });
        
    });
   
    
})