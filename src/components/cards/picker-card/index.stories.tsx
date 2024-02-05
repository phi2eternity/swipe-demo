import React from 'react';
import PickerCard from './index';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Components/Cards/PickerCard', component: PickerCard,
} as Meta;

const Template: Story = (args) => <PickerCard {...args} />;
export const Default = Template.bind({});
Default.args = {
  title: 'Pick a date', onClick: () => {
    console.log('clicked');
  }
};

export const Selected = Template.bind({});
Selected.args = {
  title: 'Pick a date', onClick: () => {
    console.log('clicked');
  },
  selected: true
}
