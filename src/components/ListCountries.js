import React from "react";

const ListCountries = ({ countries, handleShow }) => {
  return (
    <div>
      {countries.map((country) => {
        return (
          <div key={country.alpha3Code}>
            <h2>{country.name}</h2>
            <button onClick={() => handleShow(country.name)}>Show</button>
          </div>
        );
      })}
    </div>
  );
};

export default ListCountries;
