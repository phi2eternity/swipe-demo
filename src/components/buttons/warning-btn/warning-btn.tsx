import React from "react"
import style from "./warning-btn.module.scss"
import { BiRightArrow } from 'react-icons/bi';

export interface WarningBtnDumbProps {
  onClick?: () => void;
  content?: string;
}

const WarningBtn: React.FC<WarningBtnDumbProps> = ({ onClick, content }: WarningBtnDumbProps) => {

  // Add right arrow icon to LHS.
  return (
    <div data-testid={"warning-btn"} onClick={onClick} className={style.warningBtn}>
      <span>{content}</span>
      <div>
        <BiRightArrow className={style.warningBtn__icon}/>
      </div>
    </div>
  )
}

export default WarningBtn
