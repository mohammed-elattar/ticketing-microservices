import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express()
const port = 3000

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    //prevent hashing as the jwt which is going to be saved inside the cookie is already hashed
    signed: false,
    secure: true
}))
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})


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