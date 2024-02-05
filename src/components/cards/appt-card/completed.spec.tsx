import ApptCardCompleted from '@components/cards/appt-card/completed';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';
import { faker } from '@faker-js/faker';
import { fireEvent, render } from '@testing-library/react';

describe('ApptCardCompleted', () => {
  const branchGenerator  = new BranchMockGenerator();
  const employeeGenerator = new EmployeeMockGenerator();
  const date = faker.date.future().toISOString();

  const branch = branchGenerator.generateOne();
  const employee = employeeGenerator.generateOne();

  it('should be defined', () => {
    expect(ApptCardCompleted).toBeDefined();
  });
  it('should render WeWash correctly', () => {
    const { container } = render(<ApptCardCompleted date={date} branch={branch} service={"WeWash"} />);
    expect(container).toMatchSnapshot();
  });
  it('should render Grooming correctly', () => {
    const { container } = render(<ApptCardCompleted date={date} employee={employee} branch={branch} service={"Grooming"} />);
    expect(container).toMatchSnapshot();
  });
  it('should fire onClick with grooming.', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<ApptCardCompleted date={date} employee={employee} branch={branch} service={"Grooming"} onClick={onClick} />);
    const apptCard = getByTestId('appt-card-completed');
    fireEvent.click(apptCard);
    expect(onClick).toBeCalled();
  });
  it('should fire onClick with WeWash.', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<ApptCardCompleted date={date} employee={employee} branch={branch} service={"WeWash"} onClick={onClick} />);
    const apptCard = getByTestId('appt-card-completed');
    fireEvent.click(apptCard);
    expect(onClick).toBeCalled();
  });

});
