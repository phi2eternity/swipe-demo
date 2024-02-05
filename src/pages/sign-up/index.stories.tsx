import SignUpPageDumb, { SignUpPageDumbProps } from './index.dumb';
import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Pages/SignUp',
  component: SignUpPageDumb,
} as Meta;

const Template: Story<SignUpPageDumbProps> = (args) => {

  return (
    <BrowserRouter>
      <SignUpPageDumb
        {...args}

      />
    </BrowserRouter>
  );
};
export const Default = Template.bind({});
Default.args = {};
