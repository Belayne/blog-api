import bcrypt from "bcryptjs";
import client from "../prisma/prismaClient";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class AuthController {
	private static instance: AuthController;
	private constructor() {}

	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new AuthController();
		return this.instance;
	}

	signup = async (req: Request, res: Response, next: NextFunction) => {
		const { username, password } = req.body;
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			await client.user.create({
				data: {
					username,
					password: hashedPassword,
				},
			});
			res.json({
				registered: true,
			});
		} catch (error) {
			next(error);
		}
	};

	login = async (req: Request, res: Response, next: NextFunction) => {
		const { username, password } = req.body;
		try {
			const user = await client.user.findFirst({
				where: { username },
			});

			if (user) {
				const match = await bcrypt.compare(password, user.password);
				if (!match) {
					return res.status(401).json({ message: "Auth failed" });
				} else {
					const token = jwt.sign({ username }, process.env.SECRET_KEY);
					return res.json({
						message: "Auth success",
						token,
					});
				}
			} else {
				return res.status(401).json({ message: "Auth failed" });
			}
		} catch (error) {
			next(error);
		}
		res.status(500).json({ message: "Error with auth" });
	};
}

const authController = AuthController.getInstance();

export default authController;
