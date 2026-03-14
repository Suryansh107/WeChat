import "./People.css";
import { CircleUserRound, UsersRound  } from 'lucide-react';
const CreateCard = (props) => {
  return (
    <div className="people-card">
      <div className="people-card-avatar">
        {(props.name || "?").charAt(0).toUpperCase()}
      </div>
      <div className="people-card-info">
        <p className="people-card-name">{props.name || "Unknown"} {props.is_group ? <UsersRound/> : <CircleUserRound/>} </p>
        <p className="people-card-tel">{props.tel}</p>
      </div>
    </div>
  );
};

export default CreateCard;