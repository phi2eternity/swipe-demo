import PetDetailsPageDumb from '@pages/pet-details/index.dumb';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import { render } from '@testing-library/react';

describe('PetDetailsPageDumb', () => {
  const petDetailsGenerator = new PetDetailsMockGenerator();
  const pet = petDetailsGenerator.generateOne();

  it('should be defined', () => {
    expect(PetDetailsPageDumb).toBeDefined();
  });
  it('should render correctly', () => {
    const wrapper = render(<PetDetailsPageDumb pet={pet}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
