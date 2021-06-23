const { MongoClient } = require("mongodb");

const mongo = {
  db: null,

  async connect() {
    // Connecting to Mongo
    const client = await MongoClient.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");

    // Selecting a DB to access
    const dbName = process.env.MONGODB_NAME;
    this.db = client.db(dbName);
    console.log(`Selected DB: ${dbName}`);
  },
};

module.exports = mongo;
