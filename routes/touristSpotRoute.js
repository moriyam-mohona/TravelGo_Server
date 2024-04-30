const express = require("express");
const TouristSpot = require("../models/touristSpotModel");
const router = express.Router();

router.get("/touristSpot", async (req, res) => {
  try {
    const touristSpots = await TouristSpot.find();
    res.json(touristSpots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/touristSpot/byEmail/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const touristSpots = await TouristSpot.find({ userEmail: email });
    res.json(touristSpots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/touristSpot/byId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const touristSpot = await TouristSpot.findById(id);
    if (!touristSpot) {
      return res.status(404).json({ message: "Tourist spot not found" });
    }
    res.json(touristSpot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/updateSpot/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTouristSpot = await TouristSpot.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedTouristSpot) {
      return res.status(404).json({ message: "Tourist spot not found" });
    }
    res.json(updatedTouristSpot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/touristSpot", async (req, res) => {
  try {
    const newTouristSpot = new TouristSpot(req.body);
    const savedTouristSpot = await newTouristSpot.save();
    res.json(savedTouristSpot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/touristSpot/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTouristSpot = await TouristSpot.findByIdAndDelete(id);
    if (!deletedTouristSpot) {
      return res.status(404).json({ message: "Tourist spot not found" });
    }
    res.json(deletedTouristSpot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
