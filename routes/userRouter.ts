import { Router } from "express";
import passport from "passport";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.get(
	"/profile",
	passport.authenticate("jwt", { session: false }),
	userController.getProfile
);

export default userRouter;
