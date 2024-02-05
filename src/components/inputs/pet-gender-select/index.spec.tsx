import PetGenderSelect from '@components/inputs/pet-gender-select/index';
import { act, render } from '@testing-library/react';

describe('PetGenderSelect', () => {
  it('should be defined', () => {
    expect(PetGenderSelect).toBeDefined();
  });

  it('should render correctly', () => {
    const { container } = render(<PetGenderSelect />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial value', () => {
    const {container,getByTestId} = render(<PetGenderSelect initialValue={"Male"}/>);
    expect(container).toMatchSnapshot();
    // Check if the value is displayed
    const valueItem = getByTestId("pet-gender-form-field-value");
    expect(valueItem).toBeDefined();
    expect(valueItem.textContent).toEqual("Male");
  });

  it('when clicked dropdown should open', () => {
    const { container,getByTestId, getAllByTestId } = render(<PetGenderSelect />);

    const dropdownBtn = getByTestId("pet-gender-form-field");
    expect(dropdownBtn).toBeDefined();
    act(()=>{
      dropdownBtn?.click();

    })
    const buttons = getAllByTestId("btn-secondary");
    expect(buttons).toBeDefined();
    expect(buttons.length).toEqual(2);
    act(() => {
      buttons[1].click();
    });

    const valueItem = getByTestId("pet-gender-form-field-value");
    expect(valueItem).toBeDefined();
    expect(valueItem.textContent).toEqual("Female");
  });

  it('onSelect should be called when a value is selected', () => {
    const onSelect = jest.fn();
    const { container,getByTestId, getAllByTestId } = render(<PetGenderSelect onSelect={onSelect} />);

    const dropdownBtn = getByTestId("pet-gender-form-field");
    expect(dropdownBtn).toBeDefined();
    act(()=>{
      dropdownBtn?.click();

    })
    const buttons = getAllByTestId("btn-secondary");
    expect(buttons).toBeDefined();
    expect(buttons.length).toEqual(2);
    act(() => {
      buttons[1].click();
    });
    expect(onSelect).toBeCalledTimes(1);
    expect(onSelect).toBeCalledWith("Female");
  });

});
