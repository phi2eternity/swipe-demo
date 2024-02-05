import { render } from '@testing-library/react';
import PickerCard from '@components/cards/picker-card/index';
import style from './index.module.scss';

describe('PickerCard', () => {
  it('should render without argument', () => {
    const wrapper = render(<PickerCard />);
    expect(wrapper).toBeTruthy();
  });
  it('should render with title', () => {
    const wrapper = render(<PickerCard title="Title" />);
    expect(wrapper).toBeTruthy();
    const title = wrapper.getByText('Title');
    expect(title).toBeTruthy();
  });
  it('should render with selected', () => {
    const wrapper = render(<PickerCard selected={true} />);
    expect(wrapper).toBeTruthy();
    const selected = wrapper.getByTestId('picker-card__selected');
    expect(selected).toHaveClass(style.pickerCard__selected);
    const selectedByTestId = wrapper.getByTestId('picker-card__selected');
    expect(selectedByTestId).toBeTruthy();
  });
  it('should render with onClick and fire onClick.', () => {
    const onClick = jest.fn();
    const wrapper = render(<PickerCard onClick={onClick} />);
    expect(wrapper).toBeTruthy();
    const selected = wrapper.getByTestId('picker-card');
    expect(selected).toHaveClass(style.pickerCard);
    selected.click();
    expect(onClick).toBeCalled();
  });
});
