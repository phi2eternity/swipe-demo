import { dogWeightCategories } from '@pages/add-pet/index.constants';
import { render } from '@testing-library/react';
import PetWeightSelect, { getLabel } from '@pages/add-pet/pet-weight-select';

describe('DogWeightSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PetWeightSelect />);
    expect(baseElement).toBeTruthy();
  });
  it('should render weight options', () => {
    const { getByText } = render(<PetWeightSelect />);
    dogWeightCategories.forEach((category) => {
      expect(getByText(getLabel(category))).toBeTruthy();
    });
  });
});
