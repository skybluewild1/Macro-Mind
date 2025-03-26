import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./login.css";
// Import your logo image (adjust the path as needed)
import logo from "../images/MacroMind.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const LoginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      {/* Logo at the top */}
      <img src={logo} alt="Macro Mind Logo" className="login-logo" />

      {/* Gradient container that fills the page */}
      <div className="login-background">
        <form className="login-form" onSubmit={LoginUser}>
          <h2 className="login-title">Login</h2>

          <div className="login-field">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="login-input"
            />
          </div>

          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="login-input"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <p className="login-register">
            Don't have an account?{" "}
            <a href="/register" className="register-link">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
