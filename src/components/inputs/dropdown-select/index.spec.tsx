/*
import React, { ChangeEvent, useState } from 'react';
import styles from "./index.module.scss";
import CheckableCard from '@components/cards/checkable-card/checkable-card';
import SelectBottomDrawer from '@components/drawers/select-bottom-drawer/select-bottom-drawer';
import { Close } from '@mui/icons-material';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';


export interface DropdownSelectItem<T> {
  value: T;
  label: string;
}

export interface DropdownSelectProps<T> {
  onSelect?: (value: T) => void;
  initialValue?: DropdownSelectItem<T>;
  options: DropdownSelectItem<T>[];
  label?: string;
  toggleWhenSelected?: boolean;
}

const DropdownSelect = <T,>({ onSelect, initialValue, options, label,toggleWhenSelected=false }: DropdownSelectProps<T>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownSelectItem<T> | null>(initialValue ?? null);

  const handleCheck = (option: DropdownSelectItem<T>) => {
   setSelected(option);
   onSelect && onSelect(option.value);
   toggleWhenSelected && toggle();
  };

  const toggle = () => setIsOpen(!isOpen);

  const cards = options.map((option) => {
    const checked = selected?.value === option.value;
    return <div onClick={() => handleCheck(option)} data-testid={"dropdown-select-option-item"}><CheckableCard
      key={option.label}
      title={option.label}
      checked={checked}
    />
      <div style={{height: "8px"}}/>
    </div>
  });

  const handleContinue = () => {
    setIsOpen(false)
  }

  let selectedClassName = styles.dropdownBtnTemplate__value;
  if(!label){
    selectedClassName = styles.dropdownBtnTemplate__valueNoLabel
  }

  return (<div data-testid={"dropdown-select"} className={styles.dropdownBtnTemplate} onClick={toggle}>
    {label && <label className={!selected ? styles.dropdownBtnTemplate__label : styles.dropdownBtnTemplate__label__floating}>{label}</label>}
    {!!selected ? <div data-testid={"dropdown-select-value"} className={selectedClassName}>{selected.label}</div> : null }
    <SelectBottomDrawer open={isOpen}>
      <div className={styles.dropdownBtnTemplate__header}>
        <h1>{label}</h1>
        <Close onClick={toggle}/>
      </div>
      <div style={{height: "16px"}}/>
      <>
        {...cards}
      </>

      <div style={{height: "8px"}}/>
      <CtaPrimary onClick={handleContinue} content={"Select"}/>
    </SelectBottomDrawer>

  </div>);
};

export default DropdownSelect;

 */
import DropdownSelect from '@components/inputs/dropdown-select/index';
import { act, fireEvent, render } from '@testing-library/react';

const options = [{ value: 'Poodle', label: 'Poodle' }, { value: 'Labrador', label: 'Labrador' }, {
  value: 'Bulldog', label: 'Bulldog',
}, { value: 'Beagle', label: 'Beagle' },

];

describe('DropdownSelect', () => {
  it('should be defined.', () => {
    expect(DropdownSelect).toBeDefined();
  });
  it('should render correctly.', () => {
    const { container } = render(<DropdownSelect options={options} />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with label.', () => {
    const { container } = render(<DropdownSelect options={options} label={'Dog Breed'} />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('label')).toBeDefined();
    expect(container.querySelector('label')?.textContent).toEqual('Dog Breed');
  });
  it('should render correctly with initial value.', () => {
    const { container } = render(<DropdownSelect options={options} initialValue={options[0]} />);
    expect(container.querySelector('div')?.textContent).toEqual('Poodle');
  });
  it('should render correctly with initial value and label.', () => {
    const { container,getByTestId } = render(<DropdownSelect options={options} initialValue={options[0]} label={'Dog Breed'} />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('label')).toBeDefined();
    // include Dog Breed in label.
    expect(container.querySelector('label')?.textContent).toEqual('Dog Breed');
    const value = getByTestId('dropdown-select-value');
    expect(value).toBeDefined();
    expect(value.textContent).toEqual('Poodle');
  });

  it('dropdown should open when clicked.', () => {
    const { getByTestId,getAllByTestId } = render(<DropdownSelect options={options} />);
    const dropdown = getByTestId('dropdown-select');

    act(() => {
      fireEvent.click(dropdown);

    });

    const optionItems = getAllByTestId('dropdown-select-option-item');
    expect(optionItems.length).toEqual(4);
    expect(optionItems[0].textContent).toEqual('Poodle');
    expect(optionItems[1].textContent).toEqual('Labrador');
    expect(optionItems[2].textContent).toEqual('Bulldog');
    expect(optionItems[3].textContent).toEqual('Beagle');




  });
  it('on select should be called when an option is clicked.', () => {
    const onSelect = jest.fn();
    const { getByTestId,getAllByTestId } = render(<DropdownSelect options={options} onSelect={onSelect} />);
    const dropdown = getByTestId('dropdown-select');

    act(() => {
      fireEvent.click(dropdown);

    });
    const optionItems = getAllByTestId('dropdown-select-option-item');
    act(() => {
      fireEvent.click(optionItems[0]);

    });
    expect(onSelect).toBeCalled();
    expect(onSelect).toBeCalledWith('Poodle');
  });
});
