🚗 Vehicle Tracker Application

This is a full-stack vehicle tracking web application that displays a vehicle’s real-time location and movement on a map. It consists of two parts:

Frontend: React.js app for visualizing vehicle routes and live tracking

Backend: Node.js + Express API that serves simulated or real-time vehicle location data

🗂️ Project Structure
blocklyassgn/
│
├── vehicle-tracker-frontend/    # React.js frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── vehicle-tracker-backend/     # Node.js + Express backend
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md

⚙️ Tech Stack

Frontend:

React.js

Axios (API requests)

Leaflet or Google Maps API (for maps)

CSS 

Backend:

Node.js

Express.js

2️⃣ Setup and Run Backend
cd vehicle-tracker-backend
npm install
npm start


Backend will start at http://localhost:5000

3️⃣ Setup and Run Frontend
cd ../vehicle-tracker-frontend
npm install
npm start


Frontend will start at http://localhost:3000

🌍 Features

Real-time vehicle location tracking

Interactive map view (zoom, pan)

Route visualization

Data fetched dynamically from backend APIs

Responsive and modern UI

📡 API Example

Endpoint:

GET /api/vehicle/location


Response:

{
  "vehicleId": "V123",
  "latitude": 16.5062,
  "longitude": 80.6480,
  "speed": 45,
  "timestamp": "2025-10-28T12:30:00Z"
}


(Optional) SQLite / MongoDB

Dummy data simulation script
