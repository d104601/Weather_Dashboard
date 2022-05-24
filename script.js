var cities = [];
var cityFormEl = document.querySelector('#cityForm');
var historyEl = document.querySelector('#history');
var inputEl = document.querySelector('#city');
var todayEl = document.querySelector('#today');
var futureEl = document.querySelector('#future');

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
    var city = event.target.getAttribute("name");
    if(city){
        getResult(city);
    }
}


// function to get search result as city name
function getResult(city) {
    const apiKey = '95827148da73fc51bf98de54195cc14e';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&units=imperial&appid=' + apiKey;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayToday(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      });
    
    var forcastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city + '&units=imperial&appid=' + apiKey;
    fetch(forcastUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayFuture(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      });
}

// function to display data from api
function displayToday(data) {
    todayEl.textContent = "";
    futureEl.textContent = "";

    var location = document.createElement("h1");
    var currentDate = document.createElement("h2");
    var icon = document.createElement("img");
    var temperature = document.createElement("h3");
    var humidity = document.createElement("h3");
    var wind = document.createElement("h3");

    location.textContent = data.name + "(" + moment(data.dt.value).format("MMM Do, YYYY") + ")";
    icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon+ "@2x.png");
    temperature.textContent = "Temp: " + data.main.temp + " °F";
    wind.textContent = "Wind: " + data.wind.speed + " MPH";
    humidity.textContent = "Humidity: " + data.main.humidity + " %";


    location.appendChild(icon);
    todayEl.appendChild(location);
    todayEl.appendChild(currentDate);
    todayEl.appendChild(temperature);
    todayEl.appendChild(wind);
    todayEl.appendChild(humidity);
    getUV(data.coord.lat, data.coord.lon);
}

// function to find and display UV data
function getUV(lat, lon) {
    const apiKey = '95827148da73fc51bf98de54195cc14e';
    var apiUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
    
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            var uv = document.createElement("h3");
            var uvValue = document.createElement("span");
            uvValue.textContent = data.value;
            if(data.value < 2)
            {
                uvValue.setAttribute("class", "bg-success text-white");
            }
            else if(data.value > 8)
            {
                uvValue.setAttribute("class", "bg-danger text-white");
            }
            uv.textContent = "UV index: ";
            uv.appendChild(uvValue);
            todayEl.appendChild(uv);
          });
        } else {
          return 'Error: ' + response.statusText;
        }
      });    
}

// function to display future 5 days' data
function displayFuture(data) {
    console.log(data);

    var title = document.querySelector("#futureTitle");
    title.textContent = "5-Days Forecast";
    futureEl.appendChild(title);
    for(let i = 0; i < 5; i++)
    {
        var curr = data.list[i];
        var forecastCard = document.createElement("div");
        forecastCard.setAttribute("class", "card bg-info text-white m-2")

        var date = document.createElement("h4");
        var icon = document.createElement("h4");
        var iconimg = document.createElement("img");
        var temperature = document.createElement("h4");
        var humidity = document.createElement("h4");

        date.setAttribute("class", "card-header text-center");
        icon.setAttribute("class", "card-body text-center");
        iconimg.setAttribute("src", "https://openweathermap.org/img/wn/" + curr.weather[0].icon + "@2x.png");
        temperature.setAttribute("class", "card-body text-center");
        humidity.setAttribute("class", "card-body text-center");

        icon.appendChild(iconimg);

        date.textContent = moment.unix(curr.dt).format("MMM Do, YYYY");
        temperature.textContent = curr.main.temp + " °F";
        humidity.textContent = curr.main.humidity + " %";

        forecastCard.appendChild(date);
        forecastCard.appendChild(icon);
        forecastCard.appendChild(temperature);
        forecastCard.appendChild(humidity);

        futureEl.appendChild(forecastCard);
    }
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