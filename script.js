const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "ba6ae73fa263f7261b8a2f8df92b57a4";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const weather_data = await fetch(url).then(response => response.json());

        if (weather_data.cod === `404`) {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found");
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

        const condition = weather_data.weather[0].main;
        updateWeatherImage(condition);
        setWeatherBackground(condition);

        console.log(weather_data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function updateWeatherImage(condition) {
    switch (condition) {
        case 'Clouds':
            weather_img.src = "assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            break;
        default:
            weather_img.src = "assets/default.png";
    }
}

function setWeatherBackground(condition) {
    switch (condition) {
        case 'Clouds':
            document.body.style.background = "linear-gradient(to bottom, #B0C4DE, #778899)";
            break;
        case 'Clear':
            document.body.style.background = "linear-gradient(to bottom, #87CEEB, #FFD700)";
            break;
        case 'Rain':
            document.body.style.background = "linear-gradient(to bottom, #708090, #2F4F4F)";
            break;
        case 'Mist':
            document.body.style.background = "linear-gradient(to bottom, #A9A9A9, #D3D3D3)";
            break;
        case 'Snow':
            document.body.style.background = "linear-gradient(to bottom, #D3D3D3, #f0f8ff)";
            break;
        default:
            document.body.style.background = "linear-gradient(to bottom, #89CFF0, #f0f8ff)";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
