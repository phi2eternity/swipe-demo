import React from 'react';
import TextInputFormFieldControlledDumb from '@components/inputs/text-input-form-field-controlled/index.dumb';

export interface TextInputFormFieldControlledProps {
  initialValue?: string;
  label?: string;
  onChanged?: (value: string) => void;
  disabled?: boolean;
  hidden?: boolean;
  type?: string;
  value?: string;
  setValue?: (value: string) => void;
}

const TextInputFormFieldControlled: React.FC<TextInputFormFieldControlledProps> = ({
                                                                 label,
                                                                 initialValue,
                                                                 onChanged,
                                                                 disabled,
                                                                 hidden = false,
                                                                 type,
                                                                 value,
                                                                 setValue,
                                                               }: TextInputFormFieldControlledProps) => {
  const [focused, setFocused] = React.useState<boolean>(false);
  const [hiddenstate, setHiddenState] = React.useState(hidden);

  const handleHidden = () => {
    setHiddenState(!hiddenstate);
  };

  const handleFocus = (isFocused: boolean) => {
    setFocused(isFocused);
  };

  const handleChange = (value: string) => {
    setValue && setValue(value);
    onChanged && onChanged(value);
  };

  return (
    <TextInputFormFieldControlledDumb
      disabled={disabled}
      label={label ?? 'Input'}
      focused={focused}
      onFocus={handleFocus}
      value={value}
      onChange={handleChange}
      hidden={hiddenstate}
      setHidden={handleHidden}
      type={type}
    />
  );
};

export default TextInputFormFieldControlled;
