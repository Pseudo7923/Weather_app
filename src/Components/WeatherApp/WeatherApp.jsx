import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
  const api_key = '461a43e9194cb5a2863e3989af691df8';
  const [wIcon, setwIcon] = useState(cloud_icon);
  const [errorMessage, setErrorMessage] = useState(''); // For error handling

  const search = async () => {
    const element = document.getElementsByClassName('cityInput');

    if (element[0].value === '') {
      setErrorMessage('Please enter a city name.');
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      const humidity = document.getElementsByClassName('humidity-percent');
      const wind = document.getElementsByClassName('wind-rate');
      const temp = document.getElementsByClassName('weather-temp');
      const location = document.getElementsByClassName('weather-location');

      humidity[0].innerHTML = data.main.humidity + '%';
      wind[0].innerHTML = Math.floor(data.wind.speed) + ' km/h';
      temp[0].innerHTML = Math.floor(data.main.temp) + '°c';
      location[0].innerHTML = data.name;
      setErrorMessage(''); // Clear error message on successful search

      // Update weather icon based on the weather code
      if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
        setwIcon(clear_icon);
      } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
        setwIcon(cloud_icon);
      } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
        setwIcon(drizzle_icon);
      } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
        setwIcon(drizzle_icon);
      } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
        setwIcon(rain_icon);
      } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
        setwIcon(rain_icon);
      } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
        setwIcon(snow_icon);
      } else {
        setwIcon(clear_icon);
      }
    } catch (error) {
      setErrorMessage(error.message); // Display error message
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Search' />
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt='search' />
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Error message display */}
      <div className='weather-image'>
        <img src={wIcon} alt='weather' />
      </div>
      <div className='weather-temp'>24°c</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='humidity' className='icon' />
          <div className='data'>
            <div className='humidity-percent'>15%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt='wind' className='icon' />
          <div className='data'>
            <div className='wind-rate'>18 km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
