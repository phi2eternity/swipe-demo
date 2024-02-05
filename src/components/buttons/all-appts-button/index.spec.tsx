import AllApptsButton from '@components/buttons/all-appts-button/index';
import { render } from '@testing-library/react';

describe('AllApptsButton', () => {
  it('should be defined', () => {
    expect(AllApptsButton).toBeDefined();
  });
  it('should render correctly', () => {
    const { container } = render(<AllApptsButton />);
    expect(container).toMatchSnapshot();
  });
  it('should fire onClick', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<AllApptsButton onClick={onClick} />);
    const button = getByTestId("all-appts-button");
    button.click();
    expect(onClick).toBeCalled();
  });
});
