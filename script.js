var cityFormEl = document.querySelector('#city-form');
var historyEl = document.querySelector('#history');
var inputEl = document.querySelector('#city');

var submitButton = function(event) {
    event.preventDefault();

    var cityName = inputEl.value.trim();
    addHistory();
    getResult();
}

var historyButton = function(event) {
    event.preventDefault();


}

// function to get search result as city name
function getResult(city) {
    var apiKey = '95827148da73fc51bf98de54195cc14e';
    var apiUrl = 'api.openweathermap.org/data/2.5/weather?q={'+ city + '}&appid=' + apiKey;

}

// function to add search history as clicking search button
function addHistory(city) {

    getHistory();
}

// function to get search history from local storage.
function getHistory() {

}


getHistory()
cityFormEl.addEventListener('submit', submitButton);
historyEl.addEventListener('click', historyButton);