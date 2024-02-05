import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import SlotCard from "./slot-card";

export default {
  title: "SlotCard",
  component: SlotCard,
} as ComponentMeta<typeof SlotCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof SlotCard> = (args) => (
  <SlotCard time={"09:00"} availabilty={false} width="25%" selected={true} />
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
