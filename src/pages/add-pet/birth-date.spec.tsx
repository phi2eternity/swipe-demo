import { act, render } from '@testing-library/react';
import PetBirthDateSelect from '@pages/add-pet/birth-date';
import { advanceTo, clear } from 'jest-date-mock';

describe('BirthDate', () => {

  const mockedData = new Date(2023,1,1);
  beforeEach(() => {
    advanceTo(mockedData);
  });
  afterEach(() => {
    clear();
  });
  it('should render', () => {
    const wrapper = render(<PetBirthDateSelect />);
    expect(wrapper).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
  it('without initial date, it should render with Date.now().', () => {
    const {getByTestId} = render(<PetBirthDateSelect />);
    const yearValue = getByTestId('year-picker-value');
    const monthValue = getByTestId('month-picker-value');
    expect(yearValue.textContent).toBe(mockedData.getFullYear().toString());
    expect(monthValue.textContent).toBe("February");
  });
  it('with initial date, it should render with initial date.', () => {
    const {getByTestId} = render(<PetBirthDateSelect initialDate={new Date(2020, 0, 1)}/>);
    const yearValue = getByTestId('year-picker-value');
    const monthValue = getByTestId('month-picker-value');
    expect(yearValue.textContent).toBe("2020");
    expect(monthValue.textContent).toBe("January");
  });
  it('should call onChange when year is changed.', () => {
    const onChange = jest.fn();
    const {getByTestId,getAllByTestId} = render(<PetBirthDateSelect onChange={onChange}/>);
    const yearPicker = getByTestId('year-picker');
    act(()=>yearPicker.click());
    const pickerCards = getAllByTestId('picker-card');
    act(()=>pickerCards[0].click());
    const ctaPrimaryButtons = getAllByTestId('cta-primary');
    const yearSubmit = ctaPrimaryButtons[0] as HTMLButtonElement;
    act(()=>yearSubmit.click());
    expect(onChange).toBeCalledTimes(1);
    const newYear = mockedData.getFullYear() - mockedData.getFullYear() % 12;
    const callResult = onChange.mock.calls[0][0];
    expect(callResult).toBeInstanceOf(Date);
    expect(callResult.getFullYear()).toBe(newYear);
    expect(callResult.getMonth()).toBe(mockedData.getMonth());
  });
  it('should call onChange when month is changed.', () => {
    const onChange = jest.fn();
    const {getByTestId,getAllByTestId} = render(<PetBirthDateSelect onChange={onChange}/>);
    const monthPicker = getByTestId('month-picker');
    act(()=>monthPicker.click());
    const pickerCards = getAllByTestId('picker-card');
    // 22 picker-card 2 picker-card-selected
    // First 11 picker-card are years, last 11 are months
    // index 11 corresponds to January
    act(()=>pickerCards[11].click());
    const ctaPrimaryButtons = getAllByTestId('cta-primary');
    const monthSubmit = ctaPrimaryButtons[1] as HTMLButtonElement;
    act(()=>monthSubmit.click());
    expect(onChange).toBeCalledTimes(1);
    const callResult = onChange.mock.calls[0][0];
    expect(callResult).toBeInstanceOf(Date);
    expect(callResult.getFullYear()).toBe(mockedData.getFullYear());
    expect(callResult.getMonth()).toBe(0);
  });


});
