import React from 'react';
import { Story, Meta } from '@storybook/react';
import PetStatsCard, { PetStatsCardProps } from './index';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';

export default {
  title: 'Components/Cards/PetStatsCard',
  component: PetStatsCard,
} as Meta;

const petDetailsGenerator  = new PetDetailsMockGenerator();
const pet = petDetailsGenerator.generateOne();

const Template: Story<PetStatsCardProps> = (args) => <PetStatsCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  pet
}

export const WithOnClick = Template.bind({});
WithOnClick.args = {
  ...Default.args,
  onClick: () => {console.log('clicked')},
}

