import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import UpcomingApptsDumb from '@features/upcoming-appts/index.dumb';
import { render } from '@testing-library/react';

const appointmentGenerator = new AppointmentMockGenerator();

describe('UpcomingApptsDumb', () => {
  it('should be defined.',()=>{
    expect(UpcomingApptsDumb).toBeDefined();
  });
  it('should render with 0 appointments',()=>{
    const appointments = appointmentGenerator.generateMany(0);
    const { container } = render(<UpcomingApptsDumb appointments={appointments} goTo={()=>{}} />);
    expect(container).toMatchSnapshot();
  });
  it('should render with 1 appointments',()=>{
    const appointments = appointmentGenerator.generateMany(1);
    const { container } = render(<UpcomingApptsDumb appointments={appointments} goTo={()=>{}} />);
    expect(container).toMatchSnapshot();
  });
  it('should render with 2 appointments',()=>{
    const appointments = appointmentGenerator.generateMany(2);
    const { container } = render(<UpcomingApptsDumb appointments={appointments} goTo={()=>{}} />);
    expect(container).toMatchSnapshot();
  });
  it('should render with 5 appointments. It should include 4 children.',()=>{
    const appointments = appointmentGenerator.generateMany(5);
    const { container,getByTestId } = render(<UpcomingApptsDumb appointments={appointments} goTo={()=>{}} />);
    expect(container).toMatchSnapshot();
    const upcomingAppts =     getByTestId("upcoming-appts");
    expect(upcomingAppts.children.length).toBe(4);
  });

  it('should render with 3 appointments. It should include 4 children.',()=>{
    const appointments = appointmentGenerator.generateMany(3);
    const { container,getByTestId } = render(<UpcomingApptsDumb appointments={appointments} goTo={()=>{}} />);
    expect(container).toMatchSnapshot();
    const upcomingAppts =     getByTestId("upcoming-appts");
    expect(upcomingAppts.children.length).toBe(4);
  });

  it('onClick should return correct appointment entity.',()=>{
    const appointments = appointmentGenerator.generateMany(3);
    const onClick = jest.fn();
    const { getByTestId } = render(<UpcomingApptsDumb appointments={appointments} goTo={()=>{}} onClick={onClick} />);
    const apptCard = getByTestId("upcoming-appts");
    const firstAppointmentCard = apptCard.children[1] as HTMLElement;
    firstAppointmentCard.click();
    expect(onClick).toBeCalled();
    expect(onClick).toBeCalledWith(appointments[0]);
  });
  it('onClick should return correct appointment entity when <=2 elements.',()=>{
    const appointments = appointmentGenerator.generateMany(2);
    const onClick = jest.fn();
    const { getByTestId } = render(<UpcomingApptsDumb appointments={appointments} goTo={()=>{}} onClick={onClick} />);
    const apptCard = getByTestId("upcoming-appts");
    const firstAppointmentCard = apptCard.children[1] as HTMLElement;
    firstAppointmentCard.click();
    expect(onClick).toBeCalled();
    expect(onClick).toBeCalledWith(appointments[0]);
  });

  it('goTo should be called when AllApptsButton is clicked.',()=>{
    const appointments = appointmentGenerator.generateMany(5);
    const goTo = jest.fn();
    const { getByTestId } = render(<UpcomingApptsDumb appointments={appointments} goTo={goTo} />);
    const apptCard = getByTestId("upcoming-appts");
    const allApptsButton = apptCard.children[3] as HTMLElement;
    allApptsButton.click();
    expect(goTo).toBeCalled();
  });
});
