import {generateAvailableSlotsResponse} from "@data/mocks/handlers/get-available-slots";

describe('getAvailableSlotsHandler', () => {
  it('should return a list of available slots for the given date', async () => {
    const date = new Date();
    const response = generateAvailableSlotsResponse(date);
    expect(response.length).toBeGreaterThan(0);

  });
});
