import React from 'react';
import { Meta, Story } from '@storybook/react';
import PetGenderSelect,{PetGenderSelectProps} from '@components/inputs/pet-gender-select/index';

export default {
  title: 'Components/Inputs/PetGenderSelect', component: PetGenderSelect,
} as Meta;



const Template: Story<PetGenderSelectProps> = (args) => <PetGenderSelect {...args} />;
export const Default = Template.bind({});


