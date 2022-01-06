import mongoose from 'mongoose';
import app from './app';

const port = 3000

const connectDB = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is not defined');
    }
  try {
    await mongoose
    .connect('mongodb://auth-mongo-srv:27017/auth ');    
    console.log('connected to mongo db');
  } catch (error) {
   console.error(error)   
  }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

};

connectDB();