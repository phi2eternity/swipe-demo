import { ExpiryDate, ExpiryDateProps } from '@components/inputs/expiry-date';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'Components/Inputs/ExpiryDate',
  component: ExpiryDate,
} as Meta;

const Template: Story<ExpiryDateProps> = (args) => {
  return <ExpiryDate {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
