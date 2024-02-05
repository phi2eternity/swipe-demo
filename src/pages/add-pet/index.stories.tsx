import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AddPetPage, { AddPetPageProps } from "./index.dumb";
import PageCard from '@components/cards/page-card/page-card';

export default {
  title: "Pages/AddPet",
  component: AddPetPage,
} as Meta;

const Template: Story<AddPetPageProps> = (args) => {
  return <PageCard>
    <AddPetPage {...args} />
  </PageCard>;
}

export const AddPet = Template.bind({});
AddPet.args = {

}

