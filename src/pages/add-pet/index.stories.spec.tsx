import * as AddPetPageStories from './index.stories';
import { render } from '@testing-library/react';

describe('AddPetPageStories', () => {
  it('should render', () => {
    expect(AddPetPageStories).toBeTruthy();
  });
  it('should render AddPetPage', () => {
    render(<AddPetPageStories.AddPet  />);
  });
  it('should render AddPetPage with initial values', () => {
    render(<AddPetPageStories.AddPet {...AddPetPageStories.AddPet.args} />);
  });
});
