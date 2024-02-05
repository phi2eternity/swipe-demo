import MonthPickerDumb from '@components/inputs/month-picker/index.dumb';
import { act, render } from '@testing-library/react';
import MonthPicker from '@components/inputs/month-picker/index';

describe('MonthPickerDumb', () => {
  it('should render without prop', () => {
    const { getByTestId } = render(<MonthPickerDumb />);
    expect(getByTestId('month-picker')).toBeInTheDocument();
  });
  it('when clicked on month picker, should open drawer', () => {
    const { getByTestId } = render(<MonthPickerDumb />);
    act(()=>getByTestId('month-picker').click());
    expect(getByTestId('month-picker-header')).toBeInTheDocument();
  });
  it('when drawer is open, should have 12 month cards', () => {
    const { getByTestId } = render(<MonthPickerDumb />);
    act(()=>getByTestId('month-picker').click());
    expect(getByTestId('month-picker-grid').children.length).toBe(12);
  });
  it('when drawer is open, should have 1 cta-primary button and 1 weak-btn button.', () => {
    const { getByTestId } = render(<MonthPickerDumb />);
    act(()=>getByTestId('month-picker').click());
    expect(getByTestId('month-picker-header').children.length).toBe(2);
    expect(getByTestId('cta-primary')).toBeInTheDocument();
    expect(getByTestId('weak-btn')).toBeInTheDocument();
  });
  it('when drawer is open, and month card is clicked, __selected element will change.', () => {
    const { getByTestId } = render(<MonthPickerDumb month={6}/>);
    act(()=>getByTestId('month-picker').click());
    const grid = getByTestId('month-picker-grid') as HTMLDivElement;
    const monthCard = grid.children[0] as HTMLDivElement;
    act(() => monthCard.click());
    const selectedCard = getByTestId('picker-card__selected');
    expect(selectedCard).toBeTruthy();
    expect(selectedCard.textContent).toBe('January');
  });
  it('when drawer is open and month card is clicked, and submit button is clicked, drawer should close and onSubmit should fire with month number.', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<MonthPickerDumb month={6} onSubmit={onSubmit}/>);
    act(()=>getByTestId('month-picker').click());
    const grid = getByTestId('month-picker-grid') as HTMLDivElement;
    const monthCard = grid.children[0] as HTMLDivElement;
    act(() => monthCard.click());
    const submitBtn = getByTestId('cta-primary');
    act(() => submitBtn.click());
    expect(onSubmit).toBeCalledWith(0);
  });
  it('when drawer is open and month card is clicked, and cancel button is clicked, drawer should close and onCancel should fire.', () => {
    const onCancel = jest.fn();
    const { getByTestId } = render(<MonthPickerDumb month={6} onCancel={onCancel}/>);
    act(()=>getByTestId('month-picker').click());
    const grid = getByTestId('month-picker-grid') as HTMLDivElement;
    const monthCard = grid.children[0] as HTMLDivElement;
    act(() => monthCard.click());
    const cancelBtn = getByTestId('weak-btn');
    act(() => cancelBtn.click());
    expect(onCancel).toBeCalled();
  });
});

describe('MonthPicker', () => {
  it('should render without prop', () => {
    const { getByTestId } = render(<MonthPicker />);
    expect(getByTestId('month-picker')).toBeInTheDocument();
  });
  it('when selected a non-selected month and onCancel is fired, month should not be changed.', () => {
    const { getByTestId } = render(<MonthPicker initialMonth={6}/>);
    act(()=>getByTestId('month-picker').click());
    const grid = getByTestId('month-picker-grid') as HTMLDivElement;
    const monthCard = grid.children[0] as HTMLDivElement;
    act(() => monthCard.click());
    const cancelBtn = getByTestId('weak-btn');
    act(() => cancelBtn.click());
    expect(getByTestId('month-picker-value').textContent).toBe('July');
  });
  it('when selected a non-selected month and onSubmit is fired, month should be changed.', () => {
    const { getByTestId } = render(<MonthPicker initialMonth={6}/>);
    act(()=>getByTestId('month-picker').click());
    const grid = getByTestId('month-picker-grid') as HTMLDivElement;
    const monthCard = grid.children[0] as HTMLDivElement;
    act(() => monthCard.click());
    const submitBtn = getByTestId('cta-primary');
    act(() => submitBtn.click());
    expect(getByTestId('month-picker-value').textContent).toBe('January');
  });
});
