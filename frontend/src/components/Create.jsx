import { useNavigate } from "react-router-dom";
import { MessageCircle, User, Phone, Lock, Eye, EyeOff, ChevronLeft, Globe } from "lucide-react";
import { useState } from "react";
import "./Create.css";

const Create = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [fullName,setfullName]=useState("");
  const [password,setPassword]=useState("");
  const [telephone,setTelephone]=useState("");
  const [users, setUsers] = useState([]);
  const [nameError, setNameError] = useState("");
  const [telError, setTelError] = useState("");
  const [passError, setPassError] = useState("");
  const [country, setCountry] = useState("India");
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

      <form className="create-form" onSubmit={(e) => {
        e.preventDefault();
        if(!agreed){
          alert("Accept T&C");
          return;
        }
        navigate("/People");
        const newUser = {
          fullName: fullName,
          password: password,
          telephone: telephone,
          country:country
        };
        console.log(newUser);
        setUsers([...users, newUser]);

        setfullName("");
        setPassword("");
        setTelephone("");
        }}>
        <div className="create-field">
          <label className="create-label">Full Name</label>
          <div className="create-input-wrapper">
            <User />
            <input className="create-input" type="text" placeholder="John Doe" onChange={(event)=>{
              setfullName(event.target.value);
            }} required/>
          </div>
        </div>

        <div className="create-field">
          <label className="create-label">Country/Region</label>
          <div className="create-input-wrapper">
            <Globe />
            <select className="create-select" onChange={(e) => setCountry(e.target.value)}>
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
            <input className="create-input" type="tel" placeholder="+1 555-0199" pattern="[0-9]{10}" onChange={(e)=>{
              const val=e.target.value;
              setTelephone(val);
              if(!/^\d+$/.test(val)) setTelError("Only numbers allowed");
              else if(val.length !== 10) setTelError("Must be 10 digits");
              else setTelError("");
            }} required/>
          </div>
          {telError && <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{telError}</p>}
        </div>

        <div className="create-field">
          <label className="create-label">Set Password</label>
          <div className="create-input-wrapper">
            <Lock />
            <input
              className="create-input"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••" 
              minLength="8"
              onChange={(e)=>{
                const val = e.target.value;
                setPassword(val);
                if(val.length < 8) setPassError("Password must be at least 8 characters");
                else setPassError("");
              }}
              required
            />
            <button
              type="button"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {passError && <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{passError}</p>}
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

        <button className="create-btn" type="submit" >Sign Up</button>
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

