var searchBtn = $('.citySearchBtn');
var cityHistory = [];

searchBtn.on('click', function(event) {
    event.preventDefault()
    var location = $('.citySearch').val();
    var cityDiv = $('.cityDiv');
    var newButton = $('<button></button>').text(location);
    cityDiv.children().eq(2).append(newButton);
    localStorage.setItem("City Choice", JSON.stringify(location));
    console.log(location);
    // renderCity()
});












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