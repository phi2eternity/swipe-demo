import TextInputFormFieldControlled from '@components/inputs/text-input-form-field-controlled';
import {useState} from 'react';
import style from './index.module.scss';

export interface ExpiryDateProps {
  onChange?: (expiryDate : string) => void;
}

export const ExpiryDate = ({onChange}:ExpiryDateProps)=>{
  const [value,setvalue] = useState<string>("");

  const onChanged = (value:string) => {
    // Check if the value is number
    if(isNaN(Number(value.replace("/","")))){
      return;
    }
    if(value.length === 2){
      value = value + "/";

    }else if(value.length >= 5){
      value = value.slice(0,5);
    }
    setvalue(value);
    onChange && onChange(value);
  }

  return <div data-testid={"expiry-date"} className={style.expiryDate}>
    <TextInputFormFieldControlled label={"Expiry Date"} value={value} type={"text"} onChanged={onChanged}/>
  </div>
}
