import React from "react";
import { Story, Meta } from "@storybook/react";
import { faker } from "@faker-js/faker";

import { EmployeeMockGenerator } from "@domain/types/__mock__/employee-generator";
import {BranchMockGenerator} from '@domain/types/__mock__/branch-generator';
import ApptCard, { ApptCardProps }  from './index';
import ApptCardCompleted from '@components/cards/appt-card/completed';
import ApptCardCancelled from '@components/cards/appt-card/cancelled';


export default {
  component:ApptCard,
  title:"Components/Cards/ApptCard"
} as Meta;

const employeeGenerator = new EmployeeMockGenerator();
const branchGenerator = new BranchMockGenerator();

const employee = employeeGenerator.generateOne();
const branch = branchGenerator.generateOne();
const employeeLongName = employeeGenerator.generateOne();
employeeLongName.name = faker.datatype.string(3000);

const branchLongName = branchGenerator.generateOne();
branchLongName.name = faker.datatype.string(3000);

const Template: Story<ApptCardProps> = (args) => <ApptCard {...args} />;
export const Grooming = Template.bind({});
Grooming.args = {
  date: faker.date.future().toLocaleDateString(),
  branch,
  employee,
  service: "Grooming",
};

export const GroomingWithEmployee = Template.bind({});
GroomingWithEmployee.args = {
  ...Grooming.args,
};

export const GroomingWithEmployeeLongName = Template.bind({});

GroomingWithEmployeeLongName.args = {
  ...GroomingWithEmployee.args,
  employee: employeeLongName,
}

export const GroomingWithBranchLongName = Template.bind({});
GroomingWithBranchLongName.args = {
  ...GroomingWithEmployee.args,
  branch: branchLongName,
}


export const WeWash = Template.bind({});
WeWash.args = {
  ...Grooming.args,
  employee:undefined,
  service: "WeWash",
};


const CompletedTemplate: Story<ApptCardProps> = (args) => <ApptCardCompleted {...args} />;

export const GroomingCompleted = CompletedTemplate.bind({});
GroomingCompleted.args = {
  ...Grooming.args,

}

export const WeWashCompleted = CompletedTemplate.bind({});
WeWashCompleted.args = {
  ...WeWash.args,
}

const CancelledTemplate: Story<ApptCardProps> = (args) => <ApptCardCancelled {...args} />;

export const GroomingCancelled = CancelledTemplate.bind({});
GroomingCancelled.args = {
  ...Grooming.args,
}

export const WeWashCancelled = CancelledTemplate.bind({});
WeWashCancelled.args = {
  ...WeWash.args,
}
