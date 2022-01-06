import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'asdasdad';
  // This will create an new instance of "MongoMemoryServer" and automatically start it
mongo = await MongoMemoryServer.create();

const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close(true);
});
