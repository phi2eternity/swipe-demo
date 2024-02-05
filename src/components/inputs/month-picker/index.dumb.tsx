import React, { useState } from 'react';
import styles from './index.module.scss';
import SelectBottomDrawer from '@components/drawers/select-bottom-drawer/select-bottom-drawer';
import { Close } from '@mui/icons-material';
import { monthNames } from '@components/inputs/month-picker/index.constants';
import PickerCard from '@components/cards/picker-card';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import WeakBtn from '@components/buttons/weak-btn/weak-btn';


export interface MonthPickerDumbProps {
  onChange?: (month: number) => void;
  month?: number;
  label?: string;
  onSubmit?: (month: number) => void;
  onCancel?: () => void;
}

const MonthPickerDumb = ({
                       label = 'Select Month', onChange, onCancel, onSubmit, month,
                     }: MonthPickerDumbProps) => {

  let initialMonth: number;
  if (month !== undefined) {
    initialMonth = month;
  } else {
    initialMonth = new Date().getUTCMonth();
  }

  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [isOpen, setIsOpen] = useState(false);

  const selectMonth = (month: number) => () => {
    setCurrentMonth(month);
    onChange && onChange(month);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const formatDate = (month: number) => {
    return monthNames[month] ;
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(currentMonth);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel && onCancel();
  };

  return (<div data-testid={'month-picker'} className={styles.dropdownBtnTemplate} onClick={handleToggle}>
    <label
      className={(month === undefined) ? styles.dropdownBtnTemplate__label : styles.dropdownBtnTemplate__label__floating}>{label}</label>
    {(month!== undefined) ? <div data-testid={'month-picker-value'}
                   className={styles.dropdownBtnTemplate__value}>{formatDate(month as number) ?? ''}</div> : null}
    <SelectBottomDrawer open={isOpen}>
      <div data-testid={"month-picker-header"} className={styles.dropdownBtnTemplate__header}>
        <h1>{label}</h1>
        <Close onClick={handleToggle} />
      </div>
      <div style={{ height: '16px' }} />

      <div data-testid={"month-picker-grid"} className={styles.gridContainer}>
        {monthNames.map((month, index) => {
          return <PickerCard key={index} onClick={selectMonth(index)} title={month} selected={index === currentMonth} />;
        })}
      </div>

      <div style={{ height: '32px' }} />
      <div className={styles.dropdownBtnTemplate__buttonGroup}>
        <WeakBtn content={'Cancel'} onClick={handleCancel} />
        <CtaPrimary content={'Submit'} onClick={handleSubmit}/>
      </div>
    </SelectBottomDrawer>

  </div>);
};

export default MonthPickerDumb;
