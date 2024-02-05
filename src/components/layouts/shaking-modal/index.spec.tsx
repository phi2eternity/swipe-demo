import ShakingModal from '@components/layouts/shaking-modal/index';
import { render } from '@testing-library/react';

describe('ShakingModal', () => {
  it('should be defined', () => {
    expect(ShakingModal).toBeDefined();
  });
  it('should render correctly when show is true.', () => {
    const { container } = render(<ShakingModal show={true} />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly when show is false.', () => {
    const { container } = render(<ShakingModal show={false} />);
    expect(container).toMatchSnapshot();
  });

});
