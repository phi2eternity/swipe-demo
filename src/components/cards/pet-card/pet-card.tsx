import React from "react";
import "../../../App.css";
import "./pet-card.css";
import Avatar from "react-avatar";

interface Props {
  name: string;
  age: string;
  onClick?: () => void;
}

const PetCard: React.FC<Props> = (props: Props) => {
  const {  name, age,onClick } = props;
  return (
    <div onClick={onClick } className="pet-card">
      <div className="center-wrapper" style={{ width: "45%" }}>
        <Avatar name={name} round={true} size={"50px"} color="#DA8100" />
      </div>
      <div className="left-wrapper" style={{ width: "55%" }}>
        <h1>{name}</h1>
        <h2>{age}</h2>
      </div>
    </div>
  );
};

export default PetCard;
