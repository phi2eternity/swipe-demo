import React from 'react';
import style from './index.module.scss';
import profileSvg from "@assets/profile.svg";

export interface ClientCardProps{
  name: string;
  email: string;

} ;

const ClientCard = ({
                      name,
                      email,
                    }: ClientCardProps) => {
  return <div data-testid={"client-card"} className={style.clientCard}>
    <img src={profileSvg} className={style.clientCardIcon}/>
      <div className={style.clientCardColumn}>
        <h2 className={style.clientCardColumn__name}>{name}</h2>
        <h3 className={style.clientCardColumn__email}>{email}</h3>

      </div>
  </div>
}

export default ClientCard
