import  jwt  from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;

declare global {
    var signIn: () => string[];
}

export const user =  {
    email: 'test@test.com',
    password: 'password'
}

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

global.signIn = () => {
    const token = jwt.sign({id: '1', email: 'test@test.com'}, process.env.JWT_KEY!);
    const session = {jwt: token};
    const sessionJson = JSON.stringify(session);
    const base64 = Buffer.from(sessionJson).toString('base64');

    return [
        `session=${base64}; path=/; httponly`
      ];
}