import { useNavigate } from "react-router-dom";
import { MessageCircle, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-icon-wrapper">
        <div className="login-icon-glow" />
        <div className="login-icon-circle">
          <MessageCircle />
        </div>
      </div>

      <h1 className="login-title">Log in to WeChat</h1>

      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <div className="login-field">
          <label className="login-label">Mobile Number</label>
          <div className="login-input-wrapper">
            <Phone />
            <input className="login-input" type="tel" placeholder="+1 555-0123" />
          </div>
        </div>

        <div className="login-field">
          <label className="login-label">Password</label>
          <div className="login-input-wrapper">
            <Lock />
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
            />
            <button
              type="button"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <button className="login-btn" type="submit">Log In</button>

        <div className="login-links">
          <button className="login-link" type="button">Forgot Password?</button>
          <button className="login-link" type="button">SMS Login</button>
        </div>
      </form>

      <div className="login-footer">
        Don't have an account?{" "}
        <button className="login-footer-link" onClick={() => navigate("/Create")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
