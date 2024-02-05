import React from "react";
import imageSrc from "../../../assets/mockPhoto.png";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import PromotionCard from "./promotion-card";

export default {
  title: "Promotion Card",
  component: PromotionCard,
} as ComponentMeta<typeof PromotionCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PromotionCard> = (args) => (
  <PromotionCard title="Maecenas lacus vel facilisis" imageSrc={imageSrc} />
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
