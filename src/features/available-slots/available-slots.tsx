import React, { useState } from "react";
import { DailyAvailableSlot } from "@domain/types/responses/daily-available-slots-response";
import SlotCard from "@components/book/slot-card/slot-card";
import "./available-slots.scss";
import useAvailableSlots from "@hooks/use-available-slots";
import AvailableSlotsDrawer from "@features/available-slots/available-slots-drawer";

export interface AvailableSlotsProps  {
  date: Date;
  employees?: number[];
  branches?: number[];
  onClick?: () => void;
  service: string;
  duration?: number;
  times?: string[];
  onSelect?: (slot: DailyAvailableSlot) => void;
}

const AvailableSlots: React.FC<AvailableSlotsProps> = ({
                                                         date,
                                                         onSelect,
                                                         employees,
                                                         branches,
                                                         service,
                                                         duration,
                                                         times = ["morning", "afternoon", "evening"],

                                                       }) => {
  const [selectedSlots, setSelectedSlots] = useState<DailyAvailableSlot[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [timeOfDay, setTimeOfDay] = useState<string>("");

  const slots: DailyAvailableSlot[] = useAvailableSlots({ date, employees, branches, service, duration });

  const formatSlot = (slot: DailyAvailableSlot) => {
    const start = new Date(slot.start);
    // 17:00 17:30 17:05
    const hour = start.getHours();
    const minutes = start.getMinutes();
    const minutesString = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    const hourString = hour < 10 ? "0" + hour.toString() : hour.toString();
    return `${hourString}:${minutesString}`;
  };

  const getAvailableSlots = (slots: DailyAvailableSlot[]) => {
    const sortedSlots = slots.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    return sortedSlots.filter((slot) => {
      const start = new Date(slot.start);
      const dateHour = start.getHours();

      return (
        (times.includes("morning") && dateHour >= 8 && dateHour <= 12) ||
        (times.includes("afternoon") && dateHour >= 12 && dateHour <= 17) ||
        (times.includes("evening") && dateHour >= 17 && dateHour <= 20)
      );
    });
  };

  const getSlotStrings = (slots: DailyAvailableSlot[]) => {
    const slotStrings = slots.map((slot) => formatSlot(slot));
    return Array.from(new Set(slotStrings));
  };

  const handleClick = (hour: string) => {
    setSelectedSlots(slots.filter((slot) => formatSlot(slot) === hour));
    setDrawerOpen(true);
    setTimeOfDay(hour);
  };

  const filteredSlots = getAvailableSlots(slots);
  return (
    <div className="slots-wrapper">

      {getSlotStrings(filteredSlots).map((hour) => (
        <div data-testid={"available-slot-cards"} key={hour} onClick={() => handleClick(hour)} className="slot-wrapper">
          <SlotCard time={hour} availabilty={true} width="100%" />
        </div>
      ))}
      <AvailableSlotsDrawer
        onSelect={onSelect}
        timeOfDay={timeOfDay}
        slots={selectedSlots}
        setOpen={setDrawerOpen}
        open={drawerOpen}
      />
    </div>
  );
};

export default AvailableSlots;
