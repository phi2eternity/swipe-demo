import React from "react";
import style from "./index.module.scss";
import { BiRightArrow } from 'react-icons/bi';

export interface DrawableBtnProps {
  onClick?: () => void;
  text: string;
}

const DrawableBtn: React.FC<DrawableBtnProps> = ({ onClick, text }) => {

  return <div className={style.drawableBtn} onClick={onClick}>
    <label>{text}</label>
    <BiRightArrow/>
  </div>
};

export default DrawableBtn;
