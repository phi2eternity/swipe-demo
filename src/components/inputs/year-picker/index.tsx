import YearPickerDumb from '@components/inputs/year-picker/index.dumb';
import { useState } from 'react';

export interface YearPickerProps {
  onChange?: (month: number) => void;
  initialYear ?: number;
  label?: string;
}

const YearPicker = ({
                        onChange, initialYear,label = "Select Year"
}: YearPickerProps) => {
  const [currentYear, setCurrentYear] = useState(initialYear ?? 0);

  const setYear = (month: number)  => {
    setCurrentYear(month);
    onChange && onChange(month);
  };

  return <YearPickerDumb year={currentYear} onSubmit={setYear} label={label}/>;
};

export default YearPicker
