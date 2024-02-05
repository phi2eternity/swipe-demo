import React from 'react';
import { FilePickerDumb } from '@components/inputs/file-picker/index.dumb';

export interface FilePickerProps {
  label?: string;
  onChange?: (value: File) => void;
  extensions?: string[];
  multiple?: boolean;
}

export const FilePicker : React.FC<FilePickerProps> = ({
  label,
  onChange,
  extensions = [],
  multiple = false,
} : FilePickerProps) => {
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const handleChange = (value: File) => {
    setFile(value);
    onChange && onChange(value);
  }
  return <FilePickerDumb label={label} onChange={handleChange} value={file} multiple={multiple} extensions={extensions}/>;
}
