import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import CancelReasonForm,{  CancelReasonFormProps } from './cancel-reason';
import ApptRemovalJourney from '@components/journeys/appt-cancel/index';
import CancelConfirmationDrawer from '@components/journeys/appt-cancel/cancel-confirmation';
import CancelRejectedDrawer from '@components/journeys/appt-cancel/cancel-rejected';

export default {
  title: 'Journeys/ApptRemoval',
  component: ApptRemovalJourney
} as Meta;

const CancelReasonTemplate: Story<CancelReasonFormProps> = (args) => <CancelReasonForm {...args} />;
export const CancelReason = CancelReasonTemplate.bind({});
CancelReason.args = {
  onReasonSelected: (reason: string) => {
    console.log("reason selected: " + reason);
  }
}

const CancelConfirmationTemplate: Story<CancelReasonFormProps> = (args) => <CancelConfirmationDrawer {...args} />;
export const CancelConfirmation = CancelConfirmationTemplate.bind({});
CancelConfirmation.args = {
}

const CancelRejectedTemplate: Story<CancelReasonFormProps> = (args) => <CancelRejectedDrawer {...args} />;
export const CancelRejected = CancelRejectedTemplate.bind({});
CancelRejected.args = {

}
