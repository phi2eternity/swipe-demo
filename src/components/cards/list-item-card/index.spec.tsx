import { ListItemCard } from '@components/cards/list-item-card/index';
import { render } from '@testing-library/react';

describe('ListItemCard', () => {
  it('should be defined', () => {
    expect(ListItemCard).toBeDefined();
  });

  it('should render empty.', () => {
    const wrapper = render(<ListItemCard />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with label and value.', () => {
    const wrapper = render(<ListItemCard label="Label" value="Value" />);
    expect(wrapper).toMatchSnapshot();
  });

});
