var cities = [];
var cityFormEl = document.querySelector('#cityForm');
var historyEl = document.querySelector('#history');
var inputEl = document.querySelector('#city');

var submitButton = function(event) {
    event.preventDefault();

    var cityName = inputEl.value.trim();
    if(cityName)
    {
        if(cities.includes(cityName))
        {
            cities.splice(cities.indexOf(cityName));
        }
        cities.unshift(cityName);

        while(cities.length > 8)
        {
            cities.pop();
        }
        addHistory();
        getResult(cityName);

    }
    else{
        window.alert("Enter a city name.");
    }
}

var historyButton = function(event) {
    event.preventDefault();


}


// function to get search result as city name
function getResult(city) {
    const apiKey = '95827148da73fc51bf98de54195cc14e';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=' + apiKey;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayResult(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      });
}

function displayResult(data) {
    console.log(data);
}

// function to add search history as clicking search button
function addHistory() {
    localStorage.setItem("cities", JSON.stringify(cities));
    getHistory();
}

// function to get search history from local storage.
function getHistory() {
    historyEl.textContent = "";
    if(localStorage.getItem("cities") !== null)
    {
        cities = JSON.parse(localStorage.getItem("cities"));
    }

    for(let i = 0; i < cities.length; i++)
    {
        var historyButton = document.createElement("button");
        historyButton.textContent = cities[i];
        historyButton.setAttribute("class", "btn btn-secondary btn-block");
        historyButton.setAttribute("name", cities[i]);
        historyButton.setAttribute("type", "submit");
        historyEl.append(historyButton);
    }
}

getHistory();
cityFormEl.addEventListener('submit', submitButton);
historyEl.addEventListener('click', historyButton);