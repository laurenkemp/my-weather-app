function searchLocation(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#search-input");
  if (currentCity.value) {
    let currentLocation = document.querySelector("#city");
    currentLocation.innerHTML = currentCity.value;
  } else {
    alert("Please type a city");
  }

  let apiKey = "5681b3c5ae7587462a23eaa5ab9c8b23";

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=imperial`;
  axios.get(weatherUrl).then(showTemperature);
}

function getForecast(coordinates) {
  let apiKey = "866a208a73eeff02182218e9441647a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let currentTempHigh = document.querySelector("#mainTempHigh");
  let currentTempLow = document.querySelector("#mainTempLow");
  let currentHumidity = document.querySelector("#humid");
  let currentWindSpeed = document.querySelector("#wind");
  let currentWeatherDescription = document.querySelector("#description");
  let mainWeatherIcon = document.querySelector("#mainWeatherIcon");

  currentTempHigh.innerHTML = Math.round(response.data.main.temp_max);
  currentTempLow.innerHTML = Math.round(response.data.main.temp_min);
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
  currentWeatherDescription.innerHTML = response.data.weather[0].description;
  mainWeatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let daysShort = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return daysShort[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class ="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
       <div class="col-2 4">
          <div class="card text-center">
            <div class="card-header">${formatDay(forecastDay.dt)}</div>
            <div class="card-body">
               <img src="https://openweathermap.org/img/wn/${
                 forecastDay.weather[0].icon
               }@2x.png" class="card-text weatherIconFuture">
            </div>
            <div class="card-footer text-body-secondary currentTempHigh">
              ${Math.round(
                forecastDay.temp.max
              )}° <span class="currentTempLow">${Math.round(
          forecastDay.temp.min
        )}°</span>  
              </div>
              </div>
              </div>
          
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];

let currentDate = `${day}, ${month} ${date}`;
let today = document.querySelector("#today");
today.innerHTML = currentDate;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchLocation);
