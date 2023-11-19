import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    accuracy: ""
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      setLocation({
        ...location,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
    });
  }, []);
  return (
    <div className="App">
      <h4>Latitude: {location.latitude}</h4>
      <h4>Longitude: {location.longitude}</h4>
      <p>Location on map Below</p>
    </div>
  );
}
