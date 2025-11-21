import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Axios.jsx";
import { FaPlus } from "react-icons/fa";

const Create = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author] = useState(user?.name || "Anonymous");

  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    try {
      setIsPending(true);
      await API.post("/blogs", blog);
      console.log("Blog created");
      setIsPending(false);
      navigate("/");
    } catch (err) {
      console.error(
        "Failed to create blog:",
        err.response?.data || err.message
      );
      setIsPending(false);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <p>
          <strong>Author:</strong> {author}
        </p>

        {!isPending && (
          <button>
            {" "}
            Add Blog <FaPlus />
          </button>
        )}
        {isPending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
