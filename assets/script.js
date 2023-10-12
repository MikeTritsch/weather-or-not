// Global Variables
var cityHistory = JSON.parse(localStorage.getItem("City Choice")) || [];
var apiKey = "4d4a164cfde95971ff68068cb1a1c7b9";

// JQuery Docu-ready Function
$(document).ready(function() {

// Current Weather API Call
function getApi(cityLookUp) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityLookUp}&units=imperial&appid=${apiKey}`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            
            $('#currentDay').text(cityLookUp + ": " + dayjs().format('MM/DD/YY'));
            $('.mainCard').children().eq(1).attr("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`)
            $('.mainCard').children().eq(2).text('Temp: ' + data.main.temp + ' °F');
            $('.mainCard').children().eq(3).text('Wind Speed: ' + data.wind.speed + ' mph');
            $('.mainCard').children().eq(4).text('Humidity: ' + data.main.humidity + '%');
        })
};

// Five Day API Call
function fiveDay(lat, lon) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            $('.fourDay').empty();
            for (var i = 6; i < data.list.length; i+=8) {
                var temp = $('<h4></h4>').text('Temp: ' + data.list[i].main.temp + ' °F');
                var windSpeed = $('<h5></h5>').text('Wind Speed: ' + data.list[i].wind.speed + ' mph');
                var humidity = $('<h6></h6>').text('Humidity: ' + data.list[i].main.humidity + '%');
                var time = $('<h3></h3>').text(dayjs.unix(data.list[i].dt).format("MM/DD/YY"));
                var icon = $('<img>')
                icon.attr("src", `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`);

                $('.fourDay').append(time);
                $('.fourDay').append(icon);
                $('.fourDay').append(temp);
                $('.fourDay').append(windSpeed);
                $('.fourDay').append(humidity);
            }
        })
};

// Geolocation API Call
function geoLocator(cityLookUp) {
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityLookUp}&limit=1&appid=${apiKey}`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            fiveDay(data[0].lat, data[0].lon)
        })
}

// Appends searched city/history list to page
function renderCity() {
    $('.cityList').text("");

    for (var i = 0; i < cityHistory.length; i++) {
        var city = cityHistory[i];

        var li = $("<button></button>");
        li.addClass("historyBtn");
        li.text(city);

        $('.cityList').append(li);
    }
}

// Event listener tied to the city search submittal
$('.cityForm').on("submit", function(event) {
    event.preventDefault();
    // Hides "search to start" message
    $('.searchMsg').hide();
    var cityText = $('.citySearch').val();

    if (cityText === ""){
        return;
    }
    // Runs localStorage functions and the API calls
    localHistory(cityText);
    getApi(cityText);
    geoLocator(cityText);
});

renderCity();

// Prevents button history from repeating values
function localHistory(cityText) {
    if (cityHistory.indexOf(cityText)!== -1) return;

    cityHistory.push(cityText);
    localStorage.setItem("City Choice", JSON.stringify(cityHistory));
    renderCity();
};

// Gives the localStorage buttons functionality
$('.cityList').on("click", ".historyBtn", function(e) {
    var city = $(this).text();
    getApi(city);
    geoLocator(city);
})

});