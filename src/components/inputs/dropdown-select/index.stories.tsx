import React from 'react';
import { Meta, Story } from '@storybook/react';
import DropdownSelect, { DropdownSelectProps } from './index';

export default {
  title: 'Components/Inputs/DropdownSelect', component: DropdownSelect,
};

const options = [{
  value: 'Poodle', label: 'Poodle',
}, {
  value: 'Golden Retriever', label: 'Golden Retriever',
}];

const Template: Story<DropdownSelectProps<string>> = (args) => <DropdownSelect {...args} />;
export const Default = Template.bind({});
Default.args = {
  options
};

export const WithInitialValue = Template.bind({});


WithInitialValue.args = {
  ...Default.args,
   initialValue: options[0],
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  label: 'Select breed',
}

