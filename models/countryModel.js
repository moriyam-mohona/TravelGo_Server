const mongoose = require("mongoose");

// Define schema
const countrySchema = new mongoose.Schema({
  countryName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Create model
const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
