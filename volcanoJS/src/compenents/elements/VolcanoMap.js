import React from "react"
import { Map, Marker } from "pigeon-maps"

export function MyMap(props) {
  const latitude = parseInt(props.latitude, 10);
  const longitude = parseInt(props.longitude, 10)
  return (

    < Map height={400} width={1000} defaultCenter={[latitude, longitude]} defaultZoom={8} >
      <Marker width={50} anchor={[latitude, longitude]} />
      {console.log(latitude, longitude)}
    </Map >
  )
}