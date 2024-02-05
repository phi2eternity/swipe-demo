
import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import StatsCard, { StatsCardProps } from './index'
import { faker } from '@faker-js/faker';


export default {
  title: 'Components/Cards/StatsCard',
  component: StatsCard
} as Meta;

const StatsCardTemplate: Story<StatsCardProps> = (args) => <StatsCard {...args} />;
export const Default = StatsCardTemplate.bind({});
Default.args = {

}

export const WithCaption = StatsCardTemplate.bind({});
WithCaption.args = {
  caption: "Caption"
}

export const WithValue = StatsCardTemplate.bind({});
WithValue.args = {
value: "Value"
}

export const WithCaptionAndValue = StatsCardTemplate.bind({});
WithCaptionAndValue.args = {
  caption: "Caption",
  value: "Value"
}

export const WithLongCaptionAndValue = StatsCardTemplate.bind({});
WithLongCaptionAndValue.args = {
  caption: faker.lorem.paragraphs(5)
}

export const WithLongValueAndLongCaption = StatsCardTemplate.bind({});
WithLongValueAndLongCaption.args = {
  caption: faker.lorem.paragraphs(5),
  value: faker.lorem.paragraphs(5)
}
