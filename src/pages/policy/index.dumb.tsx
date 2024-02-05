import React from 'react';
import style from './index.module.scss';
import secure from '@assets/security.png';
import { first ,second, third } from './index.content';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';

export interface PolicyDumpProps {
  onClick?: () => void;
}

const PolicyDumb: React.FC<PolicyDumpProps> = ({
                                                 onClick,
                                               }) => {

  return  <div className={style.policyPage}>
    <div className={style.policyPageTop}>

    <div className={style.policyPage__header}>
      <h1 className={style.policyPage__title}>Credit Card and Cancellation Policy</h1>
    </div>
    <div className={style.policyPage__image}>
      <img src={secure} alt='secure' />
    </div>
      <p className={style.policyPage__content}>
      {first}
    </p>
      <p className={style.policyPage__content}>
        {second}

      </p>
      <p className={style.policyPage__content}>
        {third}
      </p>
    <div style={{height:"16px"}}/>
    </div>
    <div className={style.policyPage__cta}>
      <CtaPrimary content={'Okay, I understand'} onClick={onClick} />

    </div>

  </div>;

};


export default PolicyDumb;
