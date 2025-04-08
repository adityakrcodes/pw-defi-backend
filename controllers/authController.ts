const User = require("./models/User.ts");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

export const register = async (req, res) => {
	try {
		const {
			walletAddress,
			firstname,
			lastname,
			username,
			email,
			password,
		} = req.body;

		const existingUser = await User.findOne({
			$or: [{ username }, { email }],
		});
		if (existingUser) {
			return res
				.status(409)
				.json({ message: "Username or email already exists" });
		}

		const newUser = new User({
			walletAddress,
			firstname,
			lastname,
			username,
			email,
			password,
		});
		await newUser.save();

		const token = generateToken(newUser._id);

		res.status(201).json({
			message: "User registered successfully",
			token,
		});
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({ message: "Failed to register user" });
	}
};

export const login = async (req, res) => {
	try {
		const { identifier, password } = req.body;

		const user = await User.findOne({
			$or: [{ username: identifier }, { email: identifier }],
		});
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const isPasswordValid = await user.comparePassword(password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = generateToken(user._id);

		res.status(200).json({ message: "Logged in successfully", token });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Failed to login" });
	}
};
