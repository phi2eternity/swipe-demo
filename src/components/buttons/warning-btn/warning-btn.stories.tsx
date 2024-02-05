import React from 'react';
import { Story, Meta } from '@storybook/react';
import WarningBtn, { WarningBtnDumbProps } from './warning-btn';
import { faker } from '@faker-js/faker';

export default {
  title: 'Components/Buttons/Warning Button',
  component: WarningBtn,
}

const Template: Story<WarningBtnDumbProps> = (args) => <WarningBtn {...args} />;
export const Default = Template.bind({});
Default.args = {
  content: 'Warning Button',
}

export const LongTextWarningBtn = Template.bind({});
LongTextWarningBtn.args = {
  content: 'Warning Button with long text',
};

export const VeryLongTextWarningBtn = Template.bind({});
VeryLongTextWarningBtn.args = {
  content: faker.lorem.paragraph(5),
}

