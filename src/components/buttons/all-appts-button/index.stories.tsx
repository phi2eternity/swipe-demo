import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import AllApptsButton, { AllApptsButtonProps } from './index';

export default {
  title: 'Components/Buttons/AllApptsButton', component: AllApptsButton,

} as Meta;

const Template: Story<AllApptsButtonProps> = (args) => <AllApptsButton {...args} />;
export const Default = Template.bind({});
Default.args = {
  onClick: () => {console.log("clicked")},
};
