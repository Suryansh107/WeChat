import { Users, MessageCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateCard from "./CreateCard";
import "./People.css";
const People = () => {
  const navigate = useNavigate();
  const arr = [
    { id: 1, avatar: null, name: "Suryans", mobile_no: "9233943994" },
    { id: 2, avatar: null, name: "Suryanshcc", mobile_no: "927639439" },
    
    { id: 3, avatar: null, name: "Suryans", mobile_no: "9233943994" },
    { id: 4, avatar: null, name: "Suryans", mobile_no: "9233943994" },
    { id: 5, avatar: null, name: "Suryans", mobile_no: "9233943994" },
  ];
  return (
    <div className="people-layout">
      <div className="people-sidebar">
        <button className="active" onClick={() => navigate("/People")}>
          <Users size={22} />
        </button>
        <button>
          <MessageCircle size={22} />
        </button>
        <button>
          <Settings size={22} />
        </button>
      </div>
      <div className="people-content">
        <h2 className="people-content-title">People</h2>
        <div className="people-cards-list">
          {arr.map((user) => (
            <CreateCard key={user.id} avatar={user.avatar} name={user.name} tel={user.mobile_no} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default People;