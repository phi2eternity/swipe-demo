import React, { useEffect, useRef, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import "../../../App.css";
import "./slot-card.css";

interface Props {
  time: string;
  availabilty: Boolean;
  width: string;
  selected?: boolean;
  onClick?: () => void;
}

const SlotCard: React.FC<Props> = ({ time,onClick, availabilty, width, selected = false }) => {
  const [color, setColor] = useState<string>();
  const [fill, setfill] = useState<string>();
  useEffect(() => {
    if (selected && availabilty) {
      setColor("white");
      setfill("white");
    } else if (availabilty) {
      setColor("black");
      setfill("#DA8100");
    } else {
      setColor("#8f9bb3");
      setfill("#8f9bb3");
    }
  }, [selected, availabilty]);
  return (
    <div
      onClick={onClick}
      className="slot-card"
      style={{
        background: selected && availabilty ? "#5ED376" : "transparent",
        width: width,
        color,
      }}
    >
      <span>{time}</span>
      <BiTimeFive size={"20px"} fill={fill} />
    </div>
  );
};

export default SlotCard;
