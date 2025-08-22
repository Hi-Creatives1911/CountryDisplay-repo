import "./App.css";
import React, { useState, useEffect } from "react";
import data from "./countries.json";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [pickedCountry, setPickedCountry] = useState(null);

  useEffect(() => {
    setCountries(data);
    setAllCountries(data);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      setCountries(allCountries);
    } else {
      const filtered = allCountries.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase())
      );
      setCountries(filtered);
    }
  };

  return (
    <>
      {!pickedCountry && (
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search Countries..."
            className="searchBar"
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
      )}

      {!pickedCountry ? (
        <ul className="countries">
          {countries.map((c) => (
            <li key={c.code2} onClick={() => setPickedCountry(c)}>
              <h2 className="countryTitle">{c.name}</h2>
              <img
                src={`https://flagcdn.com/${c.code2.toLowerCase()}.svg`}
                alt={c.name}
                className="countryFlag"
              />
              <div className="countryDetails">
                <h3>Capital</h3>
                {c.capital}
                <br />
                <h3>Region</h3>
                {c.region} <br />
                <h3>SubRegion</h3>
                {c.subregion} <br />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="countryDetailPage">
          <h1>{pickedCountry.name}</h1>
          <br />
          <img
            src={`https://flagcdn.com/${pickedCountry.code2.toLowerCase()}.svg`}
            alt={pickedCountry.name}
            className="countryFlagLarge"
          />
          <div className="countryDetails">
            <h3>Capital</h3>
            {pickedCountry.capital}
            <br />
            <br />
            <h3>Region</h3>
            {pickedCountry.region} <br />
            <br />
            <h3>SubRegion</h3>
            {pickedCountry.subregion} <br />
          </div>{" "}
          <br />
          <h3>States</h3>
          {pickedCountry.states && pickedCountry.states.length > 0 ? (
            <ul className="statesList">
              {pickedCountry.states.map((s) => (
                <li key={s.code}>{s.name}</li>
              ))}
            </ul>
          ) : (
            <p>No states available</p>
          )}
          <button
            className="backBtn"
            onClick={() => {
              setPickedCountry(null);
              setCountries(allCountries);
              setSearchTerm("");
            }}
          >
            ⬅ Back to Home
          </button>
        </div>
      )}
    </>
  );
}

export default App;
