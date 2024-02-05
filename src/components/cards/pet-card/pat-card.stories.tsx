import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import PetCard from "./pet-card";

export default {
  title: "Pet cards",
  component: PetCard,
} as ComponentMeta<typeof PetCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PetCard> = (args) => (
  <PetCard name="John Foo" age="5 years old" />
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
