import React from "react";
import "../../../App.css";
import "./promotion-card.css";

type PromotionCardProps = {
  imageSrc: string;
  title: string;
};

const PromotionCard: React.FC<PromotionCardProps> = ({ imageSrc, title }) => {
  return (
    <div className="promotion-card">
      <div className="img-wrapper" style={{ background: "#FFE1D9" }}>
        <img
          src={imageSrc}
          alt="Promotion"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="card-heading-wrapper">
        <h3 style={{ textAlign: "center", margin: "1rem" }}>{title}</h3>
      </div>
    </div>
  );
};

export default PromotionCard;
