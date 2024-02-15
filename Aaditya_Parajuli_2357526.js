/**
 * Author's Name: Aaditya Parajuli
 * Student ID: 2357526
 */

document.addEventListener("DOMContentLoaded", function () {
  const locationInput = document.getElementById("locationInput");
  const searchButton = document.getElementById("searchButton");

  var defaultCity = "Zhezkazgan";
  fetchWeatherData(defaultCity);

  searchButton.addEventListener("click", function () {
    
    const city = locationInput.value.trim();
    
    if (city !== "") {
      fetchWeatherData(city);
    } else {
      alert("Please enter a city's name.");
    }
  });


    locationInput.addEventListener("keypress", function (event) {
      
      if (event.key === "Enter") {
          
          const city = locationInput.value.trim();
          
          if (city !== "") {
              fetchWeatherData(city);
          } else {
              alert("Please enter a city's name.");
          }
        }
  });
  
  function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ef41d6e362ad0070366fe6c2577868e0`;

    
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        updateWeatherData(data);
      })
      .catch((error) => {
        alert("Error during fetching weather data ", error);
      });
  }

  
  function updateWeatherData(data) {
   
    const cityName = document.getElementById("cityName");
    const dateTime = document.getElementById("dateTime");
    const temperature = document.getElementById("temperature");
    const windspeed = document.getElementById("windspeed");
    const humidity = document.getElementById("humidity");
    const pressure = document.getElementById("pressure");
    const weatherIcon = document.getElementById("weatherIcon");
    const weatherCondition = document.getElementById("weatherCondition");

    
    cityName.textContent = data.name;
    dateTime.textContent = getCurrentDateTime(data.timezone);
    temperature.textContent = data.main.temp;
    windspeed.textContent = data.wind.speed;
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
    weatherCondition.textContent = data.weather[0].description;

    
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = data.weather[0].main;

    
    const temperatureCelsius = (data.main.temp - 273.15).toFixed(2);
    temperature.textContent = `${temperatureCelsius} °C`;

    
    const windspeedMetersPerSecond = data.wind.speed;
    windspeed.textContent = `${windspeedMetersPerSecond} m/s`;

    
    const humidityPercentage = data.main.humidity;
    humidity.textContent = `${humidityPercentage} %`;

    
    const pressureHpa = data.main.pressure;
    pressure.textContent = `${pressureHpa} hPa`;
  }

  
  function getCurrentDateTime(timezone) {
    const timestamp = Math.floor(Date.now() / 1000) + timezone;
    const date = new Date(timestamp * 1000);

    return date.toLocaleString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    });
  }

  async function fetchPastWeatherData() {
    try {
      
      const response = await fetch("2357526_select.php"); 
      const data = await response.json();
  
      
      if (response.ok) {
        
        const weatherContainer = document.getElementById('weatherContainer');
        weatherContainer.innerHTML = ''; 
  
        data.forEach((weather, index) => {
          
          const weatherCardContainer = document.createElement('div');
          weatherCardContainer.classList.add('weatherCardContainer');
  
          
          const weatherCard = document.createElement('div');
          weatherCard.classList.add('weatherCard');
          weatherCard.innerHTML = `
            <p>${weather.currentDay} ${weather.currentDate}</p>
            <p>Weather Condition: ${weather.weatherCondition}</p>
            <img src="http://openweathermap.org/img/w/${weather.weatherIcon}.png" alt="Image not found" />
            <p>Temperature: ${weather.temperature} °C</p>
            <p>Wind Speed: ${weather.windSpeed} m/s</p>
            <p>Humidity: ${weather.humidity} %</p>
            <p>Pressure:${weather.pressure} hPa</p>
          `;
  
          
          weatherCardContainer.appendChild(weatherCard);
  
          
          weatherContainer.appendChild(weatherCardContainer);
        });
      } else {
        
        document.getElementById('weatherContainer').innerHTML = '<p>Error fetching weather data.</p>';
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  
  fetchPastWeatherData();
  
});
