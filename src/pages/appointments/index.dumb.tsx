import { AppointmentEntity } from '@domain/types/common/appointment';
import { PetEntity } from '@domain/types/common/pet';
import style from './index.module.scss';
import { BiLeftArrow } from 'react-icons/bi';
import DropdownSelect, { DropdownSelectItem } from '@components/inputs/dropdown-select';
import { useState } from 'react';
import ApptCardFactory from '@components/cards/appt-card/factory';
import SelectBottomDrawer from '@components/drawers/select-bottom-drawer/select-bottom-drawer';
import { Close } from '@mui/icons-material';
import WarningBtn from '@components/buttons/warning-btn/warning-btn';
import WeakBtn from '@components/buttons/weak-btn/weak-btn';
import { PetDetailsEntity } from '@domain/types/common/pet-details';

export interface AppointmentsPageDumbProps {
  appointments?: AppointmentEntity[];
  pets?: PetDetailsEntity[];
  goBack?: () => void;
  onApptClicked?: (appt: AppointmentEntity) => void;
}

const AppointmentsPageDumb = ({
                                appointments = [], pets = [], goBack, onApptClicked,
                              }: AppointmentsPageDumbProps) => {

  const [selectedPet, setSelectedPet] = useState<string>('All Pets');
  const [time, setTime] = useState<string>('All');
  const [open, setOpen] = useState(false);
  const [appointment, setAppointment] = useState<AppointmentEntity | null>(null);


  const petOptions: DropdownSelectItem<string>[] = pets.map(pet => ({
    label: pet.name, value: pet.name,
  }));
  const initialValue = { label: 'All Pets', value: 'All Pets' };
  petOptions.push(initialValue);

  const initialValue2 = {
    label: 'All', value: 'All',
  };
  const options = [initialValue2, {
    label: 'Upcoming', value: 'Upcoming',
  }, {
    label: 'Past', value: 'Past',
  }];

  let filteredAppointments = appointments.filter((appt) => {
    const now = new Date().getTime();
    const startTime = new Date(appt.start).getTime();
    if (time === 'Upcoming') {
      return startTime > now;
    } else if (time === 'Past') {
      return startTime <= now;
    }
    return true;
  });

  filteredAppointments = filteredAppointments
    .sort((a, b) => {
      const aDate = new Date(a.start);
      const bDate = new Date(b.start);
      if (aDate.getTime() >= bDate.getTime()) {
        return 1;
      } else {
        return -1;
      }
    })
    .filter((appt) => {
      if (selectedPet === 'All Pets') {
        return true;
      } else {
        return appt.pet.name === selectedPet;
      }
    });

  const handleApptClicked = (appt: AppointmentEntity) => {
    onApptClicked?.(appt);
    setAppointment(appt);
    setOpen(true);
  };


  return <div className={style.appointmentsPage}>
    <div className={style.appointmentsPageHeader}>
      <div data-testid={'bi-left-arrow'}>
        <BiLeftArrow onClick={goBack} />
      </div>
      <h1>Appointments</h1>
    </div>
    <div style={{
      height: '40px',
    }}></div>
    <div className={style.appointmentsPageContent}>
      <div className={style.appointmentsPageContent__header}>
        <DropdownSelect label={"Filter pets"} onSelect={setSelectedPet} options={petOptions} initialValue={initialValue} />
        <DropdownSelect label={"Filter appointments"} onSelect={setTime} options={options} initialValue={initialValue2} />
      </div>
      <div className={style.appointmentsPageContent__body}>
        {filteredAppointments.length === 0 ?
          <p data-testid={'appointments-page-no-appts-available'} className={style.appointmentsPageContent__bodyText}>No
            appointments available</p> : filteredAppointments.map((appt) => <ApptCardFactory key={appt.id}
                                                                                             status={appt.status}
                                                                                             onClick={() => handleApptClicked(appt)}
                                                                                             date={appt.start}
                                                                                             branch={appt.branch}
                                                                                             employee={appt.employee}
                                                                                             service={appt.appointment_type} />)


        }
      </div>

    </div>


  </div>;
};

export default AppointmentsPageDumb;
