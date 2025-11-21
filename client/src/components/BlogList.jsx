import { Link } from "react-router-dom";

const BlogList = (props) => {
  const { blogs, title } = props;
  return (
    <div className="blog-list">
      <h2 className="blog-title">{title}</h2>
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog._id}>
          <Link to={`blogs/${blog._id}`}>
            <h2>{blog.title}</h2>
            <p>
              {blog.body.length > 100
                ? blog.body.slice(0, 100) + "..."
                : blog.body}
            </p>
            <small>Written by {blog.author.name}</small>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
