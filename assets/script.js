// Housekeeping
var citySearchForm = document.getElementById("city-search");
var cityList = document.getElementById("datalistOptions");
var weatherCard = document.querySelector(".card");
var forecast = document.querySelector(".card-group");

// API url and key
const apiKey = "ce3d08cfda63c419bc1f505bd8fd502f"; 

// Function 
citySearchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const cityName = event.target[0].value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        weatherCard.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}</p>
        <p>Humidity: ${data.main.humidity}</p>
        <p>Wind Speed: ${data.wind.speed}</p>
        `;
    });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        forecast.innerHTML = "";
        for (let i = 0; i < data.list.length; i += 8) {
            forecast.innerHTML += `  
            <div class="card">
                <h3>${data.list[i].dt_txt}</h3>
                <p>Temperature: ${data.list[i].main.temp}</p>
                <p>Humidity: ${data.list[i].main.humidity}</p>
                <p>Wind Speed: ${data.list[i].wind.speed}</p>
            </div>
            `;
        }
    });
});

cityList.addEventListener("input", function (event) {
    citySearchForm[0].value = event.target.value;
    citySearchForm.dispatchEvent(new Event("submit"));
});
