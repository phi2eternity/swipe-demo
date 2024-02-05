import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProfileCard from "./profile-card";

export default {
  title: "Profile cards",
  component: ProfileCard,
} as ComponentMeta<typeof ProfileCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
