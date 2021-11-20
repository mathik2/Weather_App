let cityname = document.getElementById('city')
let mainSection = document.getElementById('main')
async function getWeather() {
    let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityname.value + '&appid=c2998d766e0080140c99a82cc5c1d15e')
    let data = await response.json()
    console.log(data)
    mainSection.innerHTML = `<div id="container"><h1>${data.name}- Country=${data.sys.country}</h1><br>
<h2>Weather:${data.weather[0].main}</h2>
<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
<p>Description : ${data.weather[0].description}<br><br><br>
    <div id="windAndTemp"> <div>Wind Speed:${data.wind.speed}<br>Pressure :${data.main.pressure}<br>Humidity :${data.main.humidity}</div>
    <div>Temperature :${data.main.temp}<br> Minimum T :${data.main.temp_min}<br>Maximum T :${data.main.temp_max}</div></div>
   
</div>`;

    if (data.weather[0].id < 300) {
        body.style.backgroundImage = 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)';

    }
    else if (data.weather[0].id >= 300 & data.weather[0].id < 400) {
        document.body.style.backgroundImage = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
    }
    else if (data.weather[0].id >= 400 & data.weather[0].id < 500) {
        document.body.style.backgroundImage = 'linear-gradient(to top, #a3bded 0%, #6991c7 100%)';
    }
    else if (data.weather[0].id >= 500 & data.weather[0].id < 600) {
        document.body.style.backgroundImage = 'linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)';
    }
    else if (data.weather[0].id >= 600 & data.weather[0].id < 700) {
        document.body.style.backgroundImage = ' linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)';
    }
    else if (data.weather[0].id >= 700 & data.weather[0].id < 800) {
        document.body.style.backgroundImage = 'linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)';
    }
    else {
        document.body.style.backgroundImage = 'linear-gradient(to right, #0acffe 0%, #495aff 100%)';
    }
}
