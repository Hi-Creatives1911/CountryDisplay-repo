import React from "react";

function CountryDetails({ country, onBack }) {
  return (
    <div className="countryDetailPage">
      <button className="backBtn" onClick={onBack}>
        ⬅ Back to Home
      </button>
      <h1>{country.name}</h1>
      <br />
      <img
        src={`https://flagcdn.com/${country.code2.toLowerCase()}.svg`}
        alt={country.name}
        className="countryFlagLarge"
      />
      <div className="countryDetails">
        <h3>Capital</h3>
        {country.capital}
        <br />
        <br />
        <h3>Region</h3>
        {country.region} <br />
        <br />
        <h3>SubRegion</h3>
        {country.subregion} <br />
      </div>{" "}
      <br />
      <h3>States</h3>
      {country.states && country.states.length > 0 ? (
        <ul className="statesList">
          {country.states.map((s) => (
            <li key={s.code}>{s.name}</li>
          ))}
        </ul>
      ) : (
        <p>No states available</p>
      )}
    </div>
  );
}

export default CountryDetails;
