import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { AddCreditCardDumb,AddCreditCardDumbProps} from '@pages/add-credit-card/index.dumb';

export default {
  title: "Pages/AddCreditCard",
  component: AddCreditCardDumb,
} as Meta;

const Template: Story<AddCreditCardDumbProps> = (args) => {
  return <AddCreditCardDumb {...args} />;
}
Template.bind({});
export const AddCreditCard = Template.bind({});
AddCreditCard.args = {

}
