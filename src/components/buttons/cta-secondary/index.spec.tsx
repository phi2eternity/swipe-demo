import CtaSecondary from '@components/buttons/cta-secondary/index';
import { fireEvent, render } from '@testing-library/react';

describe('CtaSecondary', () => {
  it('should be defined', () => {
    expect(CtaSecondary).toBeDefined();
  });
  it('should render', () => {
    const { container } = render(<CtaSecondary />);
    expect(container).toMatchSnapshot();
  });

  it('should render with text', () => {
    const { container } = render(<CtaSecondary text="test" />);
    expect(container).toMatchSnapshot();
  });

  it('should render with text and onClick', () => {
    const { container } = render(<CtaSecondary text="test" onClick={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  it('when clicked should call onClick', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<CtaSecondary text="test" onClick={onClick} />);
    fireEvent.click(getByTestId('cta-secondary'));
    expect(onClick).toHaveBeenCalled();
  });


});
