import React from 'react'
import style from './index.module.scss';
import { Meta, Story } from '@storybook/react';
import PolicyDumb, { PolicyDumpProps } from './index.dumb';
import PageCard from '@components/cards/page-card/page-card';

export default {
  title: 'Pages/Policy',
  component: PolicyDumb,
}

const Template: Story<PolicyDumpProps> = (args) => <PageCard><PolicyDumb {...args} /></PageCard>;
export const Default = Template.bind({});
Default.args = {

};
