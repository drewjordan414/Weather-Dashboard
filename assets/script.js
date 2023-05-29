// Housekeeping
var citySearchForm = document.getElementById("city-search");
var cityButtons = document.getElementById("city-buttons");
var weatherCard = document.querySelector(".card");
var forecast = document.querySelector(".card-group");

// API url and key
const apiKey = "ce3d08cfda63c419bc1f505bd8fd502f";

//hide weather data until search

// Search history
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// add search history to buttons
searchHistory.forEach(function(cityName){ 
    let button = document.createElement("button");
    button.className = "btn btn-primary";
    button.textContent = cityName;
    button.addEventListener("click", function(){
        citySearchForm[0].value = this.textContent;
        citySearchForm.dispatchEvent(new Event("submit"));
    });
    cityButtons.appendChild(button);

});


// Event listener for search form
citySearchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const cityName = event.target[0].value;

    // add city to search history
    if (!searchHistory.includes(cityName)) {
        searchHistory.push(cityName);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        
        let newCityButton = document.createElement("button");
        newCityButton.className = "btn btn-primary";
        newCityButton.textContent = cityName;
        newCityButton.addEventListener("click", function(){
            citySearchForm[0].value = this.textContent;
            citySearchForm.dispatchEvent(new Event("submit"));
        });
        cityButtons.appendChild(newCityButton);
    };

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            // const date = new Date(data.list[i].dt_txt);
            // const dateStr = date.toLocaleDateString();
            // const timeStr = date.toLocaleTimeString();
            weatherCard.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp} F</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} mph</p>
        `;
        });

    // 5 day forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            forecast.innerHTML = "";
            for (let i = 0; i < data.list.length; i += 8) {
                const date = new Date(data.list[i].dt_txt);
                const dateStr = date.toLocaleDateString();
                const timeStr = date.toLocaleTimeString();
                forecast.innerHTML += ` 
            <div class="card text-bg-dark mb-3">
            <div class="card-header">${dateStr}</div>
            <div class="card-body">
                <h5 class="card-title">${timeStr}</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Temperature: ${data.list[i].main.temp} F</li>
                    <li class="list-group-item">Humidity: ${data.list[i].main.humidity} %</li>
                    <li class="list-group-item">Wind Speed: ${data.list[i].wind.speed} mph</li>
                </ul>
            </div>
        </div>
            `;
            }
        });
});

cityButtons.addEventListener("input", function (event) {
    citySearchForm[0].value = event.target.value;
    citySearchForm.dispatchEvent(new Event("submit"));
});

// clear search history
document.getElementById("clear-history").addEventListener("click", function () {
    searchHistory = [];
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    while(cityButtons.firstChild){
        cityButtons.removeChild(cityButtons.firstChild);
    }
});