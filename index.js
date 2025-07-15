let cityname = document.getElementById("city");
let mainSection = document.getElementById("main");

const API_KEY =  process.env.open_weather_api_key

async function getWeather() {
  const city = cityname.value.trim();
  if (!city) {
    mainSection.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );

    if (!response.ok) {
      mainSection.innerHTML = `<p>City not found. Please try again.</p>`;
      return;
    }

    const data = await response.json();
    mainSection.innerHTML = `
            <div id="container">
                <h1>${data.name} - Country: ${data.sys.country}</h1>
                <h2>Weather: ${data.weather[0].main}</h2>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
                <p>Description: ${data.weather[0].description}</p>
                <div id="windAndTemp">
                    <div>
                        Wind Speed: ${data.wind.speed}<br>
                        Pressure: ${data.main.pressure}<br>
                        Humidity: ${data.main.humidity}
                    </div>
                    <div>
                        Temperature: ${data.main.temp}<br>
                        Min Temp: ${data.main.temp_min}<br>
                        Max Temp: ${data.main.temp_max}
                    </div>
                </div>
            </div>`;

    updateBackground(data.weather[0].id);
  } catch (error) {
    mainSection.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
    console.error("Error:", error);
  }
}

function updateBackground(weatherId) {
  const body = document.body;
  if (weatherId < 300) {
    body.style.backgroundImage =
      "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)";
  } else if (weatherId < 400) {
    body.style.backgroundImage =
      "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)";
  } else if (weatherId < 500) {
    body.style.backgroundImage =
      "linear-gradient(to top, #a3bded 0%, #6991c7 100%)";
  } else if (weatherId < 600) {
    body.style.backgroundImage =
      "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)";
  } else if (weatherId < 700) {
    body.style.backgroundImage =
      "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)";
  } else if (weatherId < 800) {
    body.style.backgroundImage =
      "linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)";
  } else {
    body.style.backgroundImage =
      "linear-gradient(to right, #0acffe 0%, #495aff 100%)";
  }
}
