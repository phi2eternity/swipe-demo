import {CapacityDetails} from "@domain/types/common/capacity-details";

describe('CapacityDetails', () => {
  it('should be defined.', () => {
    const capacityDetails: CapacityDetails = {
      date: '2020-01-01', morning_capacity: 1, afternoon_capacity: 2,
    };
    expect(capacityDetails).toBeDefined();
  });


});
