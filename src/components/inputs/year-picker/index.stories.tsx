
import React, { useState } from 'react';
import { Meta, Story } from "@storybook/react";
import YearPickerDumb, { YearPickerDumbProps } from "./index.dumb";

export default {
  title: "Components/Inputs/YearPicker",
  component: YearPickerDumb,
} as Meta;

const Template: Story<YearPickerDumbProps> = (args) => {
  const [currentYear, setCurrentYear] = useState(2023);

  const selectYear = (year: number) => {
    setCurrentYear(year);
  };

  return <YearPickerDumb year={currentYear} onSubmit={selectYear} />;
}
export const Default = Template.bind({});
Default.args = {

};
