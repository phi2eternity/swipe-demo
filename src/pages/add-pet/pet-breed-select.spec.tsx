import PetBreedSelect from '@pages/add-pet/pet-breed-select';
import { render } from '@testing-library/react';
import { breeds} from '@pages/add-pet/index.constants';

describe('DogBreedSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PetBreedSelect />);
    expect(baseElement).toBeTruthy();
  });
  it('should render breed options', () => {
    const { getByText } = render(<PetBreedSelect />);
    breeds.forEach((breed) => {
      expect(getByText(breed)).toBeTruthy();
    });
  });
});
