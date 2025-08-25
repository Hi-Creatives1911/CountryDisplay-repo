import "./App.css";
import React, { useState, useEffect } from "react";
import data from "./countries.json";
import CountryDetails from "./CountryDetails";

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

  const onBack = () => {
    setPickedCountry(null);
    setSearchTerm("");
    setCountries(allCountries);
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
        <CountryDetails country={pickedCountry} onBack={onBack} />
      )}
    </>
  );
}

export default App;
