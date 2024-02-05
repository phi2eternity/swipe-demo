import React from 'react';
import { Story, Meta } from '@storybook/react';
import PaymentPageDumb, { PaymentPageDumbProps } from './index.dumb';
import { faker } from '@faker-js/faker';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';
import PageCard from '@components/cards/page-card/page-card';

export default {
  title: 'Pages/Payment Page',
  component: PaymentPageDumb,
}

const employeeGenerator = new EmployeeMockGenerator();
const branchGenerator = new BranchMockGenerator();

const Template: Story<PaymentPageDumbProps> = (args) => {

  return <PageCard>
    <PaymentPageDumb {...args} />
    </PageCard>;
}
export const Default = Template.bind({});
Default.args = {
  employee: employeeGenerator.generateOne(),
  branch: branchGenerator.generateOne(),
  date: faker.date.future().toLocaleDateString(),
  service:"Grooming",
}
