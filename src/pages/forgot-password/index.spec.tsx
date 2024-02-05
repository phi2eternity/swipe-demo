import React, { ReactNode } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ForgotPasswordPageDumb from './index.dumb';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));
describe('ForgotPasswordPageDumb', () => {
  it('should be defined', () => {
    expect(ForgotPasswordPageDumb).toBeDefined();
  });

  it('should render correctly', () => {
    const setEmailValue = jest.fn();
    const onForgotPassword = jest.fn();
    const { container } = render(
      <ForgotPasswordPageDumb
        setEmailValue={setEmailValue}
        onForgotPassword={onForgotPassword}
        emailValue=""
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should handle email input change', () => {
    const setEmailValue = jest.fn();
    const onForgotPassword = jest.fn();
    const { getByLabelText } = render(
      <ForgotPasswordPageDumb
        setEmailValue={setEmailValue}
        onForgotPassword={onForgotPassword}
        emailValue=""
      />,
    );

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    expect(setEmailValue).toHaveBeenCalledWith('test@example.com');
  });

  it('should call onForgotPassword when the button is clicked', () => {
    const setEmailValue = jest.fn();
    const onForgotPassword = jest.fn();
    const { getByText } = render(
      <ForgotPasswordPageDumb
        setEmailValue={setEmailValue}
        onForgotPassword={onForgotPassword}
        emailValue=""
      />,
    );

    fireEvent.click(getByText('Forgot Password'));
    expect(onForgotPassword).toHaveBeenCalled();
  });
});
