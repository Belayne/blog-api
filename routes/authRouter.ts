import authController from "../controllers/authController";
import { Router } from "express";
import Authorization from "../middlewares/Authorization";
import passport from "passport";

const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.put(
	"/setOwner",
	passport.authenticate("jwt", { session: false }),
	Authorization.setOwner
);

export default authRouter;
