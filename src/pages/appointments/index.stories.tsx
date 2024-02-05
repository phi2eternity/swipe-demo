import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AppointmentsPageDumb, { AppointmentsPageDumbProps } from './index.dumb';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import PageCard from '@components/cards/page-card/page-card';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';

export default {
  title: 'Pages/Appointments',
  component: AppointmentsPageDumb,
} as Meta;

const employeeGenerator = new EmployeeMockGenerator();
const branchGenerator = new BranchMockGenerator();
const productGenerator = new ProductMockGenerator();
const petGenerator = new PetDetailsMockGenerator();
const appointmentGenerator = new AppointmentMockGenerator();
const pets = petGenerator.generateMany(3);
const employees = employeeGenerator.generateMany(3);
const branches = branchGenerator.generateMany(3);
const products = productGenerator.generateMany(10);
const appointments = appointmentGenerator.generateMany(50, {
  pets,
  employees,
  branches,
  products,
});

const Template: Story<AppointmentsPageDumbProps> = (args) => <PageCard><AppointmentsPageDumb {...args} /></PageCard>;

export const Default = Template.bind({});
Default.args = {

}

export const WithAppointments = Template.bind({});
WithAppointments.args = {
  appointments,
}

export const WithPets = Template.bind({});
WithPets.args = {
  pets,
}

export const WithAppointmentsAndPets = Template.bind({});
WithAppointmentsAndPets.args = {
  appointments,
  pets,
}

