import { useState } from 'react';
import style from './index.module.scss';
import YearPicker from '@components/inputs/year-picker';
import MonthPicker from '@components/inputs/month-picker';

export interface PetBirthDateSelectProps {
  onChange?: (date: Date) => void;
  initialDate?: Date;
}

const PetBirthDateSelect = ({
                     onChange, initialDate,
                   }: PetBirthDateSelectProps) => {

  let date = initialDate ?? new Date();

  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    onChange && onChange(new Date(newYear, month,15));
  };

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    onChange && onChange(new Date(year, newMonth,15));
  };

  return <div className={style.addPetPage__dateRow}>
    <YearPicker onChange={handleYearChange} initialYear={year} label={"Year"} />
    <MonthPicker onChange={handleMonthChange} initialMonth={month} label={"Month"}/>
  </div>;
};
export default PetBirthDateSelect;
