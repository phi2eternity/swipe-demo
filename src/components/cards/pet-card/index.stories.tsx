import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import PetCard from "./index";

export default {
  title: "Components/Cards/PetCard",
  component: PetCard,
} as ComponentMeta<typeof PetCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PetCard> = (args) => (
  <PetCard {...args}/>
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  name: "John Foo",
  age: "5 years old",
}

export const Expired = Template.bind({});
Expired.args = {
  name: "John Foo",
  age: "5 years old",
  expired: true,
}

