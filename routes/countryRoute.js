const express = require("express");
const Country = require("../models/countryModel");

const router = express.Router();

// GET all countries
router.get("/countries", async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET country by ID
router.get("/countries/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const country = await Country.findById(id);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.json(country);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create a new country
router.post("/countries", async (req, res) => {
  try {
    const newCountry = new Country(req.body);
    const savedCountry = await newCountry.save();
    res.status(201).json(savedCountry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update country by ID
router.put("/countries/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCountry = await Country.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCountry) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.json(updatedCountry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE country by ID
router.delete("/countries/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCountry = await Country.findByIdAndDelete(id);
    if (!deletedCountry) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.json(deletedCountry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
