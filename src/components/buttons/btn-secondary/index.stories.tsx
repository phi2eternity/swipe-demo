import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import BtnSecondary, { BtnSecondaryProps } from './index';
import appointmentsSvg from '@assets/appt.svg';
import myPetsSvg from '@assets/my-pets.svg';
import rewardsSvg from '@assets/rewards.svg';
import helpSvg from '@assets/help.svg';

export default {
  title: 'Components/Buttons/BtnSecondary',
  component: BtnSecondary,
};

const Template: Story<BtnSecondaryProps> = (args) => <BtnSecondary {...args} />;
export const Default = Template.bind({});
Default.args = {
  onClick: () => {
    console.log('clicked');
  },
  text: 'Default',
  src: appointmentsSvg,
  backgroundColor: '#FDF7C3',
};

export const AppointmentsButton = Template.bind({});
AppointmentsButton.args = {
  onClick: () => {
    console.log('clicked');
  },
  text: 'Appointments',
  src: appointmentsSvg,
  backgroundColor: '#FDF7C3',
};

export const MyPetsButton = Template.bind({});
MyPetsButton.args = {
  onClick: () => {
    console.log('clicked');
  },
  text: 'My Pets',
  src: myPetsSvg,
  backgroundColor: '#F9F5EB',
};

export const RewardsButton = Template.bind({});
RewardsButton.args = {
  onClick: () => {
    console.log('clicked');
  },
  text: 'Rewards',
  src: rewardsSvg,
  backgroundColor: '#ECF2FF',
};

export const HelpButton = Template.bind({});
HelpButton.args = {
  onClick: () => {
    console.log('clicked');
  },
  text: 'Help',
  src: helpSvg,
  backgroundColor: '#DAF5FF',
};
