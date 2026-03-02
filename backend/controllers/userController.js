import { User } from '../models/userModel.js';
import bcypt from 'bcryptjs';

export const registerUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}
		// Check if user already exists
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}
		const hashedPassword = await bcypt.hash(password, 10);
		const newUser = await User.create({ username, email, password: hashedPassword });
		return res.status(201).json({ success: true, message: "User registered successfully", data: newUser });
	} catch (error) {
		console.error("Error in registerUser:", error.message);
		return res.status(500).json({ success: false, message: "Server error" });
	}
}