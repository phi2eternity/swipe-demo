const logoutMock = jest.fn();
const navigateMock = jest.fn();
jest.mock('@hooks/use-logout', () => ({
  useLogout: () =>  logoutMock,
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,

}));
import { LogoutPage } from '@pages/logout';
import { render } from '@testing-library/react';
import { RouteNames } from '@quicker/route-names';

describe('Logout', () => {
  it('should be rendered.', () => {
    const wrapper = render(<LogoutPage />);
    expect(wrapper).toBeTruthy();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should call useLogout', () => {
    render(<LogoutPage />);
    expect(logoutMock).toBeCalled();
  });
  it('should call useNavigate with RouteNames.LOGIC', () => {
    render(<LogoutPage />);
    expect(navigateMock).toBeCalled();
    expect(navigateMock).toBeCalledWith(RouteNames.LOGIN);
  });
});
