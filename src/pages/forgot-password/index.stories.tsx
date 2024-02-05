import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ForgotPasswordPageDumb, {
  ForgotPasswordPageDumbProps,
} from './index.dumb';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Pages/ForgotPassword',
  component: ForgotPasswordPageDumb,
} as Meta;

const Template: Story<ForgotPasswordPageDumbProps> = (args) => (
  <BrowserRouter>
    <ForgotPasswordPageDumb {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
