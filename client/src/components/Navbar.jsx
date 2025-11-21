import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust path if different

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const canCreate = user && (user.role === "writer" || user.role === "admin");

  const handleLogout = () => {
    logout();
    navigate("/register");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>The Dojo Blog</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        {canCreate && <Link to="/create">New Blog</Link>}
        {user ? (
          <>
            <span style={{ margin: "0 1rem" }}>
              Ninja : <strong>{user.name}</strong> ({user.role})
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/register">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
