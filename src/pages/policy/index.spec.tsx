import PolicyDumb from '@pages/policy/index.dumb';
import { render } from '@testing-library/react';

describe('PolicyDumb', () => {
  it('should be defined.', () => {
    expect(PolicyDumb).toBeDefined();
  });

  it('should render correctly.', () => {
    const { container } = render(<PolicyDumb />);
    expect(container).toMatchSnapshot();
  });

  it('should fire onClick when clicked.', () => {
    const onClick = jest.fn();
    const { getByText } = render(<PolicyDumb onClick={onClick} />);
    getByText('Okay, I understand').click();
    expect(onClick).toHaveBeenCalled();
  });

});
