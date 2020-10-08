import React, { Fragment, Component } from 'react'
import { Marker, Popup, Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import {  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../assets/data';


export const VenueLocationIcon = L.icon({
  iconUrl: require('../assets/venue_location_icon.svg'),
  iconRetinaUrl: require('../assets/venue_location_icon.svg'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-venue-icon'
});

const MarkerPopup = (props) => {
  const { name,i } = props.data;
  return  (
  	<Popup>
  		<div className='poup-text'>{i}. <b>{name}</b></div>
  	</Popup>);
};

const VenueMarkers = (props) => {
  const { venues } = props;

  const markers = venues.map((venue, index) => (
    <Marker key={index} position={venue.geometry} icon={VenueLocationIcon} >
      <MarkerPopup data={venue} />
    </Marker>
  ));

  return <Fragment>{markers}</Fragment>
};

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 56.701420, lng: 50.064746 },
      zoom: 4,
    }
  }
  render() {
    const { currentLocation, zoom } = this.state;
    return (
      <Map center={currentLocation} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <VenueMarkers venues={ data.venues }/>
      </Map>
    );
  }
}

export default MapView;