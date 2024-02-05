import React, { useEffect } from 'react';
import { DailyAvailableSlot } from '@domain/types/responses/daily-available-slots-response';
import {
  GetAvailableSlotsParams,
  GetAvailableSlotsUseCase,
} from '@domain/usecases/available/get-available-slots';
import { useInjection } from 'inversify-react';

export interface AvailableSlotsParams {
  date?: Date;
  duration?: number;
  service?: string;
  branches?: number[];
  employees?: number[];
  times?: string[];
}

const useAvailableSlots = ({
  date = new Date(),
  duration = 60,
  service = 'Grooming',
  branches,
  employees,
  times = ['morning', 'afternoon', 'evening'],
}: AvailableSlotsParams) => {
  const [slots, setSlots] = React.useState<DailyAvailableSlot[]>([]);
  const getAvailableSlots = useInjection(GetAvailableSlotsUseCase);

  const dateStr =
    date?.getDate() < 10 ? '0' + date?.getDate() : date?.getDate();
  const monthStr =
    date?.getMonth() + 1 < 10
      ? '0' + (date?.getMonth() + 1)
      : date?.getMonth() + 1;
  const yearStr = date?.getFullYear();

  const fullDate = `${yearStr}-${monthStr}-${dateStr}`;
  useEffect(() => {
    if (service === 'Grooming') service = 'Grooming';
    else if (service === 'WeWash') service = 'We Wash';

    if (employees?.length === 0 && branches?.length === 0) setSlots([]);
    else {
      const params = {
        date: fullDate,
        employees: employees ?? [],
        branches: branches ?? [],
        service,
        duration,
      } as GetAvailableSlotsParams;

      getAvailableSlots.call(params).then((response) => {
        setSlots(response as DailyAvailableSlot[]);
      });
    }
  }, [dateStr, duration, employees, branches]);

  return slots;
};
export default useAvailableSlots;
