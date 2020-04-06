// Initial array of cities
var cities = [];

// Function for displaying movie data
function renderButtons() {

    // Deleting the city buttons prior to adding new city buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttonsContainer").empty();

    // Looping through the array of movies
    for (var i = 0; i < cities.length; i++) {

        // Then dynamicaly generating buttons for each city in the array.
        var a = $("<button>");
        // Adding a class
        a.addClass("city button is-medium is-fullwidth");
        // Adding a data-attribute with a value of the cities at index i
        a.attr("data-name", cities[i]);
        // Providing the button's text with a value of the cities at index i
        a.text(cities[i]);
        // Adding the button to the HTML
        $("#buttonsContainer").prepend(a);
    }
}

// This function handles events where one button is clicked
$("#addCity").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    //if no text in input return nothing
    if ($("#cityInput").val() === "") {
        return;
    }

    // This line will grab the text from the input box
    var city = $("#cityInput").val().trim();
    // The city from the textbox is then added to our array
    cities.push(city);

    // calling renderButtons which handles the processing of our cities array
    renderButtons();
});

// Function for dumping the JSON content for each button into the div with current weather
function displayCityInfo() {
    $("#fiveDays").removeClass("displayNone");
    $("#forecastHeader").removeClass("displayNone");
    $("#currentWeather").removeClass("displayNone");
    $("#info").removeClass("displayNone");
    var city = $(this).attr("data-name");
    var apiKey = "ce453ac74e12415c59da090746a2c162";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ce453ac74e12415c59da090746a2c162";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var date = new Date(response.dt * 1000).toLocaleDateString();
        var icon = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        //console.log(icon);
        //console.log(response);
        
        $("#nameDateIcon").html(response.name + " " + "(" + date +")").addClass("currentDayHeader").append(icon);
        $("#temperature").html("Temperature: " + response.main.temp + " °F");
        $("#humidity").html("Humidity: " + response.main.humidity + " %");
        $("#windSpeed").html("Wind Speed: " + response.wind.speed + " MPH");
        
        // UV Index API Call
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
            method: "GET"
        }).then(function (response) {
            //console.log(response);
            $("#UVIndex").html("UV Index: ");
            $("#UVIndex").append("<button id=uvindex>" + response.value + "</button>");
        })
        
    }).catch(function (error) {
        console.log(error);
    })
    //five day forecast
    $.ajax({
        url:"http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey,
        method: "GET"
    }).then(function (response){
        console.log(response);
        //day1
        var date1 = new Date(response.list[3].dt * 1000).toLocaleDateString();
        var icon1 = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.list[3].weather[0].icon + ".png");
        $("#date1").html(date1);
        $("#icon1").html(icon1);
        $("#temp1").html("Temperature: " + response.list[3].main.temp + " °F");
        $("#humidity1").html("Humidity: " + response.list[3].main.humidity + " %");
        //day2
        var date2 = new Date(response.list[11].dt * 1000).toLocaleDateString();
        var icon2 = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.list[11].weather[0].icon + ".png");
        $("#date2").html(date2);
        $("#icon2").html(icon2);
        $("#temp2").html("Temperature: " + response.list[11].main.temp + " °F");
        $("#humidity2").html("Humidity: " + response.list[11].main.humidity + " %");
        //day3
        var date3 = new Date(response.list[19].dt * 1000).toLocaleDateString();
        var icon3 = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.list[19].weather[0].icon + ".png");
        $("#date3").html(date3);
        $("#icon3").html(icon3);
        $("#temp3").html("Temperature: " + response.list[19].main.temp + " °F");
        $("#humidity3").html("Humidity: " + response.list[19].main.humidity + " %");
        //day4
        var date4 = new Date(response.list[27].dt * 1000).toLocaleDateString();
        var icon4 = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.list[27].weather[0].icon + ".png");
        $("#date4").html(date4);
        $("#icon4").html(icon4);
        $("#temp4").html("Temperature: " + response.list[27].main.temp + " °F");
        $("#humidity4").html("Humidity: " + response.list[27].main.humidity + " %");
        //day5
        var date5 = new Date(response.list[35].dt * 1000).toLocaleDateString();
        var icon5 = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.list[35].weather[0].icon + ".png");
        $("#date5").html(date5);
        $("#icon5").html(icon5);
        $("#temp5").html("Temperature: " + response.list[35].main.temp + " °F");
        $("#humidity5").html("Humidity: " + response.list[35].main.humidity + " %");
    })
}

// Function for displaying the city info
// Using $(document).on instead of $(".city").on to add event listeners to dynamically generated elements
$(document).on("click", ".city", displayCityInfo);

// Calling the renderButtons function at least once to display the initial list of cities
//renderButtons();