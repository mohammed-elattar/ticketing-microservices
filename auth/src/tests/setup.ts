import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';

let mongo: any;

declare global {
    var signIn: () => Promise<string[]>;
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

global.signIn = async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({...user})
        .expect(201);

        return response.get('Set-Cookie');
}