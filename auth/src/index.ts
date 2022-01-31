import mongoose from 'mongoose';
import app from './app';

const port = 3000

const connectDB = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is not defined');
    }
    if(!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined');
    }
  try {
    await mongoose
    .connect(process.env.MONGO_URI);    
    console.log('connected to mongo db');
  } catch (error) {
   console.error(error)   
  }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

};

connectDB();