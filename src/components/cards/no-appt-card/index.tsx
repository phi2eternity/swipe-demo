import React from 'react';
import style from './index.module.scss';
import calendarSvg from '@assets/Calendar.svg';

export interface NoApptCardProps {
  onClick?: () => void;
}

const NoApptCard = ({
  onClick,
                    }:NoApptCardProps) => {
  return <div className={style.noApptCard} onClick={onClick} data-testid={"no-appt-card"}>
    <img src={calendarSvg}/>
    <div className={style.noApptCardColumn}>
      <h2>Sorry</h2>
      <h3>You do not have a reservation yet</h3>
    </div>
  </div>
}

export default NoApptCard
