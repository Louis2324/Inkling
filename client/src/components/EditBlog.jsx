import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/Axios";
import { useAuth } from "../context/AuthContext";
import { FaEdit } from "react-icons/fa";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setTitle(res.data.title);
        setBody(res.data.body);
      } catch (error) {
        setError(error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/blogs/${id}`, { title, body });
      navigate(`/blogs/${id}`);
    } catch (error) {
      console.log(error, "Failed to update post");
    }
  };

  return (
    <div className="create">
      <h2>Edit Blog : {user.name} </h2>
      {error && <div>{error.message}</div>}
      <form onSubmit={handleUpdate}>
        <label>Blog Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Blog Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button>
          Update Blog <FaEdit />{" "}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
