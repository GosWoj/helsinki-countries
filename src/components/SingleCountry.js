import React, { useState, useEffect } from "react";
import axios from "axios";

const SingleCountry = ({ countries }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${countries[0].name}`
      )
      .then((result) => {
        setWeather(result.data);
      });
  }, [countries]);

  return (
    <div>
      <h1>{countries[0].name}</h1>
      <h3>Capital: {countries[0].capital}</h3>
      <h3>Population: {countries[0].population}</h3>
      <h2>Languages:</h2>
      {countries[0].languages.map((lang) => {
        return <p key={lang.iso639_1}>{lang.name}</p>;
      })}
      <img src={countries[0].flag} alt={countries[0].name} />
      {weather.current ? (
        <div>
          <h2>Weather:</h2>
          <h3>Temperature: {weather.current.temperature}°C</h3>
          <img
            src={weather.current.weather_icons[0]}
            alt={weather.current.weather_descriptions[0]}
          />
          <h3>
            Wind speed: {weather.current.wind_speed}km/h from{" "}
            {weather.current.wind_dir} direction
          </h3>
        </div>
      ) : null}
    </div>
  );
};

export default SingleCountry;
