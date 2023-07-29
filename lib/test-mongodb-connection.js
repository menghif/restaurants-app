const { MongoClient } = require("mongodb");

// Make sure the MONGODB_URI environment variable is set before running this script.
const uri = process.env.MONGODB_URI;
const options = {};

async function testConnection() {
  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    console.log("Connected successfully to MongoDB server");

    const db = client.db("sample_restaurants");
    const restaurant = await db.collection("restaurants").findOne({});
    console.log("Fetched a restaurant:", restaurant);

    // Close the connection after the test is done.
    await client.close();
    console.log("Connection closed successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

testConnection();
