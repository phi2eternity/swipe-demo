import React from 'react';
import { ListItemCard, ListItemCardProps } from './index';
import {Meta, Story} from '@storybook/react/types-6-0';
import PageCard from '@components/cards/page-card/page-card';
import { faker } from '@faker-js/faker';

export default {
  title: 'Components/Cards/ListItemCard',
  component: ListItemCard,
} as Meta;

const Template: Story<ListItemCardProps> = (args) => <PageCard><ListItemCard {...args} /></PageCard>;
export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  value: 'Value'
}

export const Empty = Template.bind({});
Empty.args = {

}

export const VeryLongLabel = Template.bind({});
VeryLongLabel.args = {
  value:"value",
  label: faker.lorem.paragraph(20),
}

export const VeryLongValue = Template.bind({});
VeryLongValue.args = {
  label: 'Label',
  value: faker.lorem.paragraph(20),
}

export const VeryLongLabelAndValue = Template.bind({});
VeryLongLabelAndValue.args = {
  label: faker.lorem.paragraph(20),
  value: faker.lorem.paragraph(20),
}
