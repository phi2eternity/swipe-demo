import React from 'react';
import { PageLayout, PageLayoutProps } from './index';
import {Meta,Story} from '@storybook/react/types-6-0';
import PageCard from '@components/cards/page-card/page-card';

export default {
  title: 'Components/Layouts/PageLayout',
  component: PageLayout,
} as Meta;

const Template: Story<PageLayoutProps> = (args) => <PageCard><PageLayout {...args} /></PageCard>;
export const Default = Template.bind({});
Default.args = {
  name: 'Page Layout',
  children: <div>Content</div>,
  onClick: () => console.log('clicked'),
}
