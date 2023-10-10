
function getApi() {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Austin&units=imperial&appid=4d4a164cfde95971ff68068cb1a1c7b9`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            $('.mainCard').children().eq(1).append(data.list[0].main.temp);
            $('.mainCard').children().eq(2).append(data.list[0].wind.speed);
            $('.mainCard').children().eq(3).append(data.list[0].main.humidity);

        })
};

getApi();

// NEED TO CHANGE TO DYNAMICALLY CHANGE
$('#currentDay').text('Austin: ' + dayjs().format('MM/DD/YY'));

var searchBtn = $('.citySearchBtn');
var citySearch = $('.citySearch');
var cityList = $('.cityList');
var cityHistory = JSON.parse(localStorage.getItem("City Choice")) || [];


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

    var cityText = $('.citySearch').val();

    if (cityText === ""){
        return;
    }

    cityHistory.push(cityText);

    storeCity();
    renderCity();
});

renderCity();





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