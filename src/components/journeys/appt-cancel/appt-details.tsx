import style from '@pages/appointments/index.module.scss';
import { Close } from '@mui/icons-material';
import WeakBtn from '@components/buttons/weak-btn/weak-btn';
import { AppointmentEntity } from '@domain/types/common/appointment';
import SelectBottomDrawer from '@components/drawers/select-bottom-drawer/select-bottom-drawer';


export interface ApptDetailsProps {
  appointment: AppointmentEntity | null;
  onClose: () => void;
  onNext: () => void;
}

const ApptDetails = ({
                        appointment, onClose,onNext
                     }: ApptDetailsProps) => {
  return <SelectBottomDrawer open={true}>
    <div data-testid={"appointments-drawer-header"} className={style.appointmentsDrawerHeader}>
      <h1>Appointment Details</h1>
      <Close onClick={onClose} />
    </div>
    <div className={style.appointmentsDrawerBody}>
      <div className={style.appointmentsDrawerBody__row}>
        <p>Date-Time</p>
        <p>{appointment?.start}</p>
      </div>
      {appointment?.employee && <div className={style.appointmentsDrawerBody__row}>
        <p>Groomer</p>
        <p>{appointment?.employee.name}</p>
      </div>}
      <div className={style.appointmentsDrawerBody__row}>
        <p>Branch</p>
        <p>{appointment?.branch.name}</p>
      </div>
    </div>
    <div style={{height:"32px"}}/>
    <WeakBtn onClick={onNext} content={'Cancel Appointment'} />

  </SelectBottomDrawer>;
}

export default ApptDetails;
