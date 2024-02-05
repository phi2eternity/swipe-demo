import React from "react";
import {render, fireEvent, act} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AvailableSlots, { AvailableSlotsProps } from "./available-slots";
import { DailyAvailableSlot } from "@domain/types/responses/daily-available-slots-response";
import {DailyAvailableSlotMockGenerator} from "@domain/types/__mock__/daily-available-slot-generator";

const slotGenerator = new DailyAvailableSlotMockGenerator();

const mockSlots: DailyAvailableSlot[] = slotGenerator.generateMany(3);

jest.mock("@hooks/use-available-slots", () => ({
  __esModule: true,
  default: () => mockSlots,
}));

const defaultProps: AvailableSlotsProps = {
  date: new Date("2023-04-10"),
  service: "service1",
  onSelect: jest.fn(),
};

const formatSlot = (slot: DailyAvailableSlot) => {
  const start = new Date(slot.start);
  return `start.getMinutes() === 0 ? ${start.getHours()}:00 : ${start.getHours()}:${start.getMinutes()}`;
};

const getHours = (slots: DailyAvailableSlot[]) => {
  const uniqueSlots = slots.filter((slot) => {
    const start = new Date(slot.start);
    const dateHour = start.getHours();
    return !(dateHour < 8 || dateHour > 20);

  })
    .map(formatSlot)
  return Array.from(new Set(uniqueSlots));
}

describe("AvailableSlots", () => {
  it('should be defined', () => {
    expect(AvailableSlots).toBeDefined();
  });

});
