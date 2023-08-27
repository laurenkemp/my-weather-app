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
  console.log(currentCity.value);

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=imperial`;
  axios.get(weatherUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);
  let currentTempHigh = document.querySelector("#mainTempHigh");
  let currentTempLow = document.querySelector("#mainTempLow");
  let currentHumidity = document.querySelector("#humid");
  let currentWindSpeed = document.querySelector("#wind");
  let currentWeatherDescription = document.querySelector("#description");

  currentTempHigh.innerHTML = Math.round(response.data.main.temp_max);
  currentTempLow.innerHTML = Math.round(response.data.main.temp_min);
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
  currentWeatherDescription.innerHTML = response.data.weather[0].description;

  console.log(response.data.weather[0].description);
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
