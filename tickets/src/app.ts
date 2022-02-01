import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { NotFoundError } from "@mseel3ttar/common";
import { createTicketRouter } from './routes/new';

const app = express()

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    //prevent hashing as the jwt which is going to be saved inside the cookie is already hashed
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

app.use(createTicketRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})

export default app;
