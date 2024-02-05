import React, { useEffect, useRef } from 'react';

import style from './index.module.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export interface TextInputFormFieldDumbProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean,
  onFocus?: (focus: boolean) => void;
  focused?: boolean;
  errorMessage?: string;
  validator?: (value: string) => boolean;
  hidden?: boolean;
  setHidden: () => void;
  type?: string;
  multiline?: boolean;
}

const TextInputFormFieldDumb: React.FC<TextInputFormFieldDumbProps> = ({
                                                                         label,
                                                                         value,
                                                                         onChange,
                                                                         onFocus,
                                                                         focused = false,
                                                                         disabled = false,
                                                                         validator,
                                                                         type,
                                                                         hidden,
                                                                         setHidden,
                                                                         errorMessage,
                                                                         multiline = false,
                                                                       }: TextInputFormFieldDumbProps) => {


  const inputRef = useRef<any>(null);
  const autoResize = (textarea: HTMLTextAreaElement | HTMLInputElement) => {
    textarea.style.height = 'auto'; // Reset the height to "auto" before adjusting
    textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to match the scrollHeight
  };
  useEffect(() => {
    if (multiline && inputRef.current instanceof HTMLTextAreaElement) {
      autoResize(inputRef.current);
    }
  }, [multiline]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!disabled && onChange) {
      if (!validator || validator(e.target.value)) onChange(e.target.value);
      if (multiline) autoResize(e.target as HTMLTextAreaElement);

    }
  };

  useEffect(() => {
    if (multiline) {
      const textArea = document.querySelector('textarea');
      if (textArea) autoResize(textArea as HTMLTextAreaElement);
    }
  }, []);

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
    containerClass = style.textInputFormField__active;
    labelClass = style.textInputFormField__label__floating;
  } else if (disabled && hasValue) {
    containerClass = style.textInputFormField__inactive;
    labelClass = style.textInputFormField__label__floating;
  } else if (!hasValue) {
    labelClass = style.textInputFormField__label;
    containerClass = style.textInputFormField__inactive;
  } else {
    containerClass = style.textInputFormField__active;
    labelClass = style.textInputFormField__label__floating;
  }

  const inputType = (type === 'password' && hidden) ? 'password' : 'text';
  const InputElement = multiline ? 'textarea' : 'input';

  // @ts-ignore
  return <>
    <div data-testid={'text-input-form-field'} onFocus={handleFocus} className={containerClass}>
      <InputElement ref={inputRef}
                    readOnly={disabled} onChange={handleChange} value={value} onBlur={handleBlur}
                    className={style.textInputFormField__input} type={inputType} />
      {type === 'password' && (hidden ? (
        <button data-testid={'text-input-form-field-show-button'} className={style.eyeBtn} onClick={() => setHidden()}>
          <AiOutlineEye
            onClick={() => setHidden()}
            className={style.textInputFormFieldControlled__icon}
          />
        </button>) : (
        <button data-testid={'text-input-form-field-hide-button'} className={style.eyeBtn} onClick={() => setHidden()}>
          <AiOutlineEyeInvisible
            className={style.textInputFormFieldControlled__icon}
          />
        </button>))}
      <label className={labelClass}>{label}</label>
    </div>
    {errorMessage && <div className={style.textInputFormField__error}>{errorMessage}</div>}
  </>;


};

export default TextInputFormFieldDumb;
