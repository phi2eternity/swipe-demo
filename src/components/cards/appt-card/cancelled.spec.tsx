import ApptCardCancelled from '@components/cards/appt-card/cancelled';
import { fireEvent, render } from '@testing-library/react';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';
import ApptCardCompleted from '@components/cards/appt-card/completed';

const branchGenerator = new BranchMockGenerator();
const employeeGenerator = new EmployeeMockGenerator();

const employee = employeeGenerator.generateOne();
const branch = branchGenerator.generateOne();
const date = new Date().toISOString();

describe('ApptCardCancelled', () => {
  it('should be defined',() => {
    expect(ApptCardCancelled).toBeDefined();
  });
  it('should render correctly', () => {
    const wrapper = render(<ApptCardCancelled date={date} branch={branch} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should fire onClick with WeWash.', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<ApptCardCancelled date={date} employee={employee} branch={branch} service={"WeWash"} onClick={onClick} />);
    const apptCard = getByTestId('appt-card-cancelled');
    fireEvent.click(apptCard);
    expect(onClick).toBeCalled();
  });
  it('should fire onClick with Grooming.', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<ApptCardCancelled date={date} employee={employee} branch={branch} service={"Grooming"} onClick={onClick} />);
    const apptCard = getByTestId('appt-card-cancelled')
    fireEvent.click(apptCard);
    expect(onClick).toBeCalled();
  });
  it('should render with WeWash parameter',()=>{
    const wrapper = render(<ApptCardCancelled date={date} branch={branch} service={'WeWash'} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with Grooming parameter',()=>{
    const wrapper = render(<ApptCardCancelled date={date} branch={branch} service={'Grooming'} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with employee',()=>{
    const wrapper = render(<ApptCardCancelled date={date} branch={branch} employee={employee} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with employee + Grooming.',() => {
    const wrapper = render(<ApptCardCancelled date={date} branch={branch} employee={employee} service={'Grooming'} />);
    expect(wrapper).toMatchSnapshot();
  });

});
