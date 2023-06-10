// import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

import React, { useEffect, useState } from 'react'

const Map = () => {
    
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryDetails, setCountryDetails] = useState(null);
    useEffect(()=>{
      fetchCountryData()
    },[])
      const fetchCountryData = (countryName) => {
      // let countryName = "India";
        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res)=>res.json())
        .then((data)=>{
    console.log(data);
      })
      
       }
    //   const handleCountryClick = (event) => {
    //     setSelectedCountry(event.target.feature.properties.name);
    //   };
      const handleCountryClick = async (event) => {
        const countryName = event.target.feature.properties.name;
        const data = await fetchCountryData(countryName);
        setCountryDetails(data);
      };
      
  return (
   <>
   <MapContainer style={{height:"80vh",backgroundColor:"black" ,color:"white"}}
    center={[51.0, 19.0]}
    zoom={4}
    maxZoom={18}>
   <GeoJSON
//    data={countriesData}
     style={{ fillColor: '#cccccc', weight: 1, color: '#ffffff', fillOpacity: 0.7 }}
    onEachFeature={(feature, layer) => {
    layer.on({
      click: handleCountryClick,
    });
  }}
/>
</MapContainer>
{countryDetails && (
  <div>
    <h2>{countryDetails.name}</h2>
    <p>Population: {countryDetails.population}</p>
    <p>Area: {countryDetails.area} sq km</p>
    {/* Render other relevant details */}
  </div>
)}

   </>
  )
}

export default Map