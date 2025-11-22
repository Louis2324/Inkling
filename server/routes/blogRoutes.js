import express from "express";
import {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogControllers.js";

import { validate } from "../middleware/validate.js";
import { BlogSchema, updateBlogSchema } from "../validators/blogValidator.js";
import { idParamSchema } from "../validators/paramValidator.js";
import {
  authenticateUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

//public routes
router.get("/", getAllBlogs);
router.get("/:id", validate(idParamSchema, "params"), getBlog);

//protected routes
router.post(
  "/",
  authenticateUser,
  authorizeRoles("writer", "admin"),
  validate(BlogSchema),
  createBlog
);

router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("writer", "admin"),
  validate(idParamSchema, "params"),
  validate(updateBlogSchema),
  updateBlog
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("writer", "admin"),
  validate(idParamSchema , "params"),
  deleteBlog
);

export default router;
