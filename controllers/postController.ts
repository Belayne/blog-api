import { NextFunction, Request, Response } from "express";
import client from "../prisma/prismaClient";
import { error } from "console";

class PostController {
	private static instance: PostController;
	private constructor() {}

	static getInstance() {
		return this.instance || new PostController();
	}

	getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const posts = await client.post.findMany();
			return res.json({ posts });
		} catch (error) {
			next(error);
		}
		res.status(500).json({ message: "Error getting posts" });
	};

	getPost = async (req: Request, res: Response, next: NextFunction) => {
		const { postId } = req.params;
		try {
			const post = await client.post.findFirst({
				where: {
					id: postId,
				},
			});
			return res.json({ post });
		} catch (error) {
			next(error);
		}

		res.status(500).json({ message: "Error getting post" });
	};

	createNewPost = async (req: Request, res: Response, next: NextFunction) => {
		const { postTitle, postContent } = req.body;
		try {
			const post = await client.post.create({
				data: {
					title: postTitle,
					body: postContent,
					author: { connect: { id: req.user.id } },
				},
			});
			if (post) {
				return res.json({ message: "Post created" });
			}
		} catch (error) {
			next(error);
		}
		res.status(500).json({ message: "Error creating post" });
	};
}

const postController = PostController.getInstance();

export default postController;
