const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passop';

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }
}
connectDB();

// Get all passwords
app.get('/', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('passop');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Save a password
app.post('/', async (req, res) => {
    try {
        const password = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passop'); // Ensure the collection name is correct
        await collection.insertOne(password);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to save data" });
    }
});

// Delete all passwords
app.delete('/', async (req, res) => {
  try {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection('passop'); // Ensure the collection name is correct
      await collection.deleteOne(password);
      res.json({ success: true});
  } catch (err) {
      res.status(500).json({ error: "Failed to delete data" });
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
