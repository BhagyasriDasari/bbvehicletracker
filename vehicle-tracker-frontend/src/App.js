import React, { Component } from "react";
import VehicleMap from "./components/VehicleMap";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="heading">🚗 Vehicle Tracker</h1>
        <VehicleMap />
      </div>
    );
  }
}

export default App;
