import SurgeCalendar from '@features/surge-calendar/surge-calendar';
import { act, fireEvent, render, waitFor, screen } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import {
  CapacityDetailsMockGenerator,
} from '@domain/types/__mock__/capacity-details-generator';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { Provider as InversionProvider } from 'inversify-react';
import { CapacityDetails } from '@domain/types/common/capacity-details';
import styles from './surge-calendar.module.scss';
import { getDateString } from '@utils/date-utils';

describe('SurgeCalendar', () => {
  let generator: CapacityDetailsMockGenerator;
  let testContainer: Container;
  let data: CapacityDetails[];

  beforeAll(() => {
    testContainer = getTestContainer();
    generator = new CapacityDetailsMockGenerator();
    data = generator.generateMany(1);
  });
  beforeEach(() => {
    mockAxios.post.mockResolvedValue({ data: data });
  });

  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(SurgeCalendar).toBeDefined();
  });

  it('should render', () => {
    const wrapper = render(<InversionProvider container={testContainer}><SurgeCalendar /></InversionProvider>);
    expect(wrapper).toBeTruthy();
  });

  it('should render with initial date', () => {
    const wrapper = render(<InversionProvider container={testContainer}><SurgeCalendar
      initialDate={new Date()} /></InversionProvider>);
    expect(wrapper).toBeTruthy();
  });

  it('should render with employees', () => {
    const wrapper = render(<InversionProvider container={testContainer}><SurgeCalendar
      employees={[1, 2, 3]} /></InversionProvider>);
    expect(wrapper).toBeTruthy();

  });

  it('should render with branches', () => {
    const wrapper = render(<InversionProvider container={testContainer}><SurgeCalendar
      branches={[1, 2, 3]} /></InversionProvider>);
    expect(wrapper).toBeTruthy();
  });

  it('should render with service', () => {
    const wrapper = render(<InversionProvider container={testContainer}><SurgeCalendar
      service='Grooming' /></InversionProvider>);
    expect(wrapper).toBeTruthy();
  });

  it('should render with onChange is called when date is changed.', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<InversionProvider container={testContainer}><SurgeCalendar
      onChange={onChange} /></InversionProvider>);
    const nextButton = getByTestId('arrow-left');
    fireEvent.click(nextButton);
    expect(onChange).toBeCalled();
  });

});
