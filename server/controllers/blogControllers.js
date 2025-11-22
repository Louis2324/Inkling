import Blog from "../models/Blog.js";

export const getAllBlogs = async (req, res,next) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("author", "name");
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req, res ,next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res ,next) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user.id });
    res.status(201).json(blog);
  } catch (error) {
      next(error);
  }
};

export const updateBlog = async (req, res ,next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Not Found" });
    blog.title = req.body.title || blog.title;
    blog.body = req.body.body || blog.body;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res ,next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(400).json({ msg: "Not found" });
    if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ msg: "Unauthorized can't delete this post" });
    }
    await blog.deleteOne();
    return res.status(200).json({ msg: "Blog Deleted Succesfully" });
  } catch (error) {
    next(error);
  }
};
