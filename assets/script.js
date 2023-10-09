var searchBtn = $('.citySearchBtn');
var citySearch = $('.citySearch');
var cityList = $('.cityList');
var cityHistory = [];


function renderCity() {
    $('.cityList').text("");

    for (var i = 0; i < cityHistory.length; i++) {
        var city = cityHistory[i];

        var li = $("<li></li>");
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