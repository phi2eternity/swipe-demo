import Mountains from '@components/layouts/mountains/index';
import { render } from '@testing-library/react';

describe('Mountains', () => {
  it('should be defined', () => {
    expect(Mountains).toBeDefined();
  });
  it('should render correctly', () => {
    const { container } = render(<Mountains />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with top', () => {
    const { container } = render(<Mountains top={32} />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with left', () => {
    const { container } = render(<Mountains left={32} />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with right', () => {
    const { container } = render(<Mountains right={32} />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with bottom', () => {
    const { container } = render(<Mountains bottom={32} />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with top and left', () => {
    const { container } = render(<Mountains top={32} left={32} />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with top and right', () => {
    const { container } = render(<Mountains top={32} right={32} />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with bottom and right.', () => {
    const { container } = render(<Mountains bottom={32} right={32} />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with bottom and left.', () => {
    const { container } = render(<Mountains bottom={32} left={32} />);
    expect(container).toMatchSnapshot();
  });
});
