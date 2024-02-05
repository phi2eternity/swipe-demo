import { render } from '@testing-library/react';
import ApptCardFactory from '@components/cards/appt-card/factory';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import { faker } from '@faker-js/faker';

describe('ApptCardFactory', () => {
  const branchGenerator  = new BranchMockGenerator();
  const employeeGenerator = new EmployeeMockGenerator();
  const date = faker.date.future().toISOString();

  const branch = branchGenerator.generateOne();
  const employee = employeeGenerator.generateOne();

  const base = {
    date,
    branch,
    employee,
  }

  it('should be defined', () => {
    expect(ApptCardFactory).toBeDefined();
  });

  it('should render ApptCardCompleted when status is Completed', () => {
      const props = {
        status: 'Completed',
        ...base
      };
      const wrapper = render(<ApptCardFactory {...props} />);
      const apptCardCompleted = wrapper.getByTestId('appt-card-completed');
      expect(apptCardCompleted).toBeDefined();
  });
  it('should render ApptCardCancelled when status is Cancelled', () => {
      const props = {
        status: 'Cancelled',
        ...base
      };
      const wrapper = render(<ApptCardFactory {...props} />);
      const apptCardCancelled = wrapper.getByTestId('appt-card-cancelled');
      expect(apptCardCancelled).toBeDefined();
  });
  it('should render ApptCard when status is not Completed or Cancelled', () => {
      const props = {
        status: 'Pending',
        ...base
      };
      const wrapper = render(<ApptCardFactory {...props} />);
      const apptCard = wrapper.getByTestId('appt-card');
      expect(apptCard).toBeDefined();
  });
});
