import {dogWeightCategories,DogWeightCategory} from '@pages/add-pet/index.constants';
import DropdownSelect, { DropdownSelectItem } from '@components/inputs/dropdown-select';

export interface DogWeightSelectProps {
  onSelect?: (weight: number) => void;
}

export const getLabel = (category: DogWeightCategory) => {
  if (category.minWeight === category.maxWeight) {
    return category.name + ' (' + category.minWeight + ')';
  }
  return category.name + ' (' + category.minWeight + ' - ' + category.maxWeight + ')';
}

const PetWeightSelect = ({ onSelect }: DogWeightSelectProps) => {
  const options : DropdownSelectItem<DogWeightCategory>[]= dogWeightCategories.map((category) => ({
    value: category,
    label: getLabel(category),
  })) ;

  const handleSelect = (weight: DogWeightCategory) => {
    if (onSelect) {
      onSelect(weight.minWeight);
    }
  }

  return (
    <DropdownSelect
      toggleWhenSelected={true}
      options={options}
      label={'Weight'}
      onSelect={handleSelect}
    />
  );
};

export default PetWeightSelect

