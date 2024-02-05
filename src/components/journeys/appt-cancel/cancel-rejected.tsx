import style from '@components/journeys/appt-cancel/index.module.scss';
import { Close } from '@mui/icons-material';
import SelectBottomDrawer from '@components/drawers/select-bottom-drawer/select-bottom-drawer';
import React from 'react';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';

export interface CancelRejectedProps {
  onNext?: () => void;
  onClose?: () => void;
}

const CancelRejected = ({  onNext, onClose }: CancelRejectedProps) => {
  return <SelectBottomDrawer open={true}>
  <div className={style.apptRemovalJourney}
  >
  <div data-testid={"appt-cancel-cancel-reason"} className={style.apptRemovalJourneyHeader}>
    <h1>Cancel appointment</h1>
  <Close onClick={onClose} />
  </div>
  <div className={style.apptRemovalJourneyContent}>
  <div style={{height:"32px"}}/>
  <h3 className={style.apptRemovalJourneyRejected}>Your appointment cannot be cancelled due to cancellation policy.</h3>
  <div style={{height:"32px"}}/>
  </div>
  <CtaPrimary content={"I understand"} onClick={onNext} />
  </div>


  </SelectBottomDrawer>
}

export default CancelRejected;
