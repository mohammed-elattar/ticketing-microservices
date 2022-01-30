import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { NotFoundError, errorHandler } from "@mseel3ttar/common";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express()

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    //prevent hashing as the jwt which is going to be saved inside the cookie is already hashed
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})

export default app;
