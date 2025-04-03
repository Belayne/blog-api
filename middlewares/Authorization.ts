class Authorization {
	static isOwner = (req, res, next) => {
		if (req.user.role === "Owner") {
			next();
		} else {
			res.status(401).json({ message: "Not allowed." });
		}
		res.status(500).json({ message: "Error checking authorization." });
	};

	static isGuest = (req, res, next) => {
		if (req.user.role === "Guest") {
			next();
		} else {
			res.status(401).json({ message: "Not allowed." });
		}
		res.status(500).json({ message: "Error checking authorization." });
	};
}

export default Authorization;
