import "./bookpage.scss";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "@quicker/store/store";
import React, {  useState } from "react";
import { useNavigate} from "react-router-dom";
import SurgeCalendar from "@features/surge-calendar/surge-calendar";
import SelectBranches from "@features/select-branches/select-branches";
import AvailableSlots from "@features/available-slots/available-slots";
import SelectGroomers from "@features/select-groomers/select-groomers";
import SelectTime from "@features/select-time/select-time";
import {BranchEntity} from "@domain/types/common/branch";
import {EmployeeEntity} from "@domain/types/common/employee";
import {OrderActions} from "@quicker/store/order-slice";
import {DailyAvailableSlot} from "@domain/types/responses/daily-available-slots-response";
import BookingJourney from '@components/journeys/booking-journey';


const getTomorrow = () => {
  return new Date(new Date().getTime() + 24*  60 * 60 * 1000);
}

const BookPage: React.FC = () => {
  const [date,setDate] = useState<Date>(getTomorrow());
  const [branches,setBranches] = useState<Array<number>>([]);
  const [groomers,setGroomers] = useState<Array<number>>([]);
  const [times,setTimes] = useState<Array<string>>(["morning","afternoon","evening"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const type = useSelector((state: RootState) => {
    return state.order.orderType;
  });

  const handleSelectBranches = (branches:BranchEntity[]) => {
    setBranches(branches.map((branch) => branch.id));
  }

  const handleSelectEmployees = (employees:EmployeeEntity[]) => {
    setGroomers(employees.map((employee) => employee.id));
  }

  const handleSetDate = (date:Date) => {
    setDate(date);
  }

  const onBook = (slot:DailyAvailableSlot) => {
    const branch = slot.branch
    const employee = slot.employee;
    const start = slot.start;

    dispatch(OrderActions.setOrder({
      branch,
      groomer: employee,
      start
    }));
    navigate("/add-ons");
  }
  return <BookingJourney selectable={true}>
      <div className="calender-row calendar-row-top">

        <div className="calender-header-row">
          <h2>Book appointment</h2>

        </div>
        <SurgeCalendar initialDate={date} onChange={handleSetDate} />
      </div>
      <div className={"book-page__select-branch"}>
        <SelectBranches onSelect={handleSelectBranches} />
      </div>
      <div className={"book-page__select-row"}>
        {type == "Grooming" ? <SelectGroomers onSelect={handleSelectEmployees}/> : null}
        <SelectTime onSelect={setTimes}/>
      </div>
      <div className="slots-row">
        {type == "We Wash" && branches?.length == 0 && <div className={"slots-warning"}>Please select a branch</div> }
        {type == "Grooming" && groomers?.length == 0 && branches?.length == 0 && <div className={"slots-warning"}>Please select a groomer or branch</div> }
        {
          (groomers?.length >0 || branches?.length > 0 )&& <div className="calender-header-row">
            <h2>Select Time</h2>
          </div>
         }


        <AvailableSlots onSelect={onBook} date={date} service={type} times={times} branches={branches} employees={groomers}  />
      </div>
    </BookingJourney>
};

export default BookPage;
