import React from 'react';
import HomePageDumb, { HomePageDumbProps } from './index.dumb';
import { Meta, Story } from '@storybook/react';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import { PetMockGenerator } from '@domain/types/__mock__/pet-generator';
import PageCard from '@components/cards/page-card/page-card';
import { Provider } from 'react-redux';
import store from '@quicker/store/store';
import { BrowserRouter } from 'react-router-dom';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';


const appointmentGenerator = new AppointmentMockGenerator();
const petGenerator = new PetDetailsMockGenerator();


export default {
  title: 'Pages/Home', component: HomePageDumb,
};

const Template: Story<HomePageDumbProps> = (args) => <BrowserRouter><Provider
  store={store}><PageCard><HomePageDumb {...args} /></PageCard></Provider></BrowserRouter>;
export const Default = Template.bind({});
Default.args = {
  appointments: [], pets: [],
};

const pets = petGenerator.generateMany(3);

export const WithPets = Template.bind({});
WithPets.args = {
  appointments: [], pets,
};

export const WithOneAppointment = Template.bind({});
WithOneAppointment.args = {
  ...WithPets.args, appointments: appointmentGenerator.generateMany(1, { pets }),
};

export const WithManyAppointments = Template.bind({});
WithManyAppointments.args = {
  ...WithPets.args, appointments: appointmentGenerator.generateMany(3, { pets }),

};
