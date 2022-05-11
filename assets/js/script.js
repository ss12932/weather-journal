"use strict";
const recentSearchesContainer = $("#recent-searches-container");

const readFromLocalStorage = (key, value) => {
  // get from LS using key name
  const dataFromLS = JSON.parse(localStorage.getItem(key));

  if (dataFromLS) {
    return dataFromLS;
  } else {
    return value;
  }
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
${recentSearches}
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
const onReady = () => {
  renderRecentSearches();
};
recentSearchesContainer.click(handleRecentSearchClick);
$(document).ready(onReady);
