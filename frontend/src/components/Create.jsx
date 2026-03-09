import { useNavigate } from "react-router-dom";
import { MessageCircle, User, Phone, Lock, Eye, EyeOff, ChevronLeft, Globe } from "lucide-react";
import { useState } from "react";
import "./Create.css";

const Create = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="create-container">
      <button className="create-back-btn" onClick={() => navigate("/")}>
        <ChevronLeft />
      </button>

      <div className="create-icon-wrapper">
        <div className="create-icon-glow" />
        <div className="create-icon-circle">
          <MessageCircle />
        </div>
      </div>

      <h1 className="create-title">Sign Up for WeChat</h1>

      <form className="create-form" onSubmit={(e) => e.preventDefault()}>
        <div className="create-field">
          <label className="create-label">Full Name</label>
          <div className="create-input-wrapper">
            <User />
            <input className="create-input" type="text" placeholder="John Doe" />
          </div>
        </div>

        <div className="create-field">
          <label className="create-label">Country/Region</label>
          <div className="create-input-wrapper">
            <Globe />
            <select className="create-select">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>India</option>
              <option>China</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="create-field">
          <label className="create-label">Mobile Number</label>
          <div className="create-input-wrapper">
            <Phone />
            <input className="create-input" type="tel" placeholder="+1 555-0199" />
          </div>
        </div>

        <div className="create-field">
          <label className="create-label">Set Password</label>
          <div className="create-input-wrapper">
            <Lock />
            <input
              className="create-input"
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

        <div className="create-checkbox-row">
          <input
            className="create-checkbox"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span className="create-checkbox-text">
            I agree to the{" "}
            <a className="create-checkbox-link" href="#">Terms of Service</a> and{" "}
            <a className="create-checkbox-link" href="#">Privacy Policy</a>.
          </span>
        </div>

        <button className="create-btn" type="submit" onClick={()=> navigate("/People")}>Sign Up</button>
      </form>

      <div className="create-footer">
        Already have an account?{" "}
        <button className="create-footer-link" onClick={() => navigate("/Login")}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Create;

