import React, { useMemo, useState } from 'react';
import styles from './index.module.scss';
import SelectBottomDrawer from '@components/drawers/select-bottom-drawer/select-bottom-drawer';
import { Close } from '@mui/icons-material';
import PickerCard from '@components/cards/picker-card';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import WeakBtn from '@components/buttons/weak-btn/weak-btn';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';


export interface YearPickerDumbProps {
  onChange?: (year: number) => void;
  year?: number;
  label?: string;
  onSubmit?: (year: number) => void;
  onCancel?: () => void;
}

const YearPickerDumb = ({
                       label = 'Select Year', onChange, onCancel, onSubmit, year,
                     }: YearPickerDumbProps) => {

  let initialYear: number;
  if (year !== undefined) {
    initialYear = year;
  } else {
    initialYear = new Date().getFullYear();
  }

  const [currentYear, setCurrentYear] = useState(initialYear);
  const [isOpen, setIsOpen] = useState(false);

  const selectYear = (year: number) => () => {
    setCurrentYear(year);
    onChange && onChange(year);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const goLeft = () => {
    setCurrentYear(currentYear - 12);
  }

  const goRight = () => {
    setCurrentYear(currentYear + 12);
  }

  const getYears = () => {
    const years = [];
    // Get 12 years. modulus 12 to current year. get the last 12 years
    const multiplier = Math.floor(currentYear/ 12)
    for (let i = 0; i < 12; i++) {
      years.push((multiplier * 12) + i);
    }
    return years;
  }

  const years = useMemo(getYears, [currentYear]);

  const handleSubmit = () => {
    onSubmit && onSubmit(currentYear);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel && onCancel();
  };

  return (<div data-testid={'year-picker'} className={styles.dropdownBtnTemplate} onClick={handleToggle}>
    <label
      className={(year === undefined) ? styles.dropdownBtnTemplate__label : styles.dropdownBtnTemplate__label__floating}>{label}</label>
    {(year!== undefined) ? <div data-testid={'year-picker-value'}
                                className={styles.dropdownBtnTemplate__value}>{year.toString() ?? ''}</div> : null}
    <SelectBottomDrawer open={isOpen}>
      <div data-testid={"year-picker-header"} className={styles.dropdownBtnTemplate__header}>
        <h1>{label}</h1>
        <Close onClick={handleToggle} />
      </div>
      <div style={{ height: '16px' }} />
      <div data-testid={"year-picker-flex"} className={styles.flexContainer}>
        <BiLeftArrow onClick={goLeft} />
        <div data-testid={"year-picker-grid"} className={styles.gridContainer}>
          {years.map((year) => {
            return <PickerCard key={year} onClick={selectYear(year)} title={year.toString()} selected={year === currentYear} />;
          })}
        </div>
        <BiRightArrow onClick={goRight} />
      </div>


      <div style={{ height: '32px' }} />
      <div className={styles.dropdownBtnTemplate__buttonGroup}>
        <WeakBtn content={'Cancel'} onClick={handleCancel} />
        <CtaPrimary content={'Submit'} onClick={handleSubmit}/>
      </div>
    </SelectBottomDrawer>

  </div>);
};

export default YearPickerDumb;
