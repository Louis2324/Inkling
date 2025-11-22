import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/jwtutil.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, password, email, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const user = await User.create({ name, password, email, role });
    const token = createJWT(user);
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res , next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.compare(password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = createJWT(user);
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
