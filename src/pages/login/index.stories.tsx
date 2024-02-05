import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import LoginPageDumb, { LoginPageDumbProps } from './index.dumb';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Pages/Login',
  component: LoginPageDumb,
} as Meta;

const Template: Story<LoginPageDumbProps> = (args) => {
  return (
    <BrowserRouter>
      <LoginPageDumb
        {...args}
      />
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {};
