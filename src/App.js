import React, { useState } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Forecast from './components/Forecast/Forecast';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import {WEATHER_API_URL , WEATHER_API_KEY} from './api';
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForcast] = useState(null);

  const handleOnSearchChange =(searchData)=>{
    const [lat ,lon] = searchData.value.split(' ');
    const CurrentWeatherFetch =  fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch =  fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    Promise.all([CurrentWeatherFetch , forecastFetch])
    .then(async (response) => {
       const weatherResponse = await response[0].json();
       const forecastResponse = await response[1].json();
       setCurrentWeather({city:searchData.label ,...weatherResponse});
       setForcast({city:searchData.label ,...forecastResponse});
    })
    .catch((err) => console.log(err));
    console.log(currentWeather);
    console.log(forecast);
  } 
  return (
    <div className="container">
     <Search onSearchChange={handleOnSearchChange}/>
     { currentWeather && <CurrentWeather data={currentWeather}/>}
     {forecast && <Forecast data={forecast}/>}
     {/* <Forecast/> */}
     
     
    </div>
  );
}

export default App;
