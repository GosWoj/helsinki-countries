import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleCountry from "./components/SingleCountry";
import ListCountries from "./components/ListCountries";

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
      return <ListCountries countries={countries} handleShow={handleShow} />;
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
