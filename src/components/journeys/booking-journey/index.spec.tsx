import BookingJourney from '@components/journeys/booking-journey/index';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'inversify-react';
import { Provider as ReduxProvider } from 'react-redux';
import { Container } from 'inversify';
import { CustomerGetAllPetsUseCase } from '@domain/usecases/customer/get-all-pets';
import { getTestContainer } from '@utils/inversion-container-test';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import configureMockStore, { MockStore } from 'redux-mock-store';


const petGenerator = new PetDetailsMockGenerator();
const pets = petGenerator.generateMany(5);
const initialState = {
  order: {
    step: 0,
    orderType: 'Grooming',
  },
};

describe('BookingJourney', () => {
  let testContainer:Container;
  let customerGetAllPetsUseCase:CustomerGetAllPetsUseCase;
  let mockStore:any;
  let store:MockStore;
  beforeAll(() => {
    testContainer = getTestContainer();
    customerGetAllPetsUseCase = testContainer.get<CustomerGetAllPetsUseCase>(CustomerGetAllPetsUseCase);
    jest.spyOn(customerGetAllPetsUseCase, 'call').mockResolvedValue(pets);
    mockStore = configureMockStore();
    store = mockStore(initialState);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });


  it('should be defined.', () => {
    expect(BookingJourney).toBeTruthy();
  });

  it('should render correctly', () => {
    const { container } = render(<ReduxProvider store={store}><Provider container={testContainer}><BookingJourney selectable={false} ><div></div></BookingJourney></Provider></ReduxProvider>);
    expect(container).toMatchSnapshot();
  });

  it('should include dropdown when selectable is true.', () => {
    const { getByTestId } = render(<ReduxProvider store={store}><Provider container={testContainer}><BookingJourney selectable={true} ><div></div></BookingJourney></Provider></ReduxProvider>);
    const dropdown = getByTestId('dropdown');
    expect(dropdown).toBeTruthy();
  });

  it('should not include dropdown when selectable is false.', () => {
    const { queryByTestId } = render(<ReduxProvider store={store}><Provider container={testContainer}><BookingJourney selectable={false} ><div></div></BookingJourney></Provider></ReduxProvider>);
    const dropdown = queryByTestId('dropdown');
    expect(dropdown).toBeFalsy();
  });
});

