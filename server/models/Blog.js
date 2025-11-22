import mongoose from "mongoose";

const BlogSchema = mongoose.Schema(
  {
    title: { type: String, required: true , minlength: 5 },
    body: { type: String, required: true , minlength: 10 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,required :true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
