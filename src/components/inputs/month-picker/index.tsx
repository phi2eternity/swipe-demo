import MonthPickerDumb from '@components/inputs/month-picker/index.dumb';
import { useState } from 'react';

export interface MonthPickerProps {
  onChange?: (month: number) => void;
  initialMonth ?: number;
  label?: string;
}

const MonthPicker = ({
                        onChange, initialMonth,label = "Select Month"
}: MonthPickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth ?? 0);

  const selectMonth = (month: number)  => {
    setCurrentMonth(month);
    onChange && onChange(month);
  };

  return <MonthPickerDumb month={currentMonth} onSubmit={selectMonth} label={label}/>;
};

export default MonthPicker
