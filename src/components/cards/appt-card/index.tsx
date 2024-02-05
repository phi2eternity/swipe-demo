import React from 'react';
import style from './index.module.scss';
import WeWashIcon from '@components/icons/wewash-icon';
import GroomingIcon from '@components/icons/grooming-icon';
import { EmployeeEntity } from '@domain/types/common/employee';
import { BranchEntity } from '@domain/types/common/branch';

export interface ApptCardProps {
  date: string;
  employee?: EmployeeEntity;
  service?: string;
  branch: BranchEntity;
  onClick?: () => void;
  className?: string;
}

export const getShortMonthName = (date: Date) => {
  switch(date.getMonth()){
    case 0:
      return "Jan.";
    case 1:
      return "Feb.";
    case 2:
      return "Mar.";
    case 3:
      return "Apr.";
    case 4:
      return "May";
    case 5:
      return "Jun.";
    case 6:
      return "Jul.";
    case 7:
      return "Aug.";
    case 8:
      return "Sep.";
    case 9:
      return "Oct.";
    case 10:
      return "Nov.";
    case 11:
      return "Dec.";
  }
};

const ApptCard: React.FC<ApptCardProps> = ({
                                             date, employee, service, branch, onClick,className=""

                                           }: ApptCardProps) => {
  // Mar. 28 from date
  const dateObj = new Date(date);
  const month = getShortMonthName(dateObj);
  const day = dateObj.getDate();
  const dateStr = `${month} ${day < 10 ? '0' : ''}${day}`;
  const weekday = dateObj.toLocaleString('en-us', { weekday: 'short' });

  const time = dateObj.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric' });
  let employeeName = null;
  if (employee) {
    employeeName = employee.name.split(" ")[0];
  }

  const hourStr = `${time} ${weekday}`;

  return <div data-testid={"appt-card"}onClick={onClick} className={style.apptCard +" " + className}>
    <div className={style.apptCard__left}>
      <p className={style.apptCard__leftHeader}>
        {dateStr}
      </p>
      <p className={style.apptCard__leftSubheader}>
        {hourStr}
      </p>
    </div>
    <div className={style.apptCard__right}>
      <div className={style.apptCard__right__left}>
        <div className={style.apptCard__right__leftHeader}>
          {employeeName ?? "WeWash"}
        </div>
        <div className={style.apptCard__right__leftSubheader}>
          {branch.name}
        </div>
      </div>
      {service == 'WeWash' ? <WeWashIcon /> : <GroomingIcon />}
    </div>

  </div>;
};


export default ApptCard;

