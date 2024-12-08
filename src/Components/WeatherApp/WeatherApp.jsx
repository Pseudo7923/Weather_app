import React, { useState, useEffect } from 'react';
import searchIcon from '../Assets/search.png';
import clearIcon from '../Assets/clear.png';
import cloudIcon from '../Assets/cloud.png';
import drizzleIcon from '../Assets/drizzle.png';
import rainIcon from '../Assets/rain.png';
import snowIcon from '../Assets/snow.png';
import windIcon from '../Assets/wind.png';
import humidityIcon from '../Assets/humidity.png';

const WeatherIcon = ({ icon }) => <img src={icon} alt="weather" className="w-24 h-24 mx-auto" />;
const WeatherData = ({ icon, data, text }) => (
  <div className="flex items-center justify-center flex-col">
    <img src={icon} alt={text} className="w-10 h-10 mb-2" />
    <div className="text-lg font-semibold">{data}</div>
    <div className="text-sm">{text}</div>
  </div>
);

const WeatherApp = () => {
  const apiKey = '461a43e9194cb5a2863e3989af691df8';
  const [weather, setWeather] = useState({
    temp: '24°c',
    location: 'London',
    humidity: '15%',
    wind: '18 km/h',
    lon: 0,
    lat: 0,
  });
  const [wIcon, setWIcon] = useState(cloudIcon);
  const [errorMessage, setErrorMessage] = useState('');

  const updateWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': clearIcon, '01n': clearIcon,
      '02d': cloudIcon, '02n': cloudIcon,
      '03d': drizzleIcon, '03n': drizzleIcon,
      '04d': drizzleIcon, '04n': drizzleIcon,
      '09d': rainIcon, '09n': rainIcon,
      '10d': rainIcon, '10n': rainIcon,
      '13d': snowIcon, '13n': snowIcon,
      'default': clearIcon,
    };
    return iconMap[iconCode] || iconMap['default'];
  };

  const fetchWeather = async (city = 'London') => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather({
        temp: `${Math.floor(data.main.temp)}°c`,
        location: data.name,
        humidity: `${data.main.humidity}%`,
        wind: `${Math.floor(data.wind.speed)} km/h`,
        lon: data.coord.lon,
        lat: data.coord.lat,
      });
      setWIcon(updateWeatherIcon(data.weather[0].icon));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    // Fetch data for London on initial load
    fetchWeather();
  }, []);

  const handleSearch = async () => {
    const cityInput = document.querySelector(".input-city");
    if (!cityInput.value) {
      setErrorMessage('Please enter a city name.');
      return;
    }
    fetchWeather(cityInput.value);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <div className="w-[60%] mx-auto p-5 bg-white rounded-lg shadow-md text-gray-800">
        <div className="flex items-center justify-between p-4">
          <input
            type="text"
            className="input-city form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search"
          />
          <button
            onClick={handleSearch}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <img src={searchIcon} alt="search" className="w-6 h-6" />
          </button>
        </div>
        {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}
        <WeatherIcon icon={wIcon} />
        <div className="text-4xl font-bold text-center">{weather.temp}</div>
        <div className="text-2xl text-center">{weather.location}</div>
        <div className="text-center mt-4">
          <p>Longitude: {weather.lon}</p>
          <p>Latitude: {weather.lat}</p>
        </div>
        <div className="flex justify-around mt-4">
          <WeatherData icon={humidityIcon} data={weather.humidity} text="Humidity" />
          <WeatherData icon={windIcon} data={weather.wind} text="Wind Speed" />
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
