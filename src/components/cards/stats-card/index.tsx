import React from 'react'
import style from './index.module.scss'

export interface StatsCardProps {
  caption?: string;
  value?: string;
}

const StatsCard = ({ caption, value }: StatsCardProps) => {
  return (
    <div className={style.statsCard}>
      <div className={style.statsCardHeader}>
        <div className={style.statsCardValue}>{value}</div>
        <div className={style.statsCardCaption}>{caption}</div>
      </div>
    </div>
  );
};

export default StatsCard
