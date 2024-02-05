import React from "react";
import {ages} from '@pages/add-pet/index.constants';
import DropdownSelect from '@components/inputs/dropdown-select';


export interface DogAgeSelectProps {
  onSelect?: (age: number) => void;
}


const PetAgeSelect = ({ onSelect }: DogAgeSelectProps) => {
  const options = ages.map((age) => ({ value: age, label: age.toString() }));
  return <DropdownSelect       toggleWhenSelected={true}
                               options={options} label={'Age'} onSelect={onSelect} />;
};

export default PetAgeSelect;
