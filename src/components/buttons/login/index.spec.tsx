import {LoginWithGoogle,LoginWithApple} from '@components/buttons/login/index';
import { fireEvent, render } from '@testing-library/react';

describe('LoginWithGoogle', () => {
  it('should be defined.',() => {
    expect(LoginWithGoogle).toBeDefined();
  });
  it('should render correctly.',() => {
    const { container } = render(<LoginWithGoogle onClick={() => {}} />);
    expect(container).toMatchSnapshot();
  });
  it('should fire onClick when clicked.',() => {
    const onClick = jest.fn();
    const { getByTestId } = render(<LoginWithGoogle onClick={onClick} />);
    fireEvent.click(getByTestId('login-with-button'));
    expect(onClick).toHaveBeenCalled();
  });

});

describe('LoginWithApple', () => {
  it('should be defined.',() => {
    expect(LoginWithApple).toBeDefined();
  });
  it('should render correctly.',() => {
    const { container } = render(<LoginWithApple onClick={() => {}} />);
    expect(container).toMatchSnapshot();
  });
  it('should fire onClick when clicked.',() => {
    const onClick = jest.fn();
    const { getByTestId } = render(<LoginWithApple onClick={onClick} />);
    fireEvent.click(getByTestId('login-with-button'));
    expect(onClick).toHaveBeenCalled();
  });

});
