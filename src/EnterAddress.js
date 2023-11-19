import { useEffect, useState } from "react";
import "./styles.css";

export default function EnterAddress() {
  // google api key
  const [key, setKey] = useState("AIzaSyCaGtOSkfVahOiEOGkKFnAoi9C2IuE6LSA");

  // location state
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    accuracy: "",
    address: ""
  });

  // detech the usrs
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords);
      setLocation({
        ...location,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
    });
  }, []);

  // handle address by typing
  const handleEnterAddress = (e) => {
    setLocation({
      ...location,
      address: e
    });
  };

  // location by address
  const getLocationByAddress = () => {
    if (location.address) {
      // console.log("get location by address:", location.address);
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location.address}+&key=${key}`,
        {
          method: "GET"
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.results[0]);
          // set the location state
          setLocation({
            ...location,
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
            accuracy: "",
            address: data.results[0].formatted_address
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Kindly, Enter your address");
    }
  };

  // location by detection
  const getLocationBydetection = () => {
    if (location.latitude && location.longitude) {
      // https://maps.googleapis.com/maps/api/geocode/json?latlng=30.720394,76.70731599999999&key=AIzaSyCaGtOSkfVahOiEOGkKFnAoi9C2IuE6LSA
      fetch(
        // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.longitude},${location.longitude}&key=${key}`,
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=30.720394,76.70731599999999&key=AIzaSyCaGtOSkfVahOiEOGkKFnAoi9C2IuE6LSA",
        {
          method: "GET"
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log("get Location by detection: ", data.results[0]);
          setLocation({
            address: data.results[0].formatted_address,
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("latitude and longitude is not define.");
    }
  };

  return (
    <div className="App">
      <input type="text" onChange={(e) => handleEnterAddress(e.target.value)} />
      <button onClick={getLocationByAddress}>By Address</button>
      <button onClick={getLocationBydetection}>Detect Location</button>
      <div>
        <p>Address: {location.address}</p>
        <p>Latitude: {location.latitude}</p>
        <p>Longitude:{location.longitude}</p>
      </div>
      <p>Location on map Below</p>
    </div>
  );
}
