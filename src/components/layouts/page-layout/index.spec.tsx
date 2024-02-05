import { render } from '@testing-library/react';
import { PageLayout } from '@components/layouts/page-layout/index';

describe('PageLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageLayout />);
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with children. Children component should be visible.', () => {
    const { getByText } = render(<PageLayout>Children</PageLayout>);
    expect(getByText('Children')).toBeTruthy();
  });
  it('should render successfully with name', () => {
    const { getByText } = render(<PageLayout name={'Name'} />);
    expect(getByText('Name')).toBeTruthy();
  });
  it('should render successfully with onClick. When clicked to svg onClick should be fired.', () => {
    const onClick = jest.fn();
    const {container} = render(<PageLayout onClick={onClick} />);
    // Select svg
    const svg = container.querySelector('svg');
    // Click svg
    svg?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onClick).toBeCalled();
  });
});
