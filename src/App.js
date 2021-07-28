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

  console.log(weather.current);

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
          <h3>Temperature: {weather.current.temperature}</h3>
          <img
            src={weather.current.weather_icons[0]}
            alt={weather.current.weather_descriptions[0]}
          />
          <h3>Wind speed: {weather.current.wind_speed}</h3>
        </div>
      ) : null}
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((result) => {
      setCountries(result.data);
    });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${countries[0].name}`
  //     )
  //     .then((result) => {
  //       setWeather(result.data);
  //     });
  // }, [countries]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = countries.filter((country) => {
      return country.name.toLowerCase().includes(search.toLowerCase());
    });
    setCountries(filtered);
  };

  const handleShow = (name) => {
    setCountries(
      countries.filter((country) => {
        return country.name.toLowerCase().includes(name.toLowerCase());
      })
    );
  };

  const showCountries = () => {
    if (countries.length === 1) {
      return <SingleCountry countries={countries} />;
    } else if (countries.length <= 10 && countries.length > 1) {
      return countries.map((country) => {
        return (
          <div key={country.alpha3Code}>
            <h3>{country.name}</h3>
            <button onClick={() => handleShow(country.name)}>Show</button>
          </div>
        );
      });
    } else {
      return <h2>Too many matches. Be more specific.</h2>;
    }
  };

  return (
    <div>
      <div>
        Find country: <input value={search} onChange={handleSearch} />
        {showCountries()}
      </div>
    </div>
  );
};

export default App;
