var searchBtn = $('.citySearchBtn');

searchBtn.on('click', function(event) {
    event.preventDefault()
    var location = $('.citySearch').val();
    var cityLi = $("<li></li>").text(location);
    $('cityList').append(cityLi);
    console.log(location);
});


// function getApi() {
//     var location = $('.citySearch').val();
//     console.log(location);
// }