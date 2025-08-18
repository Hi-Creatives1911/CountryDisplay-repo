import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

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

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setAllCountries(data);
      });
  }, []);

  return (
    <>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search Countries..."
          className="searchBar"
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>
      <ul className="countries">
        {countries.map((c) => (
          <li>
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
    </>
  );
}

export default App;
