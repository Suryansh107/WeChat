import { useEffect, useState } from "react";
import { Users, MessageCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateCard from "./CreateCard";
import "./People.css";

const People = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/People?id=1');
        setUsers(res.data);
      } catch(err) {
        console.log(err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="people-layout">
      <div className="people-sidebar">
        <button className="active" onClick={() => navigate("/People")}>
          <Users size={22} />
        </button>
        <button onClick={() => navigate("/Chats")}>
          <MessageCircle size={22} />
        </button>
        <button onClick={() => navigate("/Settings")}>
          <Settings size={22} />
        </button>
      </div>
      <div className="people-content">
        <h2 className="people-content-title">People</h2>
        <div className="people-cards-list">
          {users.length === 0
            ? <p style={{ color: "gray" }}>No people found</p>
            : users.map((user) => (
                <CreateCard
                  key={user.id}
                  avatar={user.avatar}
                  name={user.name}
                  tel={user.mobile_no}
                />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default People;