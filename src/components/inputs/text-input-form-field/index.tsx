import React from 'react';
import TextInputFormFieldDumb from '@components/inputs/text-input-form-field/index.dumb';


export interface TextInputFormFieldProps {
  initialValue?: string;
  label?: string;
  onChanged?: (value: string) => void;
  disabled?: boolean,
  type?: string;
  errorMessage?: string;
  validator?: (value: string) => boolean;
  capitalized?: boolean;
  lower?: boolean;
  upper?: boolean;
  multiline?: boolean;
}

const TextInputFormField: React.FC<TextInputFormFieldProps> = ({
   errorMessage,
   validator,
   label,
   initialValue,
   onChanged,
   disabled,
   multiline = false,
   lower = false,
   upper = false,
   capitalized = false,
   type = 'text',
 }: TextInputFormFieldProps) => {

  if ((lower && upper) || (lower && capitalized) || (upper && capitalized)) {
    throw new Error('Only one of the lower, upper, capitalized can be true');
  }

  if (validator && initialValue && !validator(initialValue)) {
    initialValue = '';
  }

  const [value, setValue] = React.useState<string>(initialValue || '');
  const [focused, setFocused] = React.useState<boolean>(false);
  const [hiddenState, setHiddenState] = React.useState(type === 'password');

  const handleHidden = () => {
    setHiddenState(!hiddenState);
  };

  const handleFocus = (isFocused: boolean) => {
    setFocused(isFocused);
  };

  const handleChange = (value: string) => {
    if (capitalized) {
      value = value.toLowerCase();
      value = value.replace(/(^|\s)[\p{Ll}]/gu, (match) => match.toUpperCase());
    }
    if (lower) {
      value = value.toLowerCase();
    }
    if (upper) {
      value = value.toUpperCase();
    }
    setValue(value);
    onChanged && onChanged(value);
  };

  return <TextInputFormFieldDumb disabled={disabled} label={label ?? 'Input'} focused={focused} onFocus={handleFocus}
                                 type={type} hidden={hiddenState}
                                 setHidden={handleHidden}
                                 errorMessage={errorMessage}
                                 multiline={multiline}
                                 validator={validator}
                                 value={value} onChange={handleChange} />;
};

export default TextInputFormField;
