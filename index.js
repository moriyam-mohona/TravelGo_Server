const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");

require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z3gfp8c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const touristSpotDB = client.db("touristSpotDB").collection("touristSpot");

    app.get("/touristSpot", async (req, res) => {
      const cursor = touristSpotDB.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/touristSpot/:email", async (req, res) => {
      const cursor = touristSpotDB.find({
        userEmail: req.params.email,
      });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/touristSpot/:id", async (req, res) => {
      const cursor = touristSpotDB.findOne({
        _id: new ObjectId(req.params.id),
      });
      console.log(_id);
      const result = await cursor.toArray();
      console.log(result);
      res.send(result);
    });

    app.put("/updateSpot/:id", async (req, res) => {
      console.log(req.params.id);
      const query = { _id: new ObjectId(req.params.id) };
      const data = {
        $set: {
          image: req.body.image,
          touristsSpotName: req.body.touristsSpotName,
          countryName: req.body.countryName,
          location: req.body.location,
          shortDescription: req.body.shortDescription,
          averageCost: req.body.averageCost,
          seasonality: req.body.seasonality,
          travelTime: req.body.travelTime,
          totalVisitorsPerYear: req.body.totalVisitors,
        },
      };
      const result = await touristSpotDB.updateOne(query, data);
      console.log(result);
      res.send(result);
    });

    app.post("/touristSpot", async (req, res) => {
      const newTouristSpot = req.body;
      console.log(newTouristSpot);
      const result = await touristSpotDB.insertOne(newTouristSpot);
      res.send(result);
    });

    app.delete("/touristSpot/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await touristSpotDB.deleteOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
