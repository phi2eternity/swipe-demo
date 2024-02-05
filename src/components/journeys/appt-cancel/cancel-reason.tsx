import { AppointmentEntity } from '@domain/types/common/appointment';
import SelectBottomDrawer from '@components/drawers/select-bottom-drawer/select-bottom-drawer';
import React from 'react';
import style from './index.module.scss';
import { Close } from '@mui/icons-material';
import DrawableBtn from '@components/buttons/drawable-btn';


export interface CancelReasonFormProps {
  onReasonSelected?: (reason: string) => void;
  appointment?: AppointmentEntity;
  onNext: () => void;
  onClose?: () => void;
}


const CancelReasonForm = ({onReasonSelected,onClose,onNext} : CancelReasonFormProps) => {

  const handleReasonSelected = (reason: string) => {
    onReasonSelected && onReasonSelected(reason);
    onNext && onNext();
  }

  return     <SelectBottomDrawer open={true}>
    <div className={style.apptRemovalJourney}
    >
      <div data-testid={"appt-cancel-cancel-reason"} className={style.apptRemovalJourneyHeader}>
        <h1>Cancel appointment</h1>
        <Close onClick={onClose} />
      </div>
      <div className={style.apptRemovalJourneyContent}>
        <p className={style.apptRemovalJourneyText}>Appointments need to be cancelled/changed at a minimum of 24 hours in advance from your appointment time to avoid being charged the full price of the service.</p>
        <DrawableBtn text={"Scheduling conflicts"} onClick={() => handleReasonSelected("Scheduling conflicts")}/>
        <DrawableBtn text={"I don't need this appointment"} onClick={() => handleReasonSelected("I don't need this appointment")}/>
        <DrawableBtn text={"I'm not feeling well"} onClick={() => handleReasonSelected("I'm not feeling well")}/>
        <DrawableBtn text={"Other"} onClick={() => handleReasonSelected("Other")}/>
        <div style={{height:"32px"}}/>
      </div>
    </div>


  </SelectBottomDrawer>
}

export default CancelReasonForm;
