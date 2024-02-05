import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { LoginWithGoogle, LoginWithButtonProps, LoginWithGoogleProps, LoginWith, LoginWithApple } from './index';


export default {
  title: 'Components/Buttons/Login',
  component: LoginWith,
}

const GoogleTemplate: Story<LoginWithGoogleProps> = (args) => <LoginWithGoogle {...args} />
export const WithGoogle = GoogleTemplate.bind({})
WithGoogle.args = {
  onClick: () => {},
}

const AppleTemplate: Story<LoginWithGoogleProps> = (args) => <LoginWithApple {...args} />
export const WithApple = AppleTemplate.bind({})
WithApple.args = {
  onClick: () => {},
}

