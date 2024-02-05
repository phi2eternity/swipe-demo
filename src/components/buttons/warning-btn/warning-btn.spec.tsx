import WarningBtn from '@components/buttons/warning-btn/warning-btn';
import { render } from '@testing-library/react';

describe('Warning Button', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should render', () => {
    expect(WarningBtn).toBeTruthy();
  });
  it('should render with default props', () => {
    const wrapper = render(<WarningBtn />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with custom props', () => {
    const wrapper = render(<WarningBtn content="Warning Button" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should fire onClick event', () => {
    const onClick = jest.fn();
    const wrapper = render(<WarningBtn onClick={onClick} />);
    const button = wrapper.getByTestId('warning-btn');
    button.click();
    expect(onClick).toHaveBeenCalled();
    for(let i = 0; i < 10; i++) {
      button.click();
    }
    expect(onClick).toHaveBeenCalledTimes(11);
  });
  it('should change style on hover.', () => {
    const wrapper = render(<WarningBtn />);
    const button = wrapper.getByTestId('warning-btn');
    button.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  });

});
