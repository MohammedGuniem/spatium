import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDistance, selectDistance, setAverageElevation, selectAverageElevation, setMaxElevation, selectMaxElevation, setMinElevation, selectMinElevation } from './mapSlice';
import { GoogleMap, useLoadScript, Marker, Polyline} from "@react-google-maps/api"; 
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxOption, ComboboxList } from "@reach/combobox";
import "@reach/combobox/styles.css";
import styles from './Map.module.css';

const libraries = ["places"];

export function Map() {

    // Function to calculate distance between 2 given points
    const calculate_distance = React.useCallback((first_point, second_point) => {
      var total_distance = 0;
      var pi = Math.PI;
      var lon1, lon2, lat1, lat2, dlon, dlat, a, c, r;
      lon1 = (first_point).lng * (pi/180)
      lon2 = (second_point).lng * (pi/180)
      lat1 = (first_point ).lat * (pi/180)
      lat2 = (second_point).lat * (pi/180)
      dlon = lon2 - lon1  
      dlat = lat2 - lat1 
      a = Math.sin(dlat / 2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2)**2
      c = 2 * Math.asin(Math.sqrt(a))    
      r = 6371
      total_distance += c*r
      return (total_distance);
    }, []);

    // Local States
    const [pencil, setPencil] = useState(null);
    const [points, setPoints] = useState([]);
    const [mapCenter, setMapCenter] = useState({lat: 0, lng: 0});

    // Redux state manaegment
    const distance = useSelector(selectDistance);
    const averageElevation = useSelector(selectAverageElevation);
    const minElevation = useSelector(selectMinElevation);
    const maxElevation = useSelector(selectMaxElevation);
    const dispatch = useDispatch();

    // Map Constants, Variables and Functions
    const mapContainerStyle = {
      width: '100vw',
      height: "100vh",
    };
    const options = {
      disableDefaultUI: true,
      zoomControl: true,
    }
    const panTo = React.useCallback(({lat, lng, zoom}) => {
      setMapCenter({lat, lng})
      if (zoom === null) mapRef.current.setZoom(mapRef.current.getZoom());
      else mapRef.current.setZoom(zoom);
    }, []);
    const onMapClick = React.useCallback((event) => {
      setPencil({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }, []);
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
      navigator.geolocation.getCurrentPosition(
        (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 14,
        });
      }, () => null);
    }, [panTo]);
    const {isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    })
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
    
    return (
      <div>
        <img className={styles.logo} src="/logo.svg" alt="" />
        <h1 className={styles.appName}>Spatium</h1>
        <Search panTo={panTo} />
        <Locate panTo={panTo} />
        <div className={styles.distance}>
          Distance: {distance.toFixed(2)} km.
        </div>
        <div className={styles.averageElevation}>
          Average Elevation: {averageElevation.toFixed(2)} m.
        </div>
        <div className={styles.minElevation}>
          Min. Elevation: {minElevation === Infinity ? ((0).toFixed(2)) : (minElevation.toFixed(2))} m.
        </div>
        <div className={styles.maxElevation}>
          Max. Elevation: {maxElevation === -Infinity ? ((0).toFixed(2)) : (maxElevation.toFixed(2))} m.
        </div>
        <GoogleMap 
          mapContainerStyle={mapContainerStyle}
          zoom={2.5}
          center={mapCenter}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          { pencil &&
            <Marker
              position={{ lat: pencil.lat, lng: pencil.lng }}
              icon={{
                url: "/pencil.svg",
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0,0),
                anchor: new window.google.maps.Point(15,15),
              }}
              draggable={true}
              
              onDrag={(event) => {
                setPencil({
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
                });
                var point = { lat: event.latLng.lat(), lng: event.latLng.lng(), elevation: 0 }
                var elevator = new window.google.maps.ElevationService();
                elevator.getElevationForLocations({
                  'locations': [{ lat: point.lat, lng: point.lng }]
                }, function(results, status) {
                  if (status === 'OK') {
                        var retrived_elevation = results[0].elevation;
                        if (retrived_elevation > 0) {
                          point.elevation = retrived_elevation;
                          if (retrived_elevation > maxElevation) dispatch(setMaxElevation(retrived_elevation));
                          else if (retrived_elevation < minElevation) dispatch(setMinElevation(retrived_elevation));
                        } else point.elevation = 0;
                  } else {
                    console.log('Elevation service failed due to: ' + status);
                    point.elevation = 0;
                  }
                });

                var currentPoints = [...points];
                currentPoints.push(point);
                setPoints(currentPoints);
                if (points.length > 1) {
                  var newDistance = distance + calculate_distance(currentPoints[currentPoints.length-2], currentPoints[currentPoints.length-1]);
                  dispatch(setDistance(newDistance));
                  var newElevation = 0
                  for (var i = 0; i < points.length; i++) {
                    newElevation += points[i].elevation;
                  }
                  newElevation = newElevation / points.length;
                  dispatch(setAverageElevation(newElevation));
                }
              }}
            />
          }
          <Polyline path={points} options={{ strokeOpacity: 0.8, strokeColor: "#3266A8", fillColor:"#3266A8"}} />  
        </GoogleMap>
      </div>
    );
}

function Locate({panTo}) {
  return (
    <button className={styles.locate} onClick={() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 14,
        });
      }, () => null);
    }}>
      <img src="/compass.svg" alt="compass - locate me" />
    </button>
  )
}

function Search({panTo}) {
  const {
    ready, 
    value, 
    suggestions: {status, data}, 
    setValue, 
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.653225, lng: () => -79.383186 },
      radius: 200 * 1000,
    }
  })

  return (
    <div className={styles.search}>
      <Combobox 
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng, zoom: 14})
          } catch(error) {
            console.log("error!")
          }
        }}
      >
        <ComboboxInput 
          value={value} 
          onChange={(e) => {
            setValue(e.target.value);
          }} 
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && 
              data.map(({id, description}) => (
              <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}