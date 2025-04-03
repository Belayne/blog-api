import client from "../prisma/prismaClient";

class Authorization {
	static isOwner = (req, res, next) => {
		if (req.user.role === "Owner") {
			next();
			return;
		} else {
			return res.status(401).json({ message: "Not allowed." });
		}
		return res.status(500).json({ message: "Error checking authorization." });
	};

	static isGuest = (req, res, next) => {
		if (req.user.role === "Guest") {
			next();
			return;
		} else {
			return res.status(401).json({ message: "Not allowed." });
		}
		return res.status(500).json({ message: "Error checking authorization." });
	};

	static setOwner = async (req, res, next) => {
		const { ownerPassword } = req.body;
		if (ownerPassword === process.env.OWNER_PASSWORD) {
			try {
				await client.user.update({
					where: {
						id: req.user.id,
					},
					data: {
						Role: "Owner",
					},
				});
				return res.json({ message: "User is now onwer." });
			} catch (error) {
				next(error);
			}
		} else {
			return res.status(401).json({ message: "Not allowed." });
		}
		return res.status(500).json({ message: "Error checking authorization." });
	};
}

export default Authorization;
