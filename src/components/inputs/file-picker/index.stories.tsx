/*
import styles from "./index.module.scss";
import style from '@components/inputs/text-input-form-field/index.module.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import React from 'react';

export interface FilePickerDumbProps {
  label?: string;
  value?: File;
  onChange?: (value: File) => void;
}

export const FilePickerDumb = ({
  label,
  value,
  onChange,
} : FilePickerDumbProps) => {
  const hasValue = !!value;
  let containerClass: string;
  let labelClass: string;

  if(!hasValue) {
    labelClass = style.textInputFormField__label;
    containerClass = style.textInputFormField__inactive;
  } else {
    containerClass = style.textInputFormField__active;
    labelClass = style.textInputFormField__label__floating;
  }

  return <div data-testid={'file-picker'} className={containerClass}>

    <label className={labelClass}>{label}</label>
  </div>
}

 */

// Path: src/components/inputs/file-picker/index.stories.tsx
import { Story, Meta } from '@storybook/react';
import { FilePickerDumb, FilePickerDumbProps } from './index.dumb';
import React, { useState } from 'react';

export default {
  title: 'Components/Inputs/FilePicker', component: FilePickerDumb,
};

const Template: Story<FilePickerDumbProps> = (args) => {
  const [value, setValue] = useState<File>();

  return <FilePickerDumb {...args} value={value} onChange={setValue} />;
};


export const Default = Template.bind({});
Default.args = {
  label: 'File Picker',
};

export const WithPngExtension = Template.bind({});
WithPngExtension.args = {
  label: 'File Picker',
  extensions: ['.png'],
};

export const WithMultipleFiles = Template.bind({});
WithMultipleFiles.args = {
  label: 'File Picker',
  multiple: true,
}
