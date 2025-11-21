import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import {validate} from "../middleware/validate.js";
import { UserSchema , loginSchema } from "../validators/userValidator.js";

const router = express.Router();

//public to all users
router.post("/register",validate(UserSchema), registerUser);
router.post("/login",validate(loginSchema), loginUser);

export default router;
