function formatDate(timestamp) {
  let date = new Date(timestamp);
  let options = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-UK", options);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (dailyForecast, index) {
    if (index < 6) {
      forecastHTML += `<div class="col-2">
        <div class="weather-forecast-date">${formatDate(
          dailyForecast.time * 1000
        )}</div>
        
        <img src="${dailyForecast.condition.icon_url}" alt="${
        dailyForecast.condition.description
      }" width="42" />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            dailyForecast.temperature.maximum
          )}</span>
          <span class="weather-forecast-temperature-min">${Math.round(
            dailyForecast.temperature.minimum
          )}</span>
        </div>
      </div>`;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2374eba8044tffoa6bba2f4241b376c8";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);

  celsiusTemperature = response.data.temperature.current;

  getForecast(response.data.coordinates);
}

function search(query) {
  let key = "2374eba8044tffoa6bba2f4241b376c8";
  let url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=metric`;

  axios.get(url).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();

  let queryInputElement = document.querySelector("#city-input");
  search(queryInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("London");
