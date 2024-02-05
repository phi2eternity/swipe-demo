import StruckCard from '@components/cards/struck-card/struck-card';
import { render } from '@testing-library/react';

describe('StruckCard', function() {
  it('should be defined', function() {
    expect(StruckCard).toBeDefined();
  });

  it('should render correctly.', function() {
    const wrapper = render(<StruckCard price={12} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with content.', function() {
    const wrapper = render(<StruckCard price={12} content={'content'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with content and struck price.', function() {
    const wrapper = render(<StruckCard price={12} content={'content'} struckPrice={10} />);
    expect(wrapper).toMatchSnapshot();

  });

  it('should render correctly with content and struck price and checked.', function() {
    const wrapper = render(<StruckCard price={12} content={'content'} struckPrice={10} checked={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with content and struck price and checked and onClick.', function() {
    const wrapper = render(<StruckCard price={12} content={'content'} struckPrice={10} checked={true} onClick={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when clicked and checked should call onClick with false.', function() {
    const onClick = jest.fn();
    const wrapper = render(<StruckCard price={12} content={'content'} struckPrice={10} checked={true} onClick={onClick} />);
    const struckCard = wrapper.getByTestId('struck-card');
    struckCard.click();
    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith(false);
  });

  it('when clicked and not checked should call onClick with true.', function() {
    const onClick = jest.fn();
    const wrapper = render(<StruckCard price={12} content={'content'} struckPrice={10} checked={false} onClick={onClick} />);
    const struckCard = wrapper.getByTestId('struck-card');
    struckCard.click();
    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith(true);
  });

});
