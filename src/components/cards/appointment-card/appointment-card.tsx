import React from "react";
import "./appointment-card.module.scss";
import WeWashIcon from "../../icons/wewash-icon";

interface AppointmentCardProps {
  date: string;
  time: string;
  location: string;
  name: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  date,
  time,
  location,
  name,
}) => {
  return (
    <div
      className="appointment-card"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.1em 1.3em",

        background: "#FEFAF3",
        borderRadius: "18px",
        width: "90%",
      }}
    >
      <div style={{ flex: 2 }}>
        <h2>{date}</h2>
        <p>{time}</p>
      </div>
      <div style={{ flex: 3 }}>
        <h3>{name}</h3>
        <p>{location}</p>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WeWashIcon fill="#B5B5B5" />
      </div>
    </div>
  );
};

export default AppointmentCard;
