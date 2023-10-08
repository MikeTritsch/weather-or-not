var searchBtn = $('.citySearchBtn');

searchBtn.on('click', function(event) {
    event.preventDefault()
    var location = $('.citySearch').val();
    console.log(location);
});


// function getApi() {
//     var location = $('.citySearch').val();
//     console.log(location);
// }