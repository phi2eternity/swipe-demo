import { CapacityDetails } from '@domain/types/common/capacity-details';
import { MockGenerator } from '@domain/types/__mock__/mock-generator';

export class CapacityDetailsMockGenerator extends MockGenerator<CapacityDetails> {
  generateMany(monthIndex: number): CapacityDetails[] {
    // Get days in month

    const daysInMonth = new Date(2023, monthIndex + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const monthStr = (monthIndex + 1 < 10) ? '0' + (monthIndex + 1) : monthIndex + 1;
      const dayStr = (day < 10) ? '0' + day : day;
      const date = `2023-${monthStr}-${dayStr}`;
      return this.generateOne(date);
    }) as CapacityDetails[];
  }

  generateOne(date:string): CapacityDetails {
    return {
      date,
      morning_capacity: Math.random(),
      afternoon_capacity: Math.random(),
    } as CapacityDetails;
  }
}
