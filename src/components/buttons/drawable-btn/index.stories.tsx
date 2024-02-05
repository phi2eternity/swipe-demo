import React from "react";
import DrawableBtn, { DrawableBtnProps } from "./index";
import { Story, Meta } from "@storybook/react";
import { faker } from '@faker-js/faker';

export default {
  title: "Components/Buttons/DrawableBtn",
component: DrawableBtn,
}

const Template: Story<DrawableBtnProps> = (args) => <DrawableBtn {...args} />;
export const Default = Template.bind({});
Default.args = {
  text: "Default",
}

const veryLongText = "Very long text that will be truncated";

export const Truncated = Template.bind({});
Truncated.args = {
  text: veryLongText,
}

const veryVeryLongText = faker.lorem.paragraph(25);

export const Truncated2 = Template.bind({});
Truncated2.args = {
  text: veryVeryLongText,
}
