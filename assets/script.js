var searchBtn = $('.citySearchBtn');
var citySearch = $('.citySearch');
var cityList = $('.cityList');
var cityHistory = JSON.parse(localStorage.getItem("City Choice")) || [];
var apiKey = "4d4a164cfde95971ff68068cb1a1c7b9";

$(document).ready(function() {


function getApi(cityLookUp) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityLookUp}&units=imperial&appid=${apiKey}`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            
            console.log(data);
            $('#currentDay').text(cityLookUp + ": " + dayjs().format('MM/DD/YY'));
            $('.mainCard').children().eq(1).attr("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`)
            $('.mainCard').children().eq(2).text('Temp: ' + data.main.temp + ' °F');
            $('.mainCard').children().eq(3).text('Wind Speed: ' + data.wind.speed + ' mph');
            $('.mainCard').children().eq(4).text('Humidity: ' + data.main.humidity + '%');
        })
};

function fiveDay(lat, lon) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            $('.fourDay').empty();
            for (var i = 6; i < data.list.length; i+=8) {
                console.log(data.list[i]);
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


                // In the for loop, target the card that represents the day
            }
        })
};

function geoLocator(cityLookUp) {
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityLookUp}&limit=1&appid=${apiKey}`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            fiveDay(data[0].lat, data[0].lon)
        })
}


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


$('.cityForm').on("submit", function(event) {
    event.preventDefault();
    $('.searchMsg').hide();
    var cityText = $('.citySearch').val();

    if (cityText === ""){
        return;
    }
    localHistory(cityText);
    getApi(cityText);
    geoLocator(cityText);
});

renderCity();

function localHistory(cityText) {
    if (cityHistory.indexOf(cityText)!== -1) return;

    cityHistory.push(cityText);
    localStorage.setItem("City Choice", JSON.stringify(cityHistory));
    renderCity();
};


$('.cityList').on("click", ".historyBtn", function(e) {
    var city = $(this).text();
    getApi(city);
    geoLocator(city);
})

});

// searchBtn.on('click', function(event) {
//     event.preventDefault()
//     var location = $('.citySearch').val();
//     console.log(location);

//     storeCity();
//     renderCity();





// function renderCity() {
//     var cityStored = JSON.parse(localStorage.getItem("City Choice"));
//     var cityDiv = $('.cityDiv');
//     var newButton = $('<button></button>').text(cityStored);
//     cityDiv.children().eq(2).append(newButton);
// };


// function getApi() {
//     var location = $('.citySearch').val();
//     console.log(location);
// }


// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// 30.26793198416416, -97.73721194336943