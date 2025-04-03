import { NextFunction, Request, Response } from "express";
import client from "../prisma/prismaClient";

class UserController {
	private static instance: UserController;
	private constructor() {}

	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new UserController();
		return this.instance;
	}

	getProfile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.user || !req.user.id) {
				return res.status(400).json({ message: "Error gettin user data" });
			}
			const user = await client.user.findFirst({
				where: {
					id: req.user.id,
				},
			});
			if (!user) {
				return res.status(403).json({ message: "User not found" });
			}
			return res.json({
				id: user.id,
				username: user.username,
				role: user.Role,
			});
		} catch (error) {
			next(error);
		}
		return res.status(500).json({ message: "Error fetching user" });
	};
}

const userController = UserController.getInstance();

export default userController;
