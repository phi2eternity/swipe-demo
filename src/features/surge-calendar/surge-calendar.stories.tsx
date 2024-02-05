import React from "react";

import {ComponentStory, ComponentMeta} from "@storybook/react";
import SurgeCalendar from "@features/surge-calendar/surge-calendar";
import {Provider as InjectionProvider} from "inversify-react";
import {getTestContainer} from "@utils/inversion-container-test";

export default {
  title: "Surge Calendar", component: SurgeCalendar,
} as ComponentMeta<typeof SurgeCalendar>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof SurgeCalendar> = () => (<InjectionProvider container={getTestContainer()}>
    <SurgeCalendar/>
  </InjectionProvider>);

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
