import express from "express";
import dotenv from "dotenv";
import configPassport from "./config/configPassport";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";

dotenv.config();
configPassport();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(userRouter);
app.use(postRouter);

app.listen(3000, () => console.log("Server listening on port 3000"));
