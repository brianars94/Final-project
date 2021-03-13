searchCity("Honolulu");


function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

let monthIndex = date.getMonth();
let months = [
  "January",
  "febuary",
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
let year = date.getFullYear();
  let month = months[monthIndex];

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
let todaysDate = date.getDate();

  return `Last Updated: ${day}, ${todaysDate} ${month} ${year} at ${hours}:${minutes}`;
}



function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
   
  
  
  document.querySelector("#icon").innerHTML =
    response.data.weather[0].icon;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
    document.querySelector("#country").innerHTML = response.data.sys.country;
 document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
    document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max);

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
 fahrenheitTemperature = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "5b04d8f11f13d51bcad99c422481b0ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=Imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let units = "Imperial";
  let apiKey = "5b04d8f11f13d51bcad99c422481b0ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}



function getCurrentLocation(event) {
  event.preventDefault();
   navigator.geolocation.getCurrentPosition(searchLocation);

}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);



function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");

  celsiusLink.classList.add("active");
  let celsiusTemperature = (fahrenheitTemperature - 30) / 2;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusTemperature = (fahrenheitTemperature - 30) / 2;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheitTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);