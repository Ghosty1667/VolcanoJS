import React from "react";
import { useState } from "react";
import { useCountries } from "../data/VolcanoesAPI"


export default function Dropdown(props) {
  const [country, setCountry] = useState("Select a country");
  const [population, setPopulation] = useState("");
  const { countries } = useCountries();
  const populations = ['5km', '10km', '30km', '100km'];


  return (
    <div>
      <select value={country} onChange={(e) => {
        setCountry(e.target.value)
      }}>
        <option value="Select a country"> -- Select a country -- </option>
        {countries.map((item, index) =>
          <option key={index} value={item}>{item}</option>
        )}
      </select>

      <select value={population} onChange={(e) => {
        setPopulation(e.target.value)
      }}>
        <option value=""> -- Distance -- </option>
        {populations.map((item, index) =>
          <option key={index} value={item}>{item}</option>
        )}
      </select>

      <button
        id="search-button"
        type="submit"
        value="Search"
        onClick={() => props.onSubmit({ country: country, populatedWithin: population })}>
        Search
      </button>
    </div>
  );
}