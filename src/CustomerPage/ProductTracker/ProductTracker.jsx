import React,  { useState } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import "./producttracker.scss"

export function MapContainer(props) {
  const [visible, setVisible] = useState(false)
  function onInfoWindowClose(){

  }
  function onMarkerClick(){

  }
  const containerStyle = {
  position: 'relative',  
  width: '900px',
  height: '400px'
}

 const handleSubmit = (evt)=>{
  evt.preventDefault()
  setVisible(true)
 }
    return (

      <div className="producttracker">
        <div className="search">
          <h2> Enter the tracking number</h2>
          <form action="" onSubmit={handleSubmit}>
          
          <div className="payment">
            <label htmlFor="ttnumber">
              </label>
            <input placeholder="Enter your tracking id to locate your order" required id='ttnumber'  name='ttnumber' type="text"  />
            </div>
            <button>Track</button>
            </form>
        
        

        {!visible && <img src="https://cdni.iconscout.com/illustration/premium/thumb/tracking-delivery-person-location-5066087-4254789.png"/>}
      {visible && <Map className="map" containerStyle={containerStyle}
 google={props.google} initialCenter={{
            lat: Math.floor((Math.random() * 40) + 1),
            lng: Math.floor((Math.random() * 40) + 1)
          }} zoom={15}>
 
        <Marker onClick={onMarkerClick}
                name={'Current location'} />
 
       
      </Map>}
      </div>
      </div>
    );
}


export default GoogleApiWrapper({
  apiKey: "AIzaSyAZ1Wa-f1CTNcYScYabOxtW8OybyArTTRY"
})(MapContainer)