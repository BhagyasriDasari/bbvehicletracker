import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./index.css";

const vehicleIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});

class VehicleMap extends Component {
  state = {
    vehicle: null,
    position: null,
    routeData: [],
    traveledPath: [],
  };

  componentDidMount() {
    this.loadRouteData();
    this.fetchVehicleData();

    // Simulate movement by fetching every 2 seconds
    this.interval = setInterval(this.fetchVehicleData, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Load full route once from public/dummy-route.json
  loadRouteData = () => {
    fetch("/dummy-route.json")
      .then((res) => res.json())
      .then((data) => {
        const route = data.map((point) => [point.latitude, point.longitude]);
        this.setState({ routeData: route });
      })
      .catch((err) => console.error("Error loading route data:", err));
  };

  // Fetch current vehicle position from backend
  fetchVehicleData = () => {
    axios
      .get("https://bbvehicletrackerbackend.onrender.com/api/vehicle")
      .then((res) => {
        const { lat, lng } = res.data.location;
        const newPosition = [lat, lng];

        this.setState((prevState) => ({
          vehicle: res.data,
          position: newPosition,
          traveledPath: [...prevState.traveledPath, newPosition],
        }));
      })
      .catch((err) => console.error("Error fetching vehicle data:", err));
  };

  render() {
    const { vehicle, position, routeData, traveledPath } = this.state;

    if (!vehicle || !position)
      return <p className="loading">Loading vehicle data...</p>;

    return (
      <div className="map-container">
        <MapContainer center={position} zoom={15} className="map">
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Full planned route (gray line) */}
          {routeData.length > 0 && (
            <Polyline
              positions={routeData}
              pathOptions={{ color: "gray", weight: 3, opacity: 0.5 }}
            />
          )}

          {/* Traveled path so far (red line) */}
          {traveledPath.length > 1 && (
            <Polyline
              positions={traveledPath}
              pathOptions={{ color: "red", weight: 5, opacity: 0.8 }}
            />
          )}

          {/* Vehicle marker */}
          <Marker position={position} icon={vehicleIcon}>
            <Popup>
              <strong>{vehicle.name}</strong>
              <br />
              Status: {vehicle.status}
              <br />
              Lat: {position[0].toFixed(5)} | Lng: {position[1].toFixed(5)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default VehicleMap;
