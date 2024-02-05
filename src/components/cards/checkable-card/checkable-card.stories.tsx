import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import CheckableCard, { CheckableCardProps } from "./checkable-card";
import { faker } from '@faker-js/faker';

export default {
  title: "Components/CheckableCard",
  component: CheckableCard,
  argTypes: {
    title: {
      control: "text",
      defaultValue: "Sample Title",
    },
    content: {
      control: "text",
      defaultValue: "Sample Content",
    },
    checked: {
      control: "boolean",
      defaultValue: false,
    },
    onClicked: {
      action: "clicked",
    },
  },
} as Meta;

const Template: Story<CheckableCardProps> = (args) => <CheckableCard {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  checked: true,
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  ...Default.args,
  title: "Custom Title",
};

export const CustomContent = Template.bind({});
CustomContent.args = {
  ...Default.args,
  content: "Custom content goes here",
};

export const CustomTitleAndContent = Template.bind({});
CustomTitleAndContent.args = {
  ...CustomTitle.args,
  ...CustomContent.args,
};

export const CustomTitleAndContentAndChecked = Template.bind({});
CustomTitleAndContentAndChecked.args = {
  ...CustomTitleAndContent.args,
  ...Checked.args,

}

export const VeryLongContent = Template.bind({});
VeryLongContent.args = {
  ...Default.args,
  content: faker.lorem.paragraphs(3),
}

export const VeryLongTitle = Template.bind({});
VeryLongTitle.args = {
  ...Default.args,
  title: faker.lorem.paragraphs(3),

}
export const VeryVeryLongTitleAndContent = Template.bind({});
VeryVeryLongTitleAndContent.args = {
  ...VeryLongContent.args,
  ...VeryLongTitle.args,
  title: faker.lorem.paragraphs(5),
  content: faker.lorem.paragraphs(5),
}

export const VeryVeryLongTitleAndContentAndChecked = Template.bind({});
VeryVeryLongTitleAndContentAndChecked.args = {
  ...VeryVeryLongTitleAndContent.args,
  ...Checked.args,

}

