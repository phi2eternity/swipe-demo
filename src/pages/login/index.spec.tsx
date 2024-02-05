import LoginPageDumb, { LoginPageDumbProps } from '@pages/login/index.dumb';
import { render, fireEvent, act } from '@testing-library/react';
import { ReactNode } from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }: { children: ReactNode; to: string }) => (<a href={to}>{children}</a>),
}));

describe('Login page', () => {
  let defaultProps: LoginPageDumbProps;

  beforeEach(() => {
    defaultProps = {
      onLogin: jest.fn(), onForgotPassword: jest.fn(), onLoginWithGoogle: jest.fn(), onLoginWithApple: jest.fn(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined.', () => {
    expect(LoginPageDumb).toBeDefined();
  });

  it('should render correctly.', () => {
    const onLogin = jest.fn();
    const { container } = render(<LoginPageDumb
      onLogin={onLogin}
    />);
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it('should not call onLogin when login button is clicked but email and password are not valid.', () => {
    const { container, getByTestId } = render(<LoginPageDumb {...defaultProps} />);
    const loginButton = getByTestId('cta-primary');
    fireEvent.click(loginButton);
    expect(defaultProps.onLogin).not.toHaveBeenCalled();
    const inputItems = container.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const emailInput = inputItems[0];
    const passwordInput = inputItems[1];
    fireEvent.change(emailInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.click(loginButton);
    expect(defaultProps.onLogin).not.toHaveBeenCalled();

  });
  it('should call onLogin when email and password are valid.', () => {
    const { container, getByTestId, getAllByTestId } = render(<LoginPageDumb {...defaultProps} />);
    const loginButton = getByTestId('cta-primary');

    const inputItems = container.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const emailInput = inputItems[0];
    const passwordInput = inputItems[1];
    act(() => {
      emailInput.focus();
      fireEvent.change(emailInput, { target: { value: 'b@b.com' } });
    });

    act(() => {
      passwordInput.focus();
      fireEvent.change(passwordInput, { target: { value: 'TestPassword*!1' } });
    });
    fireEvent.click(loginButton);
    expect(defaultProps.onLogin).toHaveBeenCalled();
  });

});

