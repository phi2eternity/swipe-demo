import React from 'react';
import { Story, Meta } from '@storybook/react';
import ServiceHeaderDumb,{ServiceHeaderDumbProps} from '@features/service-header/service-header.dumb';

export default {
  title: 'Features/ServiceHeader',
  component: ServiceHeaderDumb,
}

const Template: Story<ServiceHeaderDumbProps> = (args) => <ServiceHeaderDumb {...args} />;
export const SelectableGrooming = Template.bind({});
SelectableGrooming.args = {
  selectable: true,
  type: "Grooming",
  goBack: () => {},
  petNames: ["Pet 1","Pet 2"],
  handleChange: () => {},
  title: "Book for",
}

export const NotSelectableGrooming = Template.bind({});
NotSelectableGrooming.args = {
  selectable: false,
  type: "Grooming",
  goBack: () => {},
  petNames: ["Pet 1","Pet 2"],
  handleChange: () => {},
  title: "Book for",

}

export const SelectableWeWash = Template.bind({});
SelectableWeWash.args = {
  selectable: true,
  type: "WeWash",
  goBack: () => {},
  petNames: ["Pet 1","Pet 2"],
  handleChange: () => {},
  title: "Book for",

}

export const NotSelectableWeWash = Template.bind({});
NotSelectableWeWash.args = {
  selectable: false,
  type: "WeWash",
  goBack: () => {},
  petNames: ["Pet 1","Pet 2"],
  handleChange: () => {},
  title: "Book for",
}




