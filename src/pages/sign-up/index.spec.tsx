import React, { ReactNode } from 'react';
import { render, fireEvent, screen, getByTestId, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUpPageDumb, { SignUpPageDumbProps } from './index.dumb';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('SignUpPageDumb', () => {

  let defaultProps: SignUpPageDumbProps;
  beforeEach(() => {
    defaultProps = {
      onSignUp: jest.fn(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined.', () => {
    expect(SignUpPageDumb).toBeDefined();
  });

  it('should render correctly.', () => {
    const { container } = render(<SignUpPageDumb {...defaultProps} />);
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should not call onSignUp when sign up button is clicked but first_name, last_name, email, password and password confirmed are not valid.', () => {
    const { container, getByTestId } = render(<SignUpPageDumb {...defaultProps} />);
    const signUpButton = getByTestId('cta-primary');
    fireEvent.click(signUpButton);
    expect(defaultProps.onSignUp).not.toHaveBeenCalled();
    const inputItems = container.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const firstNameInput = inputItems[0];
    const lastNameInput = inputItems[1];
    const emailInput = inputItems[2];
    const passwordInput = inputItems[3];
    const passwordConfirmInput = inputItems[4];
    act(() => {
      emailInput.focus();
      fireEvent.change(emailInput, { target: { value: 'b@b.com' } });
    });

    act(() => {
      passwordInput.focus();
      fireEvent.change(passwordInput, { target: { value: 'TestPassword*!1' } });
    });
    fireEvent.click(signUpButton);
    expect(defaultProps.onSignUp).not.toHaveBeenCalled();
  });
  it('should call onSignUp when first_name, last_name, email, password and password confirmed are valid.', () => {
    const { container, getByTestId, getAllByTestId } = render(<SignUpPageDumb {...defaultProps} />);
    const signUpButton = getByTestId('cta-primary');
    const inputItems = container.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const firstNameInput = inputItems[0];
    const lastNameInput = inputItems[1];
    const emailInput = inputItems[2];
    const passwordInput = inputItems[3];
    const passwordConfirmInput = inputItems[4];

    const firstName = 'Test';
    const lastName = 'Test';
    const email = 'b@b.com';
    const password = 'TestPassword*!1';


    act(() => {
      firstNameInput.focus();
      fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    });
    act(() => {
      lastNameInput.focus();
      fireEvent.change(lastNameInput, { target: { value: 'Test' } });
    });
    act(() => {
      emailInput.focus();
      fireEvent.change(emailInput, { target: { value: email}});
    });
    act(() => {
      passwordInput.focus();
      fireEvent.change(passwordInput, { target: { value: password } });
    });
    act(() => {
      passwordConfirmInput.focus();
      fireEvent.change(passwordConfirmInput, { target: { value: password } });
    });
    fireEvent.click(signUpButton);
    expect(defaultProps.onSignUp).toHaveBeenCalledWith(email,password,firstName,lastName);
    expect(defaultProps.onSignUp).toHaveBeenCalledTimes(1);

  });
});
