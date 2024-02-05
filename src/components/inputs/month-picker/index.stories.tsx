
import React, { useState } from 'react';
import { Meta, Story } from "@storybook/react";
import MonthPickerDumb, { MonthPickerDumbProps } from "./index.dumb";

export default {
  title: "Components/Inputs/MonthPicker",
  component: MonthPickerDumb,
} as Meta;

const Template: Story<MonthPickerDumbProps> = (args) => {
  const [currentMonth, setCurrentMonth] = useState(6);

  const selectMonth = (month: number) => {
    setCurrentMonth(month);
  };

  return <MonthPickerDumb month={currentMonth} onSubmit={selectMonth} />;
}
export const Default = Template.bind({});
Default.args = {

};
