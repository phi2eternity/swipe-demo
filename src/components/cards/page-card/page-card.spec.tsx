import PageCard from '@components/cards/page-card/page-card';
import { render } from '@testing-library/react';

describe('PageCard', () => {

  it('should be defined.', () => {
    expect(PageCard).toBeDefined();
  });

  it('should render without props.', () => {
    const {container} = render(<PageCard/>);
    expect(container).toMatchSnapshot();
  });

  it('should render with children.', () => {
    const {container} = render(<PageCard>Page Card</PageCard>);
    expect(container).toMatchSnapshot();

  });

  it('should render with className.', () => {
    const {container} = render(<PageCard className="test-class">Page Card</PageCard>);
    expect(container).toMatchSnapshot();
  });

  it('should render with className and children.', () => {
    const {container} = render(<PageCard className="test-class">Page Card</PageCard>);
    expect(container).toMatchSnapshot();
  });

  it('should include className in the DOM.', () => {
    const {container} = render(<PageCard className="test-class">Page Card</PageCard>);
    expect(container.querySelector('.test-class')).toBeTruthy();
  });

});
