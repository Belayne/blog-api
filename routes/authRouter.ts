import authController from "../controllers/authController";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);

export default authRouter;
