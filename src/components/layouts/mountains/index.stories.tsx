import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Mountains, { MountainsProps } from './index';

export default {
  title: 'Components/Layouts/Mountains',
  component: Mountains,

} as Meta;

const Template: Story<MountainsProps> = (args) => <Mountains {...args} />;
export const Default = Template.bind({});
Default.args = {

};

export const Top = Template.bind({});
Top.args = {
  top: 32

};

export const Left = Template.bind({});
Left.args = {
  left: 32
};

export const Right = Template.bind({});
Right.args = {
  right: 32
};

export const Bottom = Template.bind({});
Bottom.args = {
  bottom: 32
};
