import { CapacityDetailsMockGenerator } from '@domain/types/__mock__/capacity-details-generator';

describe('CapacityDetailsMockGenerator', () => {
  it('should be defined', () => {
    expect(CapacityDetailsMockGenerator).toBeDefined();
  });

  it('should generate a capacity details object', () => {
    const capacityDetailsGenerator = new CapacityDetailsMockGenerator();
    const capacityDetails = capacityDetailsGenerator.generateOne('2023-01-01');
    expect(capacityDetails).toBeDefined();
    expect(capacityDetails.date).toBeDefined();
    expect(capacityDetails.date).toEqual('2023-01-01');
    expect(capacityDetails.morning_capacity).toBeDefined();
    expect(capacityDetails.afternoon_capacity).toBeDefined();
  });

  it('should generate a capacity details array', () => {
    const capacityDetailsGenerator = new CapacityDetailsMockGenerator();
    const capacityDetails = capacityDetailsGenerator.generateMany(0);
    expect(capacityDetails).toBeDefined();
    expect(capacityDetails.length).toEqual(31);
    for(let i = 0; i < capacityDetails.length; i++) {
      expect(capacityDetails[i].date).toBeDefined();
      const dayStr = (i+1 < 10) ? '0' + (i+1) : i+1;
      expect(capacityDetails[i].date).toEqual(`2023-01-${dayStr}`);
      expect(capacityDetails[i].morning_capacity).toBeDefined();
      expect(capacityDetails[i].afternoon_capacity).toBeDefined();
    }


  });

});
