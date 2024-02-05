import PetStatsCard from '@components/cards/pet-stats-card/index';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import { render } from '@testing-library/react';

describe('PetStatsCard', () => {

  const petDetailsGenerator = new PetDetailsMockGenerator();
  const pet = petDetailsGenerator.generateOne();

    it('should be defined.',()=>{
    expect(PetStatsCard).toBeDefined();
  });
  it('should render.',()=>{
    const wrapper = render(<PetStatsCard pet={pet}/>);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with onClick.',()=>{
    const onClick = jest.fn();
    const wrapper = render(<PetStatsCard pet={pet} onClick={onClick}/>);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClick when clicked.',()=>{
    const onClick = jest.fn();
    const wrapper = render(<PetStatsCard pet={pet} onClick={onClick}/>);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
    wrapper.getByTestId('pet-stats-card').click();
    expect(onClick).toHaveBeenCalled();
  });
});
