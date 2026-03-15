import "./People.css";
import { CircleUserRound, UsersRound, UserPlus } from "lucide-react";

const CreateCard = (props) => {
  return (
    <div className="people-card">
      <div className="people-card-avatar">
        {(props.name || "?").charAt(0).toUpperCase()}
      </div>
      <div className="people-card-info">
        <p className="people-card-name">{props.name || "Unknown"}</p>
        <p className="people-card-tel">{props.tel}</p>
      </div>
      <div className="people-card-right">
        {props.is_group && (
          <button className="people-card-add-btn" title="Add people">
            <UserPlus size={18} />
          </button>
        )}
        {props.is_group ? <UsersRound size={20} /> : <CircleUserRound size={20} />}
      </div>
    </div>
  );
};

export default CreateCard;
