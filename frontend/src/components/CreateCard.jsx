import "./People.css";
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
    </div>
  );
};

export default CreateCard;