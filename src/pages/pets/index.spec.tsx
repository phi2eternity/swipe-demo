
import PetsPageDumb from '@pages/pets/index.dumb';
import PetsPage from '@pages/pets/index';
import { render } from '@testing-library/react';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import { fireEvent } from '@storybook/testing-library';

describe("PetsPage", () => {

  const petDetailsGenerator = new PetDetailsMockGenerator();

  it('should be defined', () => {
    expect(PetsPage).toBeDefined();
    expect(PetsPageDumb).toBeDefined();
  });

  it('should render correctly with pets.', () => {
    const pets = petDetailsGenerator.generateMany(5);
    const wrapper = render(<PetsPageDumb pets={pets}/>);
    expect(wrapper).toMatchSnapshot();
    const petCards = wrapper.getAllByTestId("pet-stats-card");
    expect(petCards.length).toBe(5);
  });
  it('should render correctly with empty pets.', () => {
    const pets = petDetailsGenerator.generateMany(0);
    const wrapper = render(<PetsPageDumb pets={pets}/>);
    expect(wrapper).toMatchSnapshot();
    wrapper.getByText("No pets found");
  });

  it('should render correctly with pets and onClickPet.', () => {
    const pets = petDetailsGenerator.generateMany(5);
    const onClickPet = jest.fn();
    const wrapper = render(<PetsPageDumb pets={pets} onClickPet={onClickPet}/>);
    expect(wrapper).toMatchSnapshot();
    const petCards = wrapper.getAllByTestId("pet-stats-card");
    expect(petCards.length).toBe(5);
    petCards.forEach((card) => {
      fireEvent.click(card);
    });
    expect(onClickPet).toHaveBeenCalledTimes(5);
  });
  it('should render correctly with pets and goBack.', () => {
    const pets = petDetailsGenerator.generateMany(5);
    const goBack = jest.fn();
    const wrapper = render(<PetsPageDumb pets={pets} goBack={goBack}/>);
    expect(wrapper).toMatchSnapshot();
  });
  it('when clicked to go back, goBack should be fired.', () => {
    const goBack = jest.fn();
    const { container } = render(<PetsPageDumb pets={[]} goBack={goBack}/>);
    const goBackButton = container.querySelector("svg") as SVGSVGElement;
    fireEvent.click(goBackButton);
    expect(goBack).toHaveBeenCalledTimes(1);

  });

});
