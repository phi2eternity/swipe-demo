import styles from "./index.module.scss";
import style from '@components/inputs/file-picker/index.module.scss';
import React from 'react';

export interface FilePickerDumbProps {
  label?: string;
  value?: File;
  onChange?: (value: File) => void;
  multiple?: boolean;
  extensions?: string[];
}

export const FilePickerDumb = ({
  label,
  value,
  onChange,
  multiple = false,
  extensions = [],
} : FilePickerDumbProps) => {
  const hasValue = !!value;
  let containerClass: string;
  let labelClass: string;
  const { name = null } = value ?? {  };

  if(!hasValue) {
    labelClass = style.textInputFormField__label;
    containerClass = style.textInputFormField__inactive;
  } else {
    containerClass = style.textInputFormField__active;
    labelClass = style.textInputFormField__label__floating;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length === 0) return;
    else if(onChange){
      const file = e.target.files![0];
      onChange(file );
    }
  }


  const accept = extensions.join(',') || undefined;

  return <div data-testid={'file-picker'} className={containerClass}>
    <input data-testid={'file-picker-input'} className={styles.filePicker} type="file" id="file" name="file" onChange={handleChange} accept={accept} multiple={multiple} />
    {(name!== undefined) ? <div data-testid={'file-picker-value'}
                                 className={styles.dropdownBtnTemplate__value}>{name ?? ''}</div> : null}
    <label className={labelClass}>{label}</label>
  </div>
}
