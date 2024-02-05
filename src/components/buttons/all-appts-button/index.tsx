import React from 'react';
import style from './index.module.scss';
import calendarSvg from '@assets/Calendar.svg';

export interface AllApptsButtonProps {
  onClick?: () => void;
}

const AllApptsButton = ({
  onClick,
                        }:AllApptsButtonProps) => {
  return <div className={style.allApptsButton} onClick={onClick} data-testid={"all-appts-button"}>
    <img src={calendarSvg}/>
    <h2>View all appointments</h2>
  </div>
}

export default AllApptsButton
