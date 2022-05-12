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

const renderCurrentData = () => {
  const currentWeatherCard = `<div class="p-3 text-center">
  <h2 class="my-2">Birmingham</h2>
  <h3 class="my-2">Monday, 9th May 2022</h3>
  <div>
    <img   class="border shadow-sm p-3 mt-3 bg-body rounded"
      src="http://openweathermap.org/img/wn/02n.png"
      alt=""
      srcset=""
    />
  
  </div>
</div>
<!-- weather metrics div -->
<div class="mt-4">
  <div class="row g-0">
    <div class="col-sm-12 col-md-4 border bg-light fw-bold p-2">
      Temperature
    </div>
    <div class="col-sm-12 col-md-8 border p-2">16&degC</div>
  </div>
  <div class="row g-0">
    <div class="col-sm-12 col-md-4 border bg-light fw-bold p-2">
      Humidity
    </div>
    <div class="col-sm-12 col-md-8 border p-2">20%</div>
  </div>
  <div class="row g-0">
    <div class="col-sm-12 col-md-4 border bg-light fw-bold p-2">
      Wind Speed
    </div>
    <div class="col-sm-12 col-md-8 border p-2">10 MPH</div>
  </div>
  <div class="row g-0">
    <div class="col-sm-12 col-md-4 border bg-light fw-bold p-2">
      UV Index
    </div>
    <div class="col-sm-12 col-md-8 p-2 border">
      <span class="bg-success text-white px-3 rounded-2">1.5</span>
    </div>
  </div>
</div>`;

  $weatherInfoContainer.append(currentWeatherCard);
};

const renderForecastData = () => {
  const forecastWeatherCards = `<div>
    <h2 class="text-center mt-3">5 Day Forecast</h2>
    <hr />
    <div class="d-flex flex-row justify-content-center flex-wrap m-3">
      <!-- card 1 -->
      <div class="card m-2 forecast-card">
        <div class="d-flex justify-content-center">
          <img
            src="http://openweathermap.org/img/wn/02n.png"
            class="shadow-sm weather-icon card-img-top"
            alt="weather icon"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">Tue 10th May 2022</h5>
          <div class="mt-4 text-center">
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Temperature
              </div>
              <div class="col-sm-12 border p-2">16&degC</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Humidity
              </div>
              <div class="col-sm-12 border p-2">20%</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Wind Speed
              </div>
              <div class="col-sm-12 border p-2">10 MPH</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                UV Index
              </div>
              <div class="col-sm-12 p-2 border">
                <span class="bg-success text-white px-3 rounded-2"
                  >1.5</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- card 2 -->
      <div class="card m-2 forecast-card">
        <div class="d-flex justify-content-center">
          <img
            src="http://openweathermap.org/img/wn/02n.png"
            class="shadow-sm weather-icon card-img-top"
            alt="weather icon"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">Tue 10th May 2022</h5>
          <div class="mt-4 text-center">
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Temperature
              </div>
              <div class="col-sm-12 border p-2">16&degC</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Humidity
              </div>
              <div class="col-sm-12 border p-2">20%</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Wind Speed
              </div>
              <div class="col-sm-12 border p-2">10 MPH</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                UV Index
              </div>
              <div class="col-sm-12 p-2 border">
                <span class="bg-success text-white px-3 rounded-2"
                  >1.5</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- card 3 -->
      <div class="card m-2 forecast-card">
        <div class="d-flex justify-content-center">
          <img
            src="http://openweathermap.org/img/wn/02n.png"
            class="shadow-sm weather-icon card-img-top"
            alt="weather icon"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">Tue 10th May 2022</h5>
          <div class="mt-4 text-center">
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Temperature
              </div>
              <div class="col-sm-12 border p-2">16&degC</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Humidity
              </div>
              <div class="col-sm-12 border p-2">20%</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Wind Speed
              </div>
              <div class="col-sm-12 border p-2">10 MPH</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                UV Index
              </div>
              <div class="col-sm-12 p-2 border">
                <span class="bg-success text-white px-3 rounded-2"
                  >1.5</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- card 4 -->
      <div class="card m-2 forecast-card">
        <div class="d-flex justify-content-center">
          <img
            src="http://openweathermap.org/img/wn/02n.png"
            class="shadow-sm weather-icon card-img-top"
            alt="weather icon"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">Tue 10th May 2022</h5>
          <div class="mt-4 text-center">
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Temperature
              </div>
              <div class="col-sm-12 border p-2">16&degC</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Humidity
              </div>
              <div class="col-sm-12 border p-2">20%</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Wind Speed
              </div>
              <div class="col-sm-12 border p-2">10 MPH</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                UV Index
              </div>
              <div class="col-sm-12 p-2 border">
                <span class="bg-success text-white px-3 rounded-2"
                  >1.5</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- card 5 -->
      <div class="card m-2 forecast-card">
        <div class="d-flex justify-content-center">
          <img
            src="http://openweathermap.org/img/wn/02n.png"
            class="shadow-sm weather-icon card-img-top"
            alt="weather icon"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">Tue 10th May 2022</h5>
          <div class="mt-4 text-center">
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Temperature
              </div>
              <div class="col-sm-12 border p-2">16&degC</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Humidity
              </div>
              <div class="col-sm-12 border p-2">20%</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                Wind Speed
              </div>
              <div class="col-sm-12 border p-2">10 MPH</div>
            </div>
            <div class="row g-0">
              <div class="col-sm-12 border bg-light fw-bold p-2">
                UV Index
              </div>
              <div class="col-sm-12 p-2 border">
                <span class="bg-success text-white px-3 rounded-2"
                  >1.5</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
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
const handleFormSubmit = (e) => {
  //remember its a form so prevent default
  e.preventDefault();
  // console.log("submit");

  //get form input value
  const cityName = $("#search-input").val();

  //validate
  if (cityName) {
    //fetch data from API

    //render current data
    renderCurrentData();
    //render forecast data
    renderForecastData();
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
