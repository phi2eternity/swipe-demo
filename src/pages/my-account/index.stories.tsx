import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0'

import MyAccountDummy, { MyAccountDumbProps } from './index.dumb';
import PageCard from '@components/cards/page-card/page-card';

export default {
  title: 'Pages/MyAccount',
  component: MyAccountDummy,
}

const Template: Story<MyAccountDumbProps> = (args) => <PageCard><MyAccountDummy {...args} /></PageCard>;
export const Default = Template.bind({});
Default.args = {
  name: "John Doe",
  email: "john.doe@gmail.com"
}
