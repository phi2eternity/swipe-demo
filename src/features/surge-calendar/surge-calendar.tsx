import CustomCalendar from "@components/book/calender/custom-calender";
import { useCallback,  useState } from "react";
import style from "./surge-calendar.module.scss";

export type SurgeCalendarProps = {
  initialDate?: Date;
  employees?: number[];
  branches?: number[];
  onChange?: (date: Date) => void;
  service?: string;
};



const SurgeCalendar: React.FC<SurgeCalendarProps> = ({
  initialDate = new Date(),
  employees,
  branches,
  onChange,
  service = "Grooming",
}) => {

  const [date, setDate] = useState<Date>(initialDate);

  const handleChange = useCallback(
    (newDate: Date) => {
      setDate(newDate);
      if (onChange) {
        onChange(newDate);
      }
    },
    [onChange]
  );
  const strikethroughPastDates = (date: Date) => {
    if(date < new Date()) {
      return style.surgeCalendar__past;
    }else{
      return "";
    }

  }
  return (
    <div>
      <CustomCalendar
        date={date}
        onChange={handleChange}
  mapDateToClassName={strikethroughPastDates}

      />
    </div>
  );
};

export default SurgeCalendar;
