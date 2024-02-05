import React from 'react';
import { Meta, Story } from '@storybook/react';
import CtaSecondary, { CtaSecondaryProps } from './index';
import { faker } from '@faker-js/faker';

export default {
  title: 'Components/Buttons/CtaSecondary',
  component: CtaSecondary,
} as Meta

const Template: Story<CtaSecondaryProps> = (args) => <CtaSecondary {...args} />;
export const Default = Template.bind({});
Default.args = {
  text: 'Default'
}

export const WithOnClick = Template.bind({});
WithOnClick.args = {
  ...Default.args,
  onClick: () => {
    console.log('clicked')
  }
}

export const WithLongText = Template.bind({});
WithLongText.args = {
  text: 'This is a very long text that will be truncated',
}

export const WithLongTextAndOnClick = Template.bind({});
WithLongTextAndOnClick.args = {
  text: faker.lorem.paragraphs(10),
  onClick: () => {
  }
}

