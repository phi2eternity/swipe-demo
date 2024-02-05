import PetCard from '@components/cards/pet-card/index';
import { render } from '@testing-library/react';

describe('PetCard', () => {
  it('should be defined',()=>{
    expect(PetCard).toBeDefined();
  });
  it('should render',()=>{
    const {getByTestId} = render(<PetCard name={"name"} age={"age"} />);
    expect(getByTestId('pet-card')).toBeDefined();
  });
  it('should not render expired when expired is false',()=>{
    const {queryByTestId} = render(<PetCard name={"name"} age={"age"} expired={false} />);
    expect(queryByTestId('pet-card-vaccine-expired')).toBeNull();
  });
  it('should render expired when expired is true',()=>{
    const {getByTestId} = render(<PetCard name={"name"} age={"age"} expired={true} />);
    expect(getByTestId('pet-card-vaccine-expired')).toBeDefined();
  });
});
