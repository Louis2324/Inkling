import { useParams, useNavigate, Link } from "react-router-dom";
import useAxios from "./useAxios";
import API from "../api/Axios.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useAxios(`blogs/${id}`);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await API.delete(`blogs/${blog._id}`);
      navigate("/");
    } catch (err) {
      console.err("Failed to delete : ", err.message);
    }
  };

  const { user } = useAuth();
  const canDelete = (blog, user) => {
    if (!user || !blog || !blog.author) return false;
    if (user.role === "admin") return true;
    if (user.role === "writer" && user._id === blog.author._id) return true;
    return false;
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <div>{blog.body}</div>
          <small>Written by {blog.author.name}</small>
          {canDelete(blog, user) && (
            <button onClick={handleDelete}>
              <FaTrash /> Delete
            </button>
          )}
          {canDelete(blog, user) && (
            <Link to={`/edit/${blog._id}`}>
              <button>
                <FaEdit />
                Edit
              </button>
            </Link>
          )}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
