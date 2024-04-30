const mongoose = require("mongoose");

// Define schema
const touristSpotSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  touristsSpotName: {
    type: String,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  averageCost: {
    type: String,
    required: true,
  },
  seasonality: {
    type: String,
    required: true,
  },
  travelTime: {
    type: String,
    required: true,
  },
  totalVisitors: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

// Create model
const TouristSpot = mongoose.model("TouristSpot", touristSpotSchema);

module.exports = TouristSpot;
