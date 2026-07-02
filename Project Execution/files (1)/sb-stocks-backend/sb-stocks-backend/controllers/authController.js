import User from "../models/User.js";
import Portfolio from "../models/Portfolio.js";
import Watchlist from "../models/Watchlist.js";
import generateToken from "../utils/generateToken.js";

// @route  POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email and password" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
      virtualBalance: Number(process.env.DEFAULT_VIRTUAL_BALANCE) || 100000,
    });

    // Every new user gets an empty portfolio + watchlist
    await Portfolio.create({ user: user._id });
    await Watchlist.create({ user: user._id });

    return res.status(201).json({
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// @route  POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    user.lastLoginAt = new Date();
    await user.save();

    return res.json({
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// @route  GET /api/auth/me
export const getProfile = async (req, res) => {
  return res.json({ user: req.user });
};
