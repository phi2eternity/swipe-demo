import React from 'react';
import style from './index.module.scss';
import { BiLeftArrow } from 'react-icons/bi';
import BtnSecondary from '@components/buttons/btn-secondary';
import appointmentsSvg from '@assets/appt.svg';
import myPetsSvg from '@assets/my-pets.svg';
import rewardsSvg from '@assets/rewards.svg';
import helpSvg from '@assets/help.svg';
import DrawableBtn from '@components/buttons/drawable-btn';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import Mountains from '@components/layouts/mountains';
import ClientCard from '@components/cards/client-card';



export interface MyAccountDumbProps{
  onClickAppointments?: () => void;
  onClickMyPets?: () => void;
  onClickChangePassword?: () => void;
  goBack?: () => void;
  onClickLogout?: () => void;
  onClickPaymentMethods?: () => void;
  name: string;
  email: string;
}


const MyAccountDumb: React.FC<MyAccountDumbProps> = ({
  onClickAppointments,
  onClickMyPets,
  onClickChangePassword,
  goBack,
  onClickLogout,
  onClickPaymentMethods,
  name,
  email,
                                                      }) => {
return <div className={style.myAccount}>
  <div className={style.myAccountHeader}>
    <BiLeftArrow onClick={goBack}/>
    <h1>Me</h1>
    <div className={style.myAccountClientCard}>
      <ClientCard name={name} email={email}/>

    </div>
  </div>
  <Mountains top={80}/>
  <div className={style.myAccountBody}>
    <div className={style.myAccountBody__buttonGroup}>
      <BtnSecondary text={"Appointments"} src={appointmentsSvg} backgroundColor={"#FDF7C3"} onClick={onClickAppointments}/>
      <BtnSecondary text={"My Pets"} src={myPetsSvg} backgroundColor={"#F9F5EB"} onClick={onClickMyPets}/>
    </div>
    <div className={style.myAccountBody__buttonGroup}>
      <BtnSecondary text={"Rewards"} src={rewardsSvg} backgroundColor={"#ECF2FF"} />
      <BtnSecondary text={"Help"} src={helpSvg} backgroundColor={"#DAF5FF"} />
    </div>
    <DrawableBtn text={"Change Password"} onClick={onClickChangePassword}/>
    <DrawableBtn text={"My Payment Methods"} onClick={onClickPaymentMethods}/>
    <CtaPrimary content={"Logout"} onClick={onClickLogout}/>
    </div>

</div>;
};

export default MyAccountDumb
