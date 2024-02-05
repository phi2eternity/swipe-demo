import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import CtaCancel, { CtaPrimaryProps } from './index';
import { faker } from '@faker-js/faker';

export default {
  title: 'Components/Buttons/CtaPrimary',
  component: CtaCancel,
}

const Template: Story<CtaPrimaryProps> = (args) => <CtaCancel {...args} />;
export const Default = Template.bind({});
Default.args = {

}

export const WithValue = Template.bind({});
WithValue.args = {
  content: 'Click me',
}

export const VeryLongValue = Template.bind({});
VeryLongValue.args = {
  content: faker.lorem.paragraphs(30)
}

