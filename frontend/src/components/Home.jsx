import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-icon-wrapper">
        <div className="home-icon-glow" />
        <div className="home-icon-circle">
          <MessageCircle />
        </div>
      </div>

      <h1 className="home-title">WeChat</h1>
      <p className="home-subtitle">Connect with friends, anytime, anywhere</p>

      <div className="home-buttons">
        <button className="home-btn home-btn-primary" onClick={() => navigate("/Create")}>
          Create Account
        </button>
        <button className="home-btn home-btn-outline" onClick={() => navigate("/Login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
