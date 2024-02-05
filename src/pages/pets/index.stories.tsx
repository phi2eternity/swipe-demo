import React from 'react';
import { Meta, Story } from '@storybook/react';

import PetsPageDumb, { PetsPageDumbProps } from './index.dumb';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import PageCard from '@components/cards/page-card/page-card';

export default {
  title: 'Pages/Pets',
  component: PetsPageDumb,
}

const petDetailsGenerator = new PetDetailsMockGenerator();
const pets = petDetailsGenerator.generateMany(5);

const Template: Story<PetsPageDumbProps> = (args) => <PageCard><PetsPageDumb {...args} /></PageCard>;

export const Default = Template.bind({});
Default.args = {
  pets:[]
}

export const WithPets = Template.bind({});
WithPets.args = {
  pets
}

export const WithPetsAndClick = Template.bind({});
WithPetsAndClick.args = {
  pets,
  onClickPet: (pet) => {
console.log("pet clicked: ",pet);
  },
  goBack: () => {
    console.log("go back clicked");
  }
};

