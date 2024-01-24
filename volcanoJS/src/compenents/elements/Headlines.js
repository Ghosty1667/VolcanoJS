import React from "react";


export default function Headlines(props) {
  return (
    <div>
      <h4>{props.name}</h4>
      <p>Country: {props.country}  </p>
      <p>Region: {props.region}</p>
      <p>Subregion: {props.subregion} </p>
      <p>Last eruption: {props.last_eruption}</p>
      <p>Summit: {props.summit}</p>
    </div>
  );
}