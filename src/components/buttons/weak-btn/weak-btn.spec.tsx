import WeakBtn from "@components/buttons/weak-btn/weak-btn";
import {render} from "@testing-library/react";

describe('WeakBtn', () => {
  it('should be defined.', () => {
    expect(WeakBtn).toBeDefined();
  });

  it('should render correctly.', () => {
    const wrapper = render(<WeakBtn content="Test" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with onClick.', () => {
    const wrapper = render(<WeakBtn content="Test" onClick={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick should be fired when clicked.', () => {
    const onClick = jest.fn();
    const wrapper = render(<WeakBtn content="Test" onClick={onClick} />);
    wrapper.getByText('Test').click();
    expect(onClick).toBeCalled();

  });

});
