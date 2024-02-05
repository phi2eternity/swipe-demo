import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import StoreSelector from "./dropdown";
import Dropdown from "./dropdown";

StoreSelector;

export default {
  title: "Dropdown-menu",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown
    dropdownList={["aaaaa", "veeeee", "sfewafwafwa", "awefweafawf"]}
    width="50%"
    dropdownTitle="Select a store"
  />
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
