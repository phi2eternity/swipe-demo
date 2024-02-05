import ErrorPopupDumb, { ErrorPopupDumbProps } from './index.dumb';
import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import style from './index.module.scss';

export default {
  title: 'Components/Popups/ErrorPopup',
  component: ErrorPopupDumb,
};

const Template: Story<ErrorPopupDumbProps> = (args) => {
  const [message, setMessage] = useState(args.message || '');
  const [divClass, setDivClass] = useState(style.errorPopUp);
  useEffect(() => {
    if (!message) return;
    setDivClass(style.errorPopUpActive);
    setTimeout(() => {
      setDivClass(style.errorPopUp);
    }, 3000);
  }, [message]);
  return (
    <Fragment>
      <ErrorPopupDumb {...args} divClass={divClass} />
    </Fragment>
  );
};

export const Default = Template.bind({});

Default.args = {
  message: 'Error message example login failed',
};
