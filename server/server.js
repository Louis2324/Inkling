import express from "express";
import { connectDB } from "./config/db.js";
import blogRouter from "./routes/blogRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
