// Housekeeping
var citySearchForm = document.getElementById("city-search");
var cityList = document.getElementById("datalistOptions");
var weatherCard = document.querySelector(".card");
var forecast = document.querySelector(".card-group");

// API url and key
const apiKey = "ce3d08cfda63c419bc1f505bd8fd502f";

// Event listener for search form
citySearchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const cityName = event.target[0].value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
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
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-2">
                <div class="card">
                    <div class="card-header">
                        <h3>${dateStr}</h3>
                        <p>${timeStr}</p>
                    </div>
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

cityList.addEventListener("input", function (event) {
    citySearchForm[0].value = event.target.value;
    citySearchForm.dispatchEvent(new Event("submit"));
});
