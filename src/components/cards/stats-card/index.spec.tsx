import StatsCard from '@components/cards/stats-card/index';
import { render } from '@testing-library/react';
import { faker } from '@faker-js/faker';

describe('StatsCard', () => {
  it('should be defined', () => {
    expect(StatsCard).toBeDefined();
  });
  it('should render correctly', () => {
    const { container } = render(<StatsCard caption="Caption" value="Value" />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with long caption', () => {
    const { container } = render(<StatsCard caption={faker.lorem.paragraphs(5)} value="Value" />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with long value', () => {
    const { container } = render(<StatsCard caption="Caption" value={faker.lorem.paragraphs(5)} />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with long caption and long value', () => {
    const { container } = render(<StatsCard caption={faker.lorem.paragraphs(5)} value={faker.lorem.paragraphs(5)} />);
    expect(container).toMatchSnapshot();
  });
  it('should render empty. No caption and no value', () => {
    const { container } = render(<StatsCard />);
    expect(container).toMatchSnapshot();
  });
});
