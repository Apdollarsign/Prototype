/**
 * Author's Name: Aaditya Parajuli
 * Student ID: 2357526
 */

document.addEventListener("DOMContentLoaded", function () {
  // Connecting the html ids to js for us to get values //
  const locationInput = document.getElementById("locationInput");
  const searchButton = document.getElementById("searchButton");

  // Set default city and fetch weather data //
  var defaultCity = "Zhezkazgan";
  fetchWeatherData(defaultCity);

  // Add EventListener to chech for the trigger //
  searchButton.addEventListener("click", function () {
    // Get the trimmied input value //
    const city = locationInput.value.trim();
    // Check if statement if input is not empty //
    if (city !== "") {
      fetchWeatherData(city);
    } else {
      alert("Please enter a city's name.");
    }
  });

  // Function to fetch data from the API //
  function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ef41d6e362ad0070366fe6c2577868e0`;

    // Fetch request to the API and update HTML.If error show error message //
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        updateWeatherData(data);
      })
      .catch((error) => {
        alert("Error during fetching weather data ", error);
      });
  }

  // Function to update Html with the weather data //
  function updateWeatherData(data) {
    // Connecting the html ids to js for us to set values//
    const cityName = document.getElementById("cityName");
    const dateTime = document.getElementById("dateTime");
    const temperature = document.getElementById("temperature");
    const windspeed = document.getElementById("windspeed");
    const humidity = document.getElementById("humidity");
    const pressure = document.getElementById("pressure");
    const weatherIcon = document.getElementById("weatherIcon");
    const weatherCondition = document.getElementById("weatherCondition");

    // Update Html with the weather data //
    cityName.textContent = data.name;
    dateTime.textContent = getCurrentDateTime(data.timezone);
    temperature.textContent = data.main.temp;
    windspeed.textContent = data.wind.speed;
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
    weatherCondition.textContent = data.weather[0].description;

    // Set the weather icon //
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = data.weather[0].main;

    // convert kelvin to celcius and display //
    const temperatureCelsius = (data.main.temp - 273.15).toFixed(2);
    temperature.textContent = `${temperatureCelsius} °C`;

    //display windSpeed in meter per second //
    const windspeedMetersPerSecond = data.wind.speed;
    windspeed.textContent = `${windspeedMetersPerSecond} m/s`;

    //display humidity in percentage //
    const humidityPercentage = data.main.humidity;
    humidity.textContent = `${humidityPercentage} %`;

    // display pressure in hpa //
    const pressureHpa = data.main.pressure;
    pressure.textContent = `${pressureHpa} hPa`;
  }

  // Function to get current date and time based on timezone //
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
      // Fetch weather data from php
      const response = await fetch("2408947_select.php"); // Ensure the correct PHP file
      const data = await response.json();
  
      // Check if there is data to display
      if (response.ok) {
        // Create HTML elements to display weather information
        const weatherContainer = document.getElementById('weatherContainer');
        weatherContainer.innerHTML = ''; // Clear previous results
  
        data.forEach((weather, index) => {
          // Create a new container for each weather card
          const weatherCardContainer = document.createElement('div');
          weatherCardContainer.classList.add('weatherCardContainer');
  
          // Create the weather card
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
  
          // Append the weather card to the container
          weatherCardContainer.appendChild(weatherCard);
  
          // Append the container to the main weather container
          weatherContainer.appendChild(weatherCardContainer);
        });
      } else {
        // Display an error message if no data is found
        document.getElementById('weatherContainer').innerHTML = '<p>Error fetching weather data.</p>';
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  // Call the function to fetch and display weather data
  fetchPastWeatherData();
  
});
