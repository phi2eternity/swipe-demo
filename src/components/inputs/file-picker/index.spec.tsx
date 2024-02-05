import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FilePicker, FilePickerProps } from './index';

describe('FilePicker', () => {
  const defaultProps: FilePickerProps = {
    label: 'Upload file',
    onChange: jest.fn(),
  };
  const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
  const renderComponent = (props: FilePickerProps) => {
    return render(<FilePicker {...props} />);
  };

  beforeEach(() => {
    renderComponent(defaultProps);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render label', () => {
    expect(screen.getByText('Upload file')).toBeInTheDocument();
  });
  it('should call onChange when a file is selected', () => {

    const input = screen.getByTestId('file-picker-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(file);
  });
  it('should not call onChange when no file is selected', () => {
    const input = screen.getByTestId('file-picker-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [] } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(0);
  });
  it('should render file name when a file is selected', () => {
    const input = screen.getByTestId('file-picker-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByTestId('file-picker-value')).toHaveTextContent('chucknorris.png');
  });
});
