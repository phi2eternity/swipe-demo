import React from 'react';
import style from './index.module.scss';
import { EmployeeEntity } from '@domain/types/common/employee';
import { BranchEntity } from '@domain/types/common/branch';
import WarningBtn from '@components/buttons/warning-btn/warning-btn';
import SelectCreditCard from '@features/select-credit-card';
import ApptCard from '@components/cards/appt-card';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import TextInputFormField from '@components/inputs/text-input-form-field';


export interface PaymentPageDumbProps {
  employee: EmployeeEntity;
  branch: BranchEntity;
  date: string;
  service: string;
  onCreditCardSelect?: () => void;
  onCompleted?: (specialHandling:string) => void;
  onWarningClick?: () => void;
}


const PaymentPageDumb: React.FC<PaymentPageDumbProps> = ({
                                                           employee,
                                                           date,
                                                           service,
                                                           branch,
                                                           onCreditCardSelect,
                                                           onCompleted,
                                                           onWarningClick,
                                                         }: PaymentPageDumbProps) => {

  const [specialHandling, setSpecialHandling] = React.useState('');

  const handleSubmit = () => {
    onCompleted && onCompleted(specialHandling);
  }

  return <div className={style.paymentPage} >
    <div className={style.paymentPageContainer}>
      <WarningBtn onClick={onWarningClick} content='Some policies we would like to make you aware of.' />
      <ApptCard employee={employee} date={date} branch={branch} service={service} />

      <h3 className={style.paymentPage__header3}>Credit Card</h3>
      <SelectCreditCard onSelect={onCreditCardSelect} />
      <div style={{
        width:"100%"
      }}>
        <TextInputFormField multiline={true} onChanged={setSpecialHandling} label={"Special Handling"}/>

      </div>
    </div>


    <div className={style.paymentPageComplete}>
      <CtaPrimary content={'Complete Booking'} onClick={handleSubmit} />
    </div>

  </div>;
};


export default PaymentPageDumb;
