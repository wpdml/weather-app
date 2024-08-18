import React from 'react'

const WeatherBox = ({weather}) => {

  const tempCelsius = weather?.main.temp;
  const tempFahrenheit = (tempCelsius * 9/5 + 32).toFixed(2);

  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
      <h2>{tempCelsius}°C / {tempFahrenheit}°F</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox;
