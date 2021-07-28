import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((result) => {
      setCountries(result.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = countries.filter((country) => {
      return country.name.toLowerCase().includes(search.toLowerCase());
    });
    setCountries(filtered);
  };

  const showCountries = () => {
    if (countries.length === 1) {
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
        </div>
      );
    } else if (countries.length <= 10 && countries.length > 1) {
      return countries.map((country) => {
        return <h3 key={country.alpha3Code}>{country.name}</h3>;
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
