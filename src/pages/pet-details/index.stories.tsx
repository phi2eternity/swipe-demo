import React from "react"
import { Story, Meta } from "@storybook/react/types-6-0"

import PetDetailsPageDumb,{  PetDetailsPageDumbProps } from "./index.dumb"
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import PageCard from '@components/cards/page-card/page-card';


export default {
  title: "Pages/PetDetails",
  component: PetDetailsPageDumb,
} as Meta;

const petDetailsGenerator = new PetDetailsMockGenerator();
const petDetails = petDetailsGenerator.generateOne();


const Template: Story<PetDetailsPageDumbProps> = (args) => <PageCard><PetDetailsPageDumb {...args} /></PageCard>;
export const Default = Template.bind({});
Default.args = {
  pet: petDetails
};




