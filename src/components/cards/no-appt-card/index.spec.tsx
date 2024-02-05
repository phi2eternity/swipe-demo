import NoApptCard from '@components/cards/no-appt-card/index';
import { render } from '@testing-library/react';

describe('NoApptCard', () => {
  it('should be defined', () => {
    expect(NoApptCard).toBeDefined();
  });
  it('should render without props.', () => {
    const { container } = render(<NoApptCard />);
    expect(container).toMatchSnapshot();
  });
  it('should render with onClick.', () => {
    const onClick = jest.fn();
    const { container,getByTestId } = render(<NoApptCard onClick={onClick} />);
    expect(container).toMatchSnapshot();
    const card = getByTestId("no-appt-card");
    card.click();
    expect(onClick).toBeCalled();

  });
});
