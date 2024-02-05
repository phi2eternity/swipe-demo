import React from "react";
import "../../../App.css";
import style from "./index.module.scss";
import Avatar from "react-avatar";

interface PetCardProps {
  name: string;
  age: string;
  onClick?: () => void;
  expired?: boolean;
}

const PetCard: React.FC<PetCardProps> = (props: PetCardProps) => {
  const {  name, age,onClick, expired = false } = props;
  return (
    <div data-testid={"pet-card"} onClick={onClick } className={style.petCard}>
      <div className="center-wrapper" style={{ width: "45%" }}>
        <Avatar name={name} round={true} size={"50px"} color="#DA8100" />
      </div>
      <div className="left-wrapper" style={{ width: "55%" }}>
        <h1>{name}</h1>
        <h2>{age}</h2>
      </div>
      { expired && <div data-testid={"pet-card-vaccine-expired"} className={style.vaccineExpired}>
        Expired
      </div>}
    </div>
  );
};

export default PetCard;
