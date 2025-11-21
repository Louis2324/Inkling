import { useAuth } from "../../context/AuthContext.jsx";
import "./loginSignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const LoginSignUp = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      action === "Login"
        ? "http://localhost:4000/api/users/login"
        : "http://localhost:4000/api/users/register";

    const payload =
      action === "Login" ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data, "← This is the user data that was returned");

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      loginUser(data.user, data.token);
      navigate("/");
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          style={{ width: "100%" }}
        >
          {action === "Login" ? null : (
            <div className="input">
              <input
                type="text"
                id="name"
                placeholder="Doje Ninja One"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input">
            <input
              type="email"
              id="email"
              placeholder="Hiyaah@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input">
            <input
              type="password"
              id="password"
              placeholder="This is where your password goes"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {action === "SignUp" ? null : (
            <div className="forgot-password">
              Forgot Password? <span>Click Here</span>
            </div>
          )}

          <div className="submit-container">
            <div
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={() => setAction("SignUp")}
            >
              <FaUserPlus />
            </div>
            <div
              className={action === "SignUp" ? "submit gray" : "submit"}
              onClick={() => setAction("Login")}
            >
              <FaSignInAlt />
            </div>
          </div>

          <div className="submit-container">
            <button type="submit" className="submit">
              {action === "Login" ? "Login " : "Register "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignUp;
