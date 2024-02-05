import SelectBottomDrawer from '@components/drawers/select-bottom-drawer/select-bottom-drawer';
import React, { Fragment } from 'react';
import { DailyAvailableSlot } from '@domain/types/responses/daily-available-slots-response';
import styles from '@features/available-slots/available-slots-drawer.module.scss';
import { Close } from '@mui/icons-material';
import BookCard from '@components/cards/book-card/book-card';
import TextInputControlled from '@components/inputs/text-input';

interface AvailableSlotsDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  slots: DailyAvailableSlot[];
  timeOfDay: string;
  onSelect?: (slot: DailyAvailableSlot) => void;
}

const AvailableSlotsDrawer = ({
  open,
  setOpen,
  slots,
  onSelect,
  timeOfDay,
}: AvailableSlotsDrawerProps) => {
  const toggle = () => setOpen(!open);

  const getCards = (slots: DailyAvailableSlot[]) => {
    return slots.map((slot) => {
      const key = `${slot.branch.id}-${slot.employee.id}-${slot.start}`;
      return (
        <div
          data-testid={'available-slots-book-cards'}
          key={key}
          className={styles.availableSlot__bookCard}
        >
          <BookCard
            key={JSON.stringify(slot)}
            text={slot.employee.name}
            onClick={() => {
              onSelect && onSelect(slot);
            }}
          />
        </div>
      );
    });
  };

  const branchMap: { [key: number]: DailyAvailableSlot[] } = {};

  slots.forEach((slot) => {
    if (branchMap[slot.branch.id]) {
      branchMap[slot.branch.id].push(slot);
    } else {
      branchMap[slot.branch.id] = [slot];
    }
  });

  return (
    <SelectBottomDrawer open={open}>
      <div className={styles.dropdownBtnTemplate__header}>
        <h2>Book appointment</h2>
        <Close onClick={toggle} />
      </div>
      <div style={{ height: '16px' }} />
      <div style={{ marginLeft: '16px' }} data-testid={'available-slots-text'}>
        <TextInputControlled
          label={'Recommended groomers for at'}
          value={timeOfDay}
        />
      </div>
      <div style={{ height: '16px' }} />

      <div>
        {Object.keys(branchMap).map((key) => {
          const branchId = parseInt(key);
          return branchMap[branchId] ? (
            <div key={branchId}>
              <div className={styles.availableSlot__branchHeader}>
                <h3>{branchMap[branchId][0].branch.name as string}</h3>
                <p className={'caption-2'}>
                  {branchMap[branchId][0].branch.address as string}
                </p>
              </div>
              <div>{getCards(branchMap[branchId])}</div>
            </div>
          ) : (
            <Fragment></Fragment>
          );
        })}
      </div>
      <div style={{ height: '16px' }} />
    </SelectBottomDrawer>
  );
};

export default AvailableSlotsDrawer;
