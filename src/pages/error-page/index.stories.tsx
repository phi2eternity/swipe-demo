import { BrowserRouter } from 'react-router-dom';
import ErrorPage from '.';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Pages/ErrorPage',
  component: ErrorPage,
} as Meta;

const Template: Story = () => {
  return (
    <BrowserRouter>
      <ErrorPage />
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {};
