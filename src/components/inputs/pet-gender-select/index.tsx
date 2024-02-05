import React, { useState } from 'react';
import styles from "./index.module.scss";
import SelectBottomDrawer from '@components/drawers/select-bottom-drawer/select-bottom-drawer';
import { Close } from '@mui/icons-material';
import BtnSecondary from '@components/buttons/btn-secondary';
import masculinSvg from "@assets/masculin-dog.svg";
import femininSvg from "@assets/feminin-dog.svg";


export interface PetGenderSelectProps {
  onSelect?: (gender:string) => void;
  initialValue?: string;
}

const PetGenderSelect = <T,>({ onSelect, initialValue }: PetGenderSelectProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null> (initialValue ?? null);

  const handleSelect = (gender:string) => () => {
    setSelected(gender);
    onSelect &&  onSelect(gender);
    toggle();
  }

  const toggle = () => setIsOpen(!isOpen);


  return (<div data-testid={"pet-gender-form-field"} className={styles.dropdownBtnTemplate} onClick={toggle}>
    <label className={!selected ? styles.dropdownBtnTemplate__label : styles.dropdownBtnTemplate__label__floating}>Gender</label>
    {!!selected ? <div data-testid={"pet-gender-form-field-value"} className={styles.dropdownBtnTemplate__value}>{selected ?? ""}</div> : null }
    <SelectBottomDrawer open={isOpen}>
      <div className={styles.dropdownBtnTemplate__header}>
        <h1>Gender</h1>
        <Close onClick={toggle}/>
      </div>
      <div style={{height: "16px"}}/>
      <div className={styles.genderRow}>
        <BtnSecondary onClick={handleSelect("Male")} text={"Male"} src={masculinSvg} backgroundColor={"#DAF5FF"}/>
        <BtnSecondary onClick={handleSelect("Female")} text={"Female"} src={femininSvg} backgroundColor={"#FFCBE0"}/>

      </div>

      <div style={{height: "16px"}}/>
    </SelectBottomDrawer>

  </div>);
};

export default PetGenderSelect;
