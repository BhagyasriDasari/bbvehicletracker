const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

// Load dummy route data
const route = JSON.parse(fs.readFileSync("dummy-route.json", "utf8"));

// Initial vehicle info
let currentIndex = 0;

app.get("/api/vehicle", (req, res) => {
  const location = route[currentIndex];
  const response = {
    id: 1,
    name: "Test Vehicle",
    location,
    status: "moving",
  };

  // Move to next point (loop back to start)
  currentIndex = (currentIndex + 1) % route.length;

  res.json(response);
});

module.exports = app;
