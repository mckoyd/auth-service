import "express-async-errors";
import dotenv from "dotenv";
import express from "express";
import cookieSession from "cookie-session";
import { json } from "body-parser";

import currentUserRouter from "./routes/current-user";
import signinRouter from "./routes/signin";
import signoutRouter from "./routes/signout";
import signupRouter from "./routes/signup";
import errorHandler from "./middlewares/error-handler";
import NotFoundError from "./errors/not-found-error";

dotenv.config();
const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use("/api/users", currentUserRouter);
app.use("/api/users", signinRouter);
app.use("/api/users", signoutRouter);
app.use("/api/users", signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
