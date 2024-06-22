const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URI;

console.log(`MONGODB_URI: ${url}`); // Debugging: Print the URI to check if it's loaded correctly

if (!url) {
  console.error('MONGODB_URI is not defined. Please check your .env file.');
  process.exit(1);
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function testConnection() {
  try {
    console.log(`Connecting to MongoDB at ${url}`);
    await client.connect();
    console.log('Connected to MongoDB');
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error('Connection to MongoDB failed', err);
  } finally {
    try {
      await client.close(); // Ensures that the client will close when you finish/error
      console.log('MongoDB client closed');
    } catch (closeErr) {
      console.error('Failed to close MongoDB client', closeErr);
    }
  }
}

testConnection().catch(err => {
  console.error('Unhandled error:', err);
});
