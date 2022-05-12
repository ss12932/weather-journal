"use strict";
//global declarations
const recentSearchesContainer = $("#recent-searches-container");
const searchForm = $("#search-form");
//always in html, target at top
const $weatherInfoContainer = $("#weather-info-container");
const readFromLocalStorage = (key, value) => {
  // get from LS using key name
  const dataFromLS = JSON.parse(localStorage.getItem(key));

  if (dataFromLS) {
    return dataFromLS;
  } else {
    return value;
  }
};

const writeToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const renderCurrentData = (data) => {
  console.log(data);
  const currentWeatherCard = `<div class="p-3">
  <div class="text-center">
    <h2 class="my-2">${data.cityName}</h2>
    <h3 class="my-2">${moment
      .unix(data.weatherData.current.dt + data.weatherData.timezone_offset)
      .format("dddd, Do MMM, YYYY HH:mm:ss")}</h3>
    <div>
      <img
        src="http://openweathermap.org/img/w/${
          data.weatherData.current.weather[0].icon
        }.png"
        alt="weather icon"
        class="shadow-sm p-3 mt-3 bg-body rounded border"
      />
    </div>
  </div>
  <!-- weather metric div -->
  <div class="mt-4">
    <div class="row g-0">
      <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
        Temperature
      </div>
      <div class="col-sm-12 col-md-8 p-2 border">${
        data.weatherData.current.temp
      }&deg; C</div>
    </div>
    <div class="row g-0">
      <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
        Humidity
      </div>
      <div class="col-sm-12 col-md-8 p-2 border">${
        data.weatherData.current.humidity
      }&percnt;</div>
    </div>
    <div class="row g-0">
      <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
        Wind Speed
      </div>
      <div class="col-sm-12 col-md-8 p-2 border">${
        data.weatherData.current.wind_speed
      } MPH</div>
    </div>
    <div class="row g-0">
      <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
        UV Index
      </div>
      <div class="col-sm-12 col-md-8 p-2 border">
        <span class="text-white px-3 rounded-2">${
          data.weatherData.current.uvi
        }</span>
      </div>
    </div>
  </div>
</div>`;

  $weatherInfoContainer.append(currentWeatherCard);
};

const renderForecastData = (data) => {
  const createForestCard = (each) => {
    const forecast = `<div class="card m-2 forecast-card">
    <div class="d-flex justify-content-center">
      <img
        src="http://openweathermap.org/img/w/${each.weather[0].icon}.png"
        class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
        alt="weather icon"
      />
    </div>
    <div class="card-body">
      <h5 class="card-title text-center">${moment
        .unix(each.dt)
        .format("ddd, Do MMM")}</h5>
      <div class="mt-4 text-center">
        <div class="row g-0">
          <div class="col-12 p-2 border bg-light fw-bold">
            Temperature
          </div>
          <div class="col-12 p-2 border">${each.temp.day}&deg; C</div>
        </div>
        <div class="row g-0">
          <div class="col-12 p-2 border bg-light fw-bold">
            Humidity
          </div>
          <div class="col-12 p-2 border">${each.humidity}&percnt;</div>
        </div>
        <div class="row g-0">
          <div class="col-12 p-2 border bg-light fw-bold">
            Wind Speed
          </div>
          <div class="col-12 p-2 border">${each.wind_speed} MPH</div>
        </div>
        <div class="row g-0">
          <div class="col-12 p-2 border bg-light fw-bold">
            UV Index
          </div>
          <div class="col-12 p-2 border">
            <span class="text-white px-3 rounded-2 ${getUviClassName(each.uvi)}"
              >${each.uvi}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>`;
    return forecast;
  };

  const forecastCards = data.weatherData.daily
    .slice(1, 6)
    .map(createForestCard)
    .join("");
  const forecastWeatherCards = `<div>
    <h2 class="text-center mt-3">5 Day Forecast</h2>
    <hr />
    <div class="d-flex flex-row justify-content-center flex-wrap m-3">
    ${forecastCards}
    </div>
  </div>`;

  $weatherInfoContainer.append(forecastWeatherCards);
};

const renderRecentSearches = () => {
  //target parent element div
  //get recent searches from LS. if doesnt have recentSearches key, what should you return? return empty array.
  const recentSearches = readFromLocalStorage("recentSearches", []);
  // const recentSearches = ["London", "Leeds", "Birmingham"];
  console.log(recentSearches);
  //if empty show alert
  if (!recentSearches.length) {
    const alert = `  <div class="alert alert-warning" role="alert">
     You have no recent searches!
   </div>`;
    //append to parent
    recentSearchesContainer.append(alert);
  } else {
    const createRecentCity = (city) => {
      return `<li class="list-group-item" data-city="${city}">${city}</li>`;
    };

    const recentCities = recentSearches.map(createRecentCity).join("");
    console.log(recentCities);
    //else render recent searches list
    const ul = `<ul class="list-group rounded-0">
${recentCities}
  </ul>`;
    recentSearchesContainer.append(ul);
  }
};

const renderWeatherInfo = async (cityName) => {
  //fetch weather data
  const weatherData = await fetchWeatherData(cityName);

  // empty container
  $weatherInfoContainer.empty();
  //render current data
  renderCurrentData(weatherData);
  //render forecast data
  renderForecastData(weatherData);
};
const fetchWeatherData = async (cityName) => {
  //fetch data from API
  //url
  // fetch data from API
  // current data url
  const currentDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      q: cityName,
      appid: "2272d4b2b60f4e29b7543f132bbc872c",
    }
  );

  const currentData = await fetchData(currentDataUrl);
  console.log(currentData);

  // get lat, long and city name
  // const lat = currentData?.coord?.lat;
  // const lon = currentData?.coord?.lon;
  // const displayCityName = currentData?.name;
  // console.log(lat, lon, displayCityName);
  let {
    coord: { lat, lon },
    name: displayCityName,
  } = currentData;
  console.log(lat, lon, displayCityName);

  //forecast URL

  const forecastDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/onecall",
    {
      lat: lat,
      lon: lon,
      exclude: "minutely,hourly",
      units: "metric",
      appid: "2272d4b2b60f4e29b7543f132bbc872c",
    }
  );

  const forecastData = await fetchData(forecastDataUrl);

  console.log(forecastData);

  return {
    cityName: displayCityName,
    weatherData: forecastData,
  };
};
const handleRecentSearchClick = (e) => {
  const target = $(e.target);
  //click anywhere will trigger
  // console.log("click");
  //restrict click from only lis
  if (target.is("li")) {
    // console.log("search");
    //get city data attribute
    const cityName = target.attr("data-city");
    console.log(cityName);
  }
};
const handleFormSubmit = async (e) => {
  //remember its a form so prevent default
  e.preventDefault();
  // console.log("submit");

  //get form input value
  const cityName = $("#search-input").val();

  //validate
  if (cityName) {
    await renderWeatherInfo(cityName);

    //check cityname works before proceeding
    // console.log(cityName);
    //if exists put into local storage

    //get recentSearches from local storage
    const recentSearches = readFromLocalStorage("recentSearches", []);

    //push city name to array
    recentSearches.push(cityName);

    //write recent searches to LS
    writeToLocalStorage("recentSearches", recentSearches);

    //remove previous items
    recentSearchesContainer.children().last().remove();
    //re render recent cities
    renderRecentSearches();
  }
};
const onReady = () => {
  renderRecentSearches();
};
recentSearchesContainer.click(handleRecentSearchClick);

searchForm.submit(handleFormSubmit);
$(document).ready(onReady);
