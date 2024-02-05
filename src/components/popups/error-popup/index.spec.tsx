import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorPopup, { ErrorPopupProps } from './index';

describe('ErrorPopup component', () => {
  const setMessageMock = jest.fn();

  const defaultProps: ErrorPopupProps = {
    message: 'Test error message',
    setMessage: setMessageMock,
  };

  it('should render the error message', () => {
    render(<ErrorPopup {...defaultProps} />);

    expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
  });

  it('should change the div class and call setMessage after timeout', async () => {
    jest.useFakeTimers();

    render(<ErrorPopup {...defaultProps} />);

    // Advance timers
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Check if setMessage is called with an empty string after the timeout
    expect(setMessageMock).toHaveBeenCalledWith('');

    // Clear mocks
    setMessageMock.mockClear();
    jest.useRealTimers();
  });
});
