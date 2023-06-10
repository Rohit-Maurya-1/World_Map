import React, { useEffect, useState } from 'react'
import { MapContainer,GeoJSON, TileLayer,Marker} from 'react-leaflet';
import mapData from "./../Data/countries.json"
import "leaflet/dist/leaflet.css"


const GoogleMap = () => {
  const [countryDetails, setCountryDetails] = useState({});
  const [cdata,setCData]=useState([])
  let style={}
  var color=["yellow","pink","red","green"]

  useEffect(()=>{
    fetchCountryData(countryDetails)
  },[countryDetails])
    const fetchCountryData = (countryDetails) => {
      fetch(`https://restcountries.com/v3.1/name/${countryDetails.country??"india"}?fullText=true`).then((res)=>res.json())
      .then((data)=>{
        setCData (data)
    })
    }
     const changeContryColor=(event)=>{
     event.target.setStyle({
        color:"green",
        fillColor:"yellow"
      })
      setCountryDetails({
        country: event.target._popup._content
      })
       }
      const onEachCountry = (country,layer)=>{
      const countryName = country.properties.ADMIN
      setCountryDetails(layer.bindPopup(countryName))
    
      const colorIndex= Math.floor(Math.random()*color.length);
       layer.options.fillColor=color[colorIndex]

      layer.on({
        click: changeContryColor
      })
     }
  return (
    <div>
    <h1 style={{textAlign:"center"}}>MAP</h1>
    <MapContainer style={{height:"80vh",backgroundColor:"white"}}
  center={[51.0, 19.0]}
    zoom={4}
    maxZoom={18}>
    <GeoJSON data={mapData.features} onEachFeature={onEachCountry}>
    </GeoJSON>
    
    </MapContainer>
   
  
  <div style={{border:"1px solid red"}}>
   { cdata?.map((data,index)=>{
    return(
      <>
      <div
      key={index}>
      <h1> <p>population:{[data.population]}</p></h1>
     <h1> <p>capital {data.capital}</p></h1>
      {/* <h1>currencies {data.currencies.INR.symbol}</h1> */}
      <h1>area{data.area} sq km</h1>
      </div>
      </>
    )
    })}
      </div>
    </div>
  )}
export default GoogleMap;