import { Router } from "express";
import postController from "../controllers/postController";
import passport from "passport";
import Authorization from "../middlewares/Authorization";

const postRouter = Router();

postRouter.get("/posts", postController.getAllPosts);
postRouter.get("/posts/:postId", postController.getPost);
postRouter.post(
	"/posts/new",
	passport.authenticate("jwt", { session: false }),
	Authorization.isOwner,
	postController.createNewPost
);

export default postRouter;
