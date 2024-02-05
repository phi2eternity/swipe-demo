import React from 'react';

import style from './index.module.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export interface TextInputFormFieldControlledDumbProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  onFocus?: (focus: boolean) => void;
  focused?: boolean;
  hidden?: boolean;
  setHidden: () => void;
  type?: string;
}

const TextInputFormFieldControlledDumb: React.FC<TextInputFormFieldControlledDumbProps> =
  ({
    label,
    value,
    onChange,
    onFocus,
    focused = false,
    disabled = false,
    hidden,
    setHidden,
    type,
  }: TextInputFormFieldControlledDumbProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      !disabled && onChange && onChange(e.target.value);
    };

    const handleFocus = () => {
      !disabled && onFocus && onFocus(true);
    };

    const handleBlur = () => {
      !disabled && onFocus && onFocus(false);
    };

    const hasValue = !!value;
    let containerClass: string;
    let labelClass: string;

    if (!disabled && focused) {
      containerClass = style.textInputFormFieldControlled__active;
      labelClass = style.textInputFormFieldControlled__label__floating;
    } else if (disabled && hasValue) {
      containerClass = style.textInputFormFieldControlled__inactive;
      labelClass = style.textInputFormFieldControlled__label__floating;
    } else if (!hasValue) {
      labelClass = style.textInputFormFieldControlled__label;
      containerClass = style.textInputFormFieldControlled__inactive;
    } else {
      containerClass = style.textInputFormFieldControlled__active;
      labelClass = style.textInputFormFieldControlled__label__floating;
    }

    return (
      <div data-testid={"text-input-form-field-controlled"} onFocus={handleFocus} className={containerClass}>
        <input
          readOnly={disabled}
          onChange={handleChange}
          value={value}
          onBlur={handleBlur}
          className={style.textInputFormFieldControlled__input}
          type={hidden ? 'password' : 'text'}
          aria-label={label}
        />
        {type === 'password' &&
          (hidden ? (
            <button className={style.eyeBtn} onClick={() => setHidden()}>
              <AiOutlineEyeInvisible
                className={style.textInputFormFieldControlled__icon}
              />
            </button>
          ) : (
            <button className={style.eyeBtn} onClick={() => setHidden()}>
              <AiOutlineEye
                onClick={() => setHidden()}
                className={style.textInputFormFieldControlled__icon}
              />
            </button>
          ))}
        <label className={labelClass}>{label}</label>
      </div>
    );
  };

export default TextInputFormFieldControlledDumb;
