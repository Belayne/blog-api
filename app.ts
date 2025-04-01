import express from "express";
import path from "path";
import dotenv from "dotenv";
import configPassport from "./config/configPassport";
import authRouter from "./routes/authRouter";

dotenv.config();
configPassport();
const __dirname = path.dirname("./");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

app.listen(3000, () => console.log("Server listening on port 3000"));
