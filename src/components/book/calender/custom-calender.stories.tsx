import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import CustomCalendar from "./custom-calender";

export default {
  title: "Custom Calender",
  component: CustomCalendar,
} as ComponentMeta<typeof CustomCalendar>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof CustomCalendar> = () => (
  <CustomCalendar  />
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
