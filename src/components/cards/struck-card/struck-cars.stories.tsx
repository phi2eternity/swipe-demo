import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import StruckCard, { StruckCardProps } from './struck-card';
import { faker } from '@faker-js/faker';

export default {
  title: 'Components/StruckCard',
  component: StruckCard,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<StruckCardProps> = (args) => <StruckCard {...args} />;


export const Basic = Template.bind({});
Basic.args = {
  content: 'Basic Struck Card',
  checked: false,
  onClick: () => {
  },
  price: 80,
};

export const Checked = Template.bind({});
Checked.args = {
  content: 'Checked Struck Card',
  checked: true,
  onClick: () => {
    console.log('clicked');
  },
  struckPrice: 100,
  price: 80,
};

export const DifferentPrices = Template.bind({});
DifferentPrices.args = {
  content: 'Struck Card with Different Prices',
  checked: false,
  onClick: () => {
    console.log('clicked');
  },
  struckPrice: 150,
  price: 120,
};

export const LongContent = Template.bind({});
LongContent.args = {
  content: 'Struck Card with a Longer Content Description for Testing',
  onClick: () => {

  },
  struckPrice: 100,
  price: 80,
};
export const LongContentAndChecked = Template.bind({});
LongContentAndChecked.args = {
  ...Checked.args,
  ...LongContent.args,
}


export const VeryLongContent = Template.bind({});
VeryLongContent.args = {
  content: faker.lorem.paragraphs(2),
}

export const VeryLongContentAndChecked = Template.bind({});
VeryLongContentAndChecked.args = {
  ...Checked.args,
  ...VeryLongContent.args,
}

export const VeryVeryLongContent = Template.bind({});
VeryVeryLongContent.args = {
  content: faker.lorem.paragraphs(5),
}

export const VeryVeryLongContentAndChecked = Template.bind({});
VeryVeryLongContentAndChecked.args = {
  ...Checked.args,
  ...VeryVeryLongContent.args,
}
