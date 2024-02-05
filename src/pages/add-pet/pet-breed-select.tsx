import DropdownSelect from '@components/inputs/dropdown-select';
import { breeds } from './index.constants';

export interface DogBreedSelectProps {
  onSelect?: (breed: string) => void;
  initialValue?: string;
}

const PetBreedSelect = ({ onSelect, initialValue }: DogBreedSelectProps) => {
  const options = breeds.map((breed) => ({ value: breed, label: breed }));
  return <DropdownSelect       toggleWhenSelected={true}
                               options={options} initialValue={options.filter(val => val.value === initialValue)[0] ?? null}
                         label={'Breed'} onSelect={onSelect} />;
};

export default PetBreedSelect;
