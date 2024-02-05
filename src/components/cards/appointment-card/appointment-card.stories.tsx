import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import AppointmentCard from "./appointment-card";

export default {
  title: "Components/Cards/Appointment Card",
  component: AppointmentCard,
} as ComponentMeta<typeof AppointmentCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof AppointmentCard> = (args) => (
  <AppointmentCard
    name="Emma"
    location="Royal Oak Pet Grooming"
    date="Mar. 23"
    time="9:30 Saturday"
  />
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
