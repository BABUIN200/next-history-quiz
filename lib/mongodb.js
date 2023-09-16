import { MongoClient } from "mongodb";

const MONGO_URI = "mongodb://0.0.0.0:27017";
const MONGO_DB = "mydb";

let cachedClient = null, cachedDb = null
export default async function connect2db() {
  //if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  cachedClient = client;
  cachedDb = client.db(MONGO_DB);
  return {
    client: cachedClient,
    db: cachedDb,
  };
}