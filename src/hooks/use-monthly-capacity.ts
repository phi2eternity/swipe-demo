import React, { useEffect, useMemo } from 'react';
import { GetMonthlyCapacityUseCase } from '@domain/usecases/capacity/get-monthly-capacity';
import { MonthlyCapacityResponse } from '@domain/types/responses/monthly-capacity-response';
import { CapacityDetails } from '@domain/types/common/capacity-details';
import { useInjection } from 'inversify-react';
import { MonthlyCapacityRequest } from '@domain/types/requests/monthly-capacity-request';


interface UseMonthlyCapacityParams {
  date: Date;
  employees?: number[];
  branches?: number[];
  service: string;

}

const useMonthlyCapacity = ({
  date,
  employees ,
  branches ,
  service
                            } : UseMonthlyCapacityParams) : Map<string, CapacityDetails> => {
  const getMonthlyCapacity = useInjection(GetMonthlyCapacityUseCase);
  const memoizedEmployees = useMemo(() => employees, [employees]);
  const memoizedBranches = useMemo(() => branches, [branches]);
  const memoizedService = useMemo(() => service, [service]);
  const memoizedDate = useMemo(() => date, [date.getMonth()]);

  const [capacityMap, setCapacityMap] = React.useState<Map<string, CapacityDetails>>(new Map<string, CapacityDetails>());

  useEffect(() => {
    const currentDate = date;
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dateString = `${month}/${year}`;
    const params: MonthlyCapacityRequest = {
      date: dateString,
      employees: employees ?? [],
      branches: branches ?? [],
      service,
    };
    getMonthlyCapacity
      .call(params)
      .then((response: MonthlyCapacityResponse) => {
        const capacityDetails = response as CapacityDetails[];
        const newCapacityMap = new Map<string, CapacityDetails>();
        capacityDetails.forEach((capacityDetail: CapacityDetails) => {
          newCapacityMap.set(capacityDetail.date, capacityDetail);
        });
        setCapacityMap(newCapacityMap);
      });

  }, [memoizedEmployees, memoizedService,memoizedDate, memoizedBranches]);
  return capacityMap;
}

export default useMonthlyCapacity;
