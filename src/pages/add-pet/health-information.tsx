import { useState } from 'react';
import style from './index.module.scss';
import YearPicker from '@components/inputs/year-picker';
import MonthPicker from '@components/inputs/month-picker';
import { FilePicker } from '@components/inputs/file-picker';

export interface HealthInformationProps {
  onExpirationChange?: (date: Date) => void;
  initialDate?: Date;
  onProofChange?: (file: File) => void;
}

export const HealthInformation = ({
                              onExpirationChange, initialDate,onProofChange
                            }: HealthInformationProps) => {

  let date = initialDate ?? new Date();

  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [proof, setProof] = useState<File | undefined>(undefined);

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    onExpirationChange && onExpirationChange(new Date(newYear, month,15));
  };

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    onExpirationChange && onExpirationChange(new Date(year, newMonth,15));
  };

  const handleProofChange = (newProof: File) => {
    setProof(newProof);
    onProofChange && onProofChange(newProof);
  }

  return <div className={style.addPetPage__subForm}>
    <div className={style.addPetPage__dateRow}>
      <YearPicker onChange={handleYearChange} initialYear={year} label={"Vaccination Exp. Year"} />
      <MonthPicker onChange={handleMonthChange} initialMonth={month} label={"Vaccination Exp. Month"}/>
    </div>
    <div className={style.addPetPage__dateRow}>
      <FilePicker label={"Rabies Vaccine Proof"} onChange={handleProofChange} extensions={[
        ".pdf",
        ".jpg",
        ".jpeg",
        ".png",
      ]}/>
    </div>
  </div>;
};
