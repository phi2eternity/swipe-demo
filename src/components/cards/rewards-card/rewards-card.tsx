import React from "react";
import PawIcon from "../../icons/paw-icon";
import "./rewards-card.css";

interface Props {
  rewardCount: number;
}

const RewardsCard: React.FC<Props> = ({ rewardCount }) => {
  return (
    <div className="rewards-card">
      <div className="rewards-left">
        <PawIcon />
        <h1>{rewardCount}</h1>
        <div className="total-scores">
          <p>Your</p>
          <p>Total Scores</p>
        </div>
      </div>
      <div className="rewards-right">
        <a className="rewards-btn">Rewards</a>
      </div>
    </div>
  );
};

export default RewardsCard;
