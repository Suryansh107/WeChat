import { useEffect, useState } from "react";
import { Users, MessageCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateCard from "./CreateCard";
import "./People.css";

const People = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showAddPeople, setShowAddPeople] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [userName,setUserName]=useState("");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/People?id=6');
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

        <div className="people-actions">
          <button onClick={() => setShowAddPeople(true)}>Add People</button>
          <button onClick={() => setShowCreateRoom(true)}>Create Room</button>
        </div>

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

      {showAddPeople && (
        <div className="modal-overlay" onClick={() => {
          setResult(null);
          setShowAddPeople(false)
          setUserName("");
          }}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Add People</h3>
            <input type="text" placeholder="Search by mobile number" onChange={(e)=>{
              const val=e.target.value;
              setUserName(val);
            }} />
            {result && (
              result.length === 0
                ? <p>User Not Found</p>
                : <p onClick={async()=>{
                  await axios.post('http://localhost:3000/People/AddPeople', {
                  otherUserId: result[0].id,
                  currentUserId: 6  
                });
                setShowAddPeople(false);
                setResult(null);
                }}>{result[0].name}</p>
              )}
            <button onClick={async()=>{
              try{
                const res=await axios.get(`http://localhost:3000/People/search?query=${userName}`);
                setResult(res.data)
              }catch(err){
                console.log(err);
              }
            }}>Search</button>
            
            <button onClick={async() => {
              setUserName("")
              setShowAddPeople(false)
              setResult(null)
              }
              }>Close</button>
          </div>
        </div>
      )}

      {showCreateRoom && (
        <div className="modal-overlay" onClick={() => setShowCreateRoom(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Create Room</h3>
            <input type="text" placeholder="Room name" />
            <button>Create</button>
            <button onClick={() => setShowCreateRoom(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default People;