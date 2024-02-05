import React from 'react';
import style from './index.module.scss';
import WeWashIcon from '@components/icons/wewash-icon';
import GroomingIcon from '@components/icons/grooming-icon';
import { EmployeeEntity } from '@domain/types/common/employee';
import { BranchEntity } from '@domain/types/common/branch';
import { getShortMonthName } from '@components/cards/appt-card/index';

export interface ApptCardProps {
  date: string;
  employee?: EmployeeEntity;
  service?: string;
  branch: BranchEntity;
  onClick?: () => void;
}



const ApptCardCancelled: React.FC<ApptCardProps> = ({
                                                      date, employee, service, branch, onClick

                                                    }: ApptCardProps) => {
  // Mar. 28 from date
  const dateObj = new Date(date);
  const month = getShortMonthName(dateObj);
  const day = dateObj.getDate();

  const dateStr = `${month} ${day < 10 ? '0' : ''}${day}`;
  const weekday = dateObj.toLocaleString('en-us', { weekday: 'short' });
  // 05.00 PM from date
  // Other than 'numeric'
  const time = dateObj.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric' });

  let employeeName = null;
  if (employee) {
    employeeName = employee.name.split(" ")[0];
  }

  const hourStr = `${time} ${weekday}`;

  return <div data-testid={"appt-card-cancelled"} onClick={onClick} className={style.apptCard__cancelled}>
    <div className={style.apptCard__left__cancelled}>
      <h3 className={style.apptCard__leftHeader__cancelled}>
        {dateStr}
      </h3>
      <h4 className={style.apptCard__leftSubheader__cancelled}>
        {hourStr}
      </h4>
    </div>
    <div className={style.apptCard__right}>
      <div className={style.apptCard__right__left}>
        <div className={style.apptCard__leftRow}>
          <h3  className={style.apptCard__leftHeader}>{employeeName ?? "WeWash"}</h3>
          <div className={style.apptCard__leftCard__cancelled}>
            <p>Cancelled</p>
          </div>
        </div>
        <h4 className={style.apptCard__leftSubheader}>
          {branch.name}
        </h4>
      </div>

      {service == 'WeWash' ? <WeWashIcon /> : <GroomingIcon />}
    </div>

  </div>;
};


export default ApptCardCancelled;

