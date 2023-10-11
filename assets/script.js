var searchBtn = $('.citySearchBtn');
var citySearch = $('.citySearch');
var cityList = $('.cityList');
var cityHistory = JSON.parse(localStorage.getItem("City Choice")) || [];
var apiKey = "4d4a164cfde95971ff68068cb1a1c7b9";

$(document).ready(function() {


function getApi(cityLookUp) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityLookUp}&units=imperial&appid=${apiKey}`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            $('#currentDay').text(cityLookUp + ": " + dayjs().format('MM/DD/YY'));
            $('.mainCard').children().eq(1).text('Temp: ' + data.list[0].main.temp + ' °F');
            $('.mainCard').children().eq(2).text('Wind Speed: ' + data.list[0].wind.speed + ' mph');
            $('.mainCard').children().eq(3).text('Humidity: ' + data.list[0].main.humidity + '%');
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
            for (var i = 0; i < data.list.length; i+=8) {
                console.log(data.list[i]);
                var comingUp = $('<h3></h3>').text('Coming up...');
                var temp = $('<h4></h4>').text('Temp: ' + data.list[i].main.temp + ' °F');
                var windSpeed = $('<h5></h5>').text('Wind Speed: ' + data.list[i].wind.speed + ' mph');
                var humidity = $('<h6></h6>').text('Humidity: ' + data.list[i].main.humidity + '%');
                var time = $('<h3></h3>').text(data.list[i].dt_txt);

                $('.fourDay').append(comingUp);
                $('.fourDay').append(time);
                $('.fourDay').append(temp);
                $('.fourDay').append(windSpeed);
                $('.fourDay').append(humidity);


                // In the for loop, target the card that represents the day
            }
        })
};

function geoLocator(cityLookUp) {
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityLookUp}&limit=1&appid=${apiKey}`
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
        li.text(city);
        li.attr("data-index", i);

        $('.cityList').append(li);
    }
}

function initCity() {
    var storedCity = JSON.parse(localStorage.getItem("City Choice"));

    if (storedCity !== null) {
        cityHistory = storedCity;
    }

    renderCity();
}

function storeCity() {
    localStorage.setItem("City Choice", JSON.stringify(cityHistory));
}


$('.cityForm').on("submit", function(event) {
    event.preventDefault();
    $('.searchMsg').hide();
    var cityText = $('.citySearch').val();

    if (cityText === ""){
        return;
    }

    cityHistory.push(cityText);

    storeCity();
    renderCity();
    getApi(cityText);
    geoLocator(cityText);
});

renderCity();

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