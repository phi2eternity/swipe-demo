import AppointmentsPageDumb from '@pages/appointments/index.dumb';
import { act, fireEvent, render } from '@testing-library/react';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import { advanceTo, clear } from 'jest-date-mock';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';


const employeeGenerator = new EmployeeMockGenerator();
const branchGenerator = new BranchMockGenerator();
const petGenerator = new PetDetailsMockGenerator();
const appointmentGenerator = new AppointmentMockGenerator();


const employees = employeeGenerator.generateMany(3);
const branches = branchGenerator.generateMany(3);
const pets = petGenerator.generateMany(3);
const appointments = appointmentGenerator.generateMany(40, {
  employees, branches, pets,
});


describe('AppointmentsPageDumb', () => {
  let date: Date;
  beforeAll(
    () => {
      date = new Date(2023, 3, 13);
      advanceTo(date);
    }
  );
  afterAll(() => {
    clear();
  });

  it('should be defined', () => {
    expect(AppointmentsPageDumb).toBeDefined();
  });
  it('should render with empty props.', () => {
    const wrapper = render(<AppointmentsPageDumb />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with appointments.', () => {
    const wrapper = render(<AppointmentsPageDumb appointments={appointments} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with pets.', () => {
    const wrapper = render(<AppointmentsPageDumb pets={pets} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with appointments and pets.', () => {
    const wrapper = render(<AppointmentsPageDumb appointments={appointments} pets={pets} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with appointments and pets and goBack.', () => {
    const wrapper = render(<AppointmentsPageDumb appointments={appointments} pets={pets} goBack={() => {
    }} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('when left icon is clicked, goBack should be called.', () => {
    const goBack = jest.fn();
    const wrapper = render(<AppointmentsPageDumb appointments={appointments} pets={pets} goBack={goBack} />);
    const goBackButtonDiv = wrapper.getByTestId('bi-left-arrow');
    // Get svg child
    const goBackButton = goBackButtonDiv.children[0] as HTMLElement;
    fireEvent.click(goBackButton);
    expect(goBack).toBeCalled();
  });

  it('when pet is selected, appointments should filter out and when all pets are selected all should be back.', () => {

    const wrapper = render(<AppointmentsPageDumb appointments={appointments} pets={pets} goBack={() => {
    }} />);
    const allSelectables = wrapper.getAllByTestId("dropdown-select-option-item");
    const petSelect = allSelectables.slice(0,pets.length+1);
    // petSelect get all data-testid=dropdown-select-value
    act(()=>fireEvent.click(petSelect[0]));

    const filteredAppointments = appointments.filter(appt => appt.pet.id === pets[0].id);
    let apptCards = wrapper.getAllByTestId('appt-card') as HTMLElement[];
    let apptCardCompleted = wrapper.getAllByTestId('appt-card-completed') as HTMLElement[];
    let apptCardCancelled = wrapper.getAllByTestId('appt-card-cancelled') as HTMLElement[];

    expect(apptCards.length + apptCardCancelled.length + apptCardCompleted.length).toBe(filteredAppointments.length);
    act(()=>fireEvent.click(petSelect[pets.length]));

    apptCards = wrapper.getAllByTestId('appt-card') as HTMLElement[];
    apptCardCompleted = wrapper.getAllByTestId('appt-card-completed') as HTMLElement[];
    apptCardCancelled = wrapper.getAllByTestId('appt-card-cancelled') as HTMLElement[];
    expect(apptCards.length + apptCardCancelled.length + apptCardCompleted.length).toBe(appointments.length);

  });
  it('when Upcoming is selected in time dropdown., appointments should filter out and when all times are selected all should be back.', () => {

    const wrapper = render(<AppointmentsPageDumb appointments={appointments} pets={pets} goBack={() => {
    }} />);
    const allSelectables = wrapper.getAllByTestId("dropdown-select-option-item");
    const timeSelect = allSelectables.slice(pets.length+1);
    // petSelect get all data-testid=dropdown-select-value
    act(()=>fireEvent.click(timeSelect[1]));

    const filteredAppointments = appointments.filter(appt => new Date(appt.start).getTime() > date.getTime());
    // Don't throw error if no appt is found.
    let apptCards = wrapper.getAllByTestId('appt-card') as HTMLElement[];
    let apptCardCompleted = wrapper.getAllByTestId('appt-card-completed') as HTMLElement[];
    let apptCardCancelled = wrapper.getAllByTestId('appt-card-cancelled') as HTMLElement[];

    expect(apptCards.length + apptCardCancelled.length + apptCardCompleted.length).toBe(filteredAppointments.length);
    act(()=>fireEvent.click(timeSelect[0]));

    apptCards = wrapper.getAllByTestId('appt-card') as HTMLElement[];
    apptCardCompleted = wrapper.getAllByTestId('appt-card-completed') as HTMLElement[];
    apptCardCancelled = wrapper.getAllByTestId('appt-card-cancelled') as HTMLElement[];
    expect(apptCards.length + apptCardCancelled.length + apptCardCompleted.length).toBe(appointments.length);

  });

  it('when Past is selected in time dropdown., appointments should filter out and when all times are selected all should be back.', () => {

      const wrapper = render(<AppointmentsPageDumb appointments={appointments} pets={pets} goBack={() => {
      }} />);
      const allSelectables = wrapper.getAllByTestId("dropdown-select-option-item");
      const timeSelect = allSelectables.slice(pets.length+1);
      // petSelect get all data-testid=dropdown-select-value
      act(()=>fireEvent.click(timeSelect[2]));

      const filteredAppointments = appointments.filter(appt => new Date(appt.start).getTime() < date.getTime());
      // Don't throw error if no appt is found.
      let apptCards = wrapper.getAllByTestId('appt-card') as HTMLElement[];
      let apptCardCompleted = wrapper.getAllByTestId('appt-card-completed') as HTMLElement[];
      let apptCardCancelled = wrapper.getAllByTestId('appt-card-cancelled') as HTMLElement[];

      expect(apptCards.length + apptCardCancelled.length + apptCardCompleted.length).toBe(filteredAppointments.length);
      act(()=>fireEvent.click(timeSelect[0]));

      apptCards = wrapper.getAllByTestId('appt-card') as HTMLElement[];
      apptCardCompleted = wrapper.getAllByTestId('appt-card-completed') as HTMLElement[];
      apptCardCancelled = wrapper.getAllByTestId('appt-card-cancelled') as HTMLElement[];
      expect(apptCards.length + apptCardCancelled.length + apptCardCompleted.length).toBe(appointments.length);

  });

  it('When clicking on a card, onApptClicked should be fired.', () => {
    const onApptClicked = jest.fn();
    const wrapper = render(<AppointmentsPageDumb appointments={appointments} pets={pets} goBack={() => {
    }} onApptClicked={onApptClicked}/>);
    const apptCard = wrapper.getAllByTestId('appt-card')[0] as HTMLElement;
    act(()=>fireEvent.click(apptCard));
    expect(onApptClicked).toBeCalled();
  });





});
