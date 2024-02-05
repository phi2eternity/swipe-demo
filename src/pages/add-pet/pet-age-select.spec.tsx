import { ages } from '@pages/add-pet/index.constants';
import { render } from '@testing-library/react';
import PetAgeSelect from '@pages/add-pet/pet-age-select';

describe('PetAgeSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PetAgeSelect />);
    expect(baseElement).toBeTruthy();
  });
  it('should render age options', () => {
    const { getByText } = render(<PetAgeSelect />);
    ages.forEach((age) => {
      expect(getByText(age.toString())).toBeTruthy();
    });
  });
});
