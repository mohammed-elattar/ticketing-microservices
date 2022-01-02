import express from 'express';
import 'express-async-errors';
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express()
const port = 3000

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})