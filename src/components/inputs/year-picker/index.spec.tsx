import YearPickerDumb from '@components/inputs/year-picker/index.dumb';
import { act, fireEvent, render } from '@testing-library/react';
import YearPicker from '@components/inputs/year-picker/index';

describe('YearPickerDumb', () => {
  it('should render without prop', () => {
    const { getByTestId } = render(<YearPickerDumb />);
    expect(getByTestId('year-picker')).toBeInTheDocument();
  });
  it('when clicked on year picker, should open drawer', () => {
    const { getByTestId } = render(<YearPickerDumb />);
    act(()=>getByTestId('year-picker').click());
    expect(getByTestId('year-picker-header')).toBeInTheDocument();
  });
  it('when drawer is open, should have 12 year cards', () => {
    const { getByTestId } = render(<YearPickerDumb />);
    act(()=>getByTestId('year-picker').click());
    expect(getByTestId('year-picker-grid').children.length).toBe(12);
  });
  it('when drawer is open, should have 1 cta-primary button and 1 weak-btn button.', () => {
    const { getByTestId } = render(<YearPickerDumb />);
    act(()=>getByTestId('year-picker').click());
    expect(getByTestId('year-picker-header').children.length).toBe(2);
    expect(getByTestId('cta-primary')).toBeInTheDocument();
    expect(getByTestId('weak-btn')).toBeInTheDocument();
  });
  it('when drawer is open, and year card is clicked, __selected element will change.', () => {
    const { getByTestId } = render(<YearPickerDumb year={6} />);
    act(()=>getByTestId('year-picker').click());
    const grid = getByTestId('year-picker-grid') as HTMLDivElement;
    const yearCard = grid.children[0] as HTMLDivElement;
    act(() => yearCard.click());
    const selectedCard = getByTestId('picker-card__selected');
    expect(selectedCard).toBeTruthy();
    expect(selectedCard.textContent).toBe('0');
  });
  it('when drawer is open and year card is clicked, and submit button is clicked, drawer should close and onSubmit should fire with year number.', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<YearPickerDumb year={6} onSubmit={onSubmit} />);
    act(()=>getByTestId('year-picker').click());
    const grid = getByTestId('year-picker-grid') as HTMLDivElement;
    const yearCard = grid.children[0] as HTMLDivElement;
    act(() => yearCard.click());
    const submitBtn = getByTestId('cta-primary');
    act(() => submitBtn.click());
    expect(onSubmit).toBeCalledWith(0);
  });
  it('when drawer is open and year card is clicked, and cancel button is clicked, drawer should close and onCancel should fire.', () => {
    const onCancel = jest.fn();
    const { getByTestId } = render(<YearPickerDumb year={6} onCancel={onCancel} />);
    act(()=>getByTestId('year-picker').click());
    const grid = getByTestId('year-picker-grid') as HTMLDivElement;
    const yearCard = grid.children[0] as HTMLDivElement;
    act(() => yearCard.click());
    const cancelBtn = getByTestId('weak-btn');
    act(() => cancelBtn.click());
    expect(onCancel).toBeCalled();
  });
  it('when drawer is open, go left is clicked and submit button is clicked year goes back 12 years.', () => {
    const onSubmit = jest.fn();
    const { getByTestId, container } = render(<YearPickerDumb year={6} onSubmit={onSubmit} />);
    act(() => getByTestId('year-picker').click());
    const flex = getByTestId('year-picker-flex') as HTMLDivElement;
    const goLeft = flex.children[0] as HTMLElement;
    act(() => fireEvent.click(goLeft));
    const submitBtn = getByTestId('cta-primary');
    act(() => submitBtn.click());
    expect(onSubmit).toBeCalledWith(-6);
  });
  it('when drawer is open, go right is clicked and submit button is clicked year goes forward 12 years.', () => {
    const onSubmit = jest.fn();
    const { getByTestId, container } = render(<YearPickerDumb year={6} onSubmit={onSubmit} />);
    act(() => getByTestId('year-picker').click());
    const flex = getByTestId('year-picker-flex') as HTMLDivElement;
    const goRight = flex.children[2] as HTMLElement;
    act(() => fireEvent.click(goRight));
    const submitBtn = getByTestId('cta-primary');
    act(() => submitBtn.click());
    expect(onSubmit).toBeCalledWith(18);
  });
  it('when drawer is open, go left is clicked 4 times and submit button is clicked year goes back 48 years.', () => {
    const onSubmit = jest.fn();
    const { getByTestId, container } = render(<YearPickerDumb year={6} onSubmit={onSubmit} />);
    act(() => getByTestId('year-picker').click());
    const flex = getByTestId('year-picker-flex') as HTMLDivElement;
    const goLeft = flex.children[0] as HTMLElement;
    act(() => fireEvent.click(goLeft));
    act(() => fireEvent.click(goLeft));
    act(() => fireEvent.click(goLeft));
    act(() => fireEvent.click(goLeft));
    const submitBtn = getByTestId('cta-primary');
    act(() => submitBtn.click());
    expect(onSubmit).toBeCalledWith(-42);
  });
  it('when drawer is open, go right is clicked 4 times and submit button is clicked year goes forward 48 years.', () => {
    const onSubmit = jest.fn();
    const { getByTestId, container } = render(<YearPickerDumb year={6} onSubmit={onSubmit} />);
    act(() => getByTestId('year-picker').click());
    const flex = getByTestId('year-picker-flex') as HTMLDivElement;
    const goRight = flex.children[2] as HTMLElement;
    act(() => fireEvent.click(goRight));
    act(() => fireEvent.click(goRight));
    act(() => fireEvent.click(goRight));
    act(() => fireEvent.click(goRight));
    const submitBtn = getByTestId('cta-primary');
    act(() => submitBtn.click());
    expect(onSubmit).toBeCalledWith(54);
  });
  it('when drawer is open, go left is clicked 5 times and cancel button clicked year should not change.', () => {
    const onCancel = jest.fn();
    const { getByTestId, container } = render(<YearPickerDumb year={6} onCancel={onCancel} />);
    act(() => getByTestId('year-picker').click());
    const flex = getByTestId('year-picker-flex') as HTMLDivElement;
    const goLeft = flex.children[0] as HTMLElement;
    act(() => fireEvent.click(goLeft));
    const cancelBtn = getByTestId('weak-btn');
    act(() => fireEvent.click(cancelBtn));
    expect(onCancel).toBeCalled();
    const value = getByTestId('year-picker-value');
    expect(value.textContent).toBe('6');
  });
  it('when drawer is open, go right is clicked 5 times and cancel button clicked year should not change.', () => {
    const onCancel = jest.fn();
    const { getByTestId, container } = render(<YearPickerDumb year={6} onCancel={onCancel} />);
    act(() => getByTestId('year-picker').click());
    const flex = getByTestId('year-picker-flex') as HTMLDivElement;
    const goRight = flex.children[2] as HTMLElement;
    act(() => fireEvent.click(goRight));
    const cancelBtn = getByTestId('weak-btn');
    act(() => fireEvent.click(cancelBtn));
    expect(onCancel).toBeCalled();
    const value = getByTestId('year-picker-value');
    expect(value.textContent).toBe('6');
  });

});

describe('YearPicker', () => {
  it('should render without prop', () => {
    const { getByTestId } = render(<YearPicker />);
    expect(getByTestId('year-picker')).toBeInTheDocument();
  });
  it('when selected a non-selected year and onCancel is fired, year should not be changed.', () => {
    const { getByTestId } = render(<YearPicker initialYear={6} />);
    act(()=>getByTestId('year-picker').click());
    const grid = getByTestId('year-picker-grid') as HTMLDivElement;
    const yearCard = grid.children[0] as HTMLDivElement;
    act(() => yearCard.click());
    const cancelBtn = getByTestId('weak-btn');
    act(() => cancelBtn.click());
    expect(getByTestId('year-picker-value').textContent).toBe('6');
  });
  it('when selected a non-selected year and onSubmit is fired, year should be changed.', () => {
    const { getByTestId } = render(<YearPicker initialYear={6} />);
    act(()=>getByTestId('year-picker').click());
    const grid = getByTestId('year-picker-grid') as HTMLDivElement;
    const yearCard = grid.children[0] as HTMLDivElement;
    act(() => yearCard.click());
    const submitBtn = getByTestId('cta-primary');
    act(() => submitBtn.click());
    expect(getByTestId('year-picker-value').textContent).toBe('0');
  });
  it('when clicked to go left five times and cancel button is clicked, year should not change.', () => {
    const { getByTestId } = render(<YearPicker initialYear={6} />);
    act(()=>getByTestId('year-picker').click());
    const flex = getByTestId('year-picker-flex') as HTMLDivElement;
    const goLeft = flex.children[0] as HTMLElement;
    const numberOfClicks = 5;
    for (let i = 0; i < numberOfClicks; i++) {
      act(() => fireEvent.click(goLeft));
    }
    const cancelBtn = getByTestId('weak-btn');
    act(() => fireEvent.click(cancelBtn));
    expect(getByTestId('year-picker-value').textContent).toBe('6');
  });
  it('when clicked to go right five times and cancel button is clicked, year should not change.', () => {
    const initialYear = 6;
    const { getByTestId } = render(<YearPicker initialYear={initialYear} />);
    act(()=>getByTestId('year-picker').click());
    const flex = getByTestId('year-picker-flex') as HTMLDivElement;
    const goRight = flex.children[2] as HTMLElement;
    const numberOfClicks = 5;
    for (let i = 0; i < numberOfClicks; i++) {
      act(() => fireEvent.click(goRight));
    }
    const cancelBtn = getByTestId('weak-btn');
    act(() => fireEvent.click(cancelBtn));
    expect(getByTestId('year-picker-value').textContent).toBe('6');
  });
  it('when clicked to go left five times and submit button is clicked, year should change.', () => {
    const initialYear = 6;
    const { getByTestId } = render(<YearPicker initialYear={6} />);
    act(()=>getByTestId('year-picker').click());
    const flex = getByTestId('year-picker-flex') as HTMLDivElement;
    const goLeft = flex.children[0] as HTMLElement;
    const numberOfClicks = 5;
    for (let i = 0; i < numberOfClicks; i++) {
      act(() => fireEvent.click(goLeft));
    }
    const submitBtn = getByTestId('cta-primary');
    act(() => fireEvent.click(submitBtn));
    expect(getByTestId('year-picker-value').textContent).toBe((initialYear - numberOfClicks * 12).toString());
  });
  it('when clicked to go right five times and submit button is clicked, year should change.', () => {
    const initialYear = 6;
    const { getByTestId } = render(<YearPicker initialYear={6} />);
    act(()=>getByTestId('year-picker').click());
    const flex = getByTestId('year-picker-flex') as HTMLDivElement;
    const goRight = flex.children[2] as HTMLElement;
    const numberOfClicks = 5;
    for (let i = 0; i < numberOfClicks; i++) {
      act(() => fireEvent.click(goRight));
    }
    const submitBtn = getByTestId('cta-primary');
    act(() => fireEvent.click(submitBtn));
    expect(getByTestId('year-picker-value').textContent).toBe((initialYear + numberOfClicks * 12).toString());
  });
});
