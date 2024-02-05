import React from "react";

type ButtonProps = {
  onClick?: () => void;
}

const BackBtn: React.FC<ButtonProps> = ({
                                          onClick = () => {
                                          },
                                        }) => {


  const svg = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19L5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  const style = {
    cursor: "pointer", transition: "all 0.2s ease-in-out", transform: "scale(1)", ":hover": {
      transform: "scale(1.1)",

    }
  }

  return <div onClick={onClick} style={style} className="back-btn">
    {svg}
  </div>

}

export default BackBtn;
