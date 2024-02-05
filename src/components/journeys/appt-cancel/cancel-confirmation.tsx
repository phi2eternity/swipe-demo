import style from '@components/journeys/appt-cancel/index.module.scss';
import { Close } from '@mui/icons-material';
import SelectBottomDrawer from '@components/drawers/select-bottom-drawer/select-bottom-drawer';
import React from 'react';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';

export interface CancelConfirmationProps {
  onNext?: () => void;
  onClose?: () => void;
}

const CancelConfirmation = ({  onNext, onClose }: CancelConfirmationProps) => {
  return <SelectBottomDrawer open={true}>
    <div className={style.apptRemovalJourney}
    >
      <div data-testid={"appt-cancel-cancel-reason"} className={style.apptRemovalJourneyHeader}>
        <h1>Cancel appointment</h1>
        <Close onClick={onClose} />
      </div>
      <div className={style.apptRemovalJourneyContent}>
        <div style={{height:"32px"}}/>
        <h3>Your appointment will be cancelled.</h3>
        <div style={{height:"32px"}}/>
      </div>
      <CtaPrimary content={"I understand"} onClick={onNext} />
    </div>


  </SelectBottomDrawer>
}

export default CancelConfirmation;
