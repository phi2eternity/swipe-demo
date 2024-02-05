import React from "react";
import {fireEvent, getByTestId, render,} from "@testing-library/react";
import CustomCalendar from "./custom-calender";
import timezoneMock, { TimeZone } from 'timezone-mock';

const timeZones = [
  'Australia/Adelaide',
  'Brazil/East',
  'Europe/London',
  'US/Eastern',
  'US/Pacific',
  'UTC',
  'Etc/GMT+12',
  'Etc/GMT+11',
  'Etc/GMT+10',
  'Etc/GMT+9',
  'Etc/GMT+8',
  'Etc/GMT+7',
  'Etc/GMT+6',
  'Etc/GMT+5',
  'Etc/GMT+4',
  'Etc/GMT+3',
  'Etc/GMT+2',
  'Etc/GMT+1',
  'Etc/GMT+0',
  'Etc/GMT',
  'Etc/GMT-0',
  'Etc/GMT-1',
  'Etc/GMT-2',
  'Etc/GMT-3',
  'Etc/GMT-4',
  'Etc/GMT-5',
  'Etc/GMT-6',
  'Etc/GMT-7',
  'Etc/GMT-8',
  'Etc/GMT-9',
  'Etc/GMT-10',
  'Etc/GMT-11',
  'Etc/GMT-12',
  'Etc/GMT-13',
  'Etc/GMT-14',
];

describe("CustomCalendar", () => {
  it("should increment the month from December to January and increment the year", () => {
    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-12-01")}/>);

    const arrowRightIcon = container.querySelector("svg[data-testid='arrow-right']") as HTMLElement;

    fireEvent.click(arrowRightIcon);

    // Expect the new month to be January and the year to be incremented.
    const currentMonth = container.querySelector("h1[data-testid='current-month']") as HTMLElement;
    expect(currentMonth.textContent).toBe("January");

    const currentYear = container.querySelector("h3[data-testid='current-year']") as HTMLElement;

    expect(currentYear.textContent).toBe("2024");
  });

  it("should decrement the month from January to December and decrement the year", () => {
    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-01-01")}/>);

    const arrowLeftIcon = container.querySelector("svg[data-testid='arrow-left']") as HTMLElement;
    fireEvent.click(arrowLeftIcon);

    // Expect the new month to be January and the year to be incremented.
    const currentMonth = container.querySelector("h1[data-testid='current-month']") as HTMLElement;
    expect(currentMonth.textContent).toBe("December");

    const currentYear = container.querySelector("h3[data-testid='current-year']") as HTMLElement;

    expect(currentYear.textContent).toBe("2022");
  });
  it("should not lose focus when moved from January 31 to February", () => {
    const mockFn = jest.fn();
    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-01-31")} onChange={mockFn}/>);

    const arrowRightIcon = container.querySelector("svg[data-testid='arrow-right']") as HTMLElement;
    fireEvent.click(arrowRightIcon);

    // Expect the new month to be January and the year to be incremented.
    const activeDate = container.querySelector("div[data-testid='active-date']") as HTMLElement;
    expect(activeDate).toBeTruthy();
    expect(activeDate.textContent).toBe("28");
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith(new Date(2023,2,28));
  });

  it("should not lose focus when moved from March 31 to April", () => {
    const mockFn = jest.fn();
    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-03-31")} onChange={mockFn}/>);
    const arrowRightIcon = container.querySelector("svg[data-testid='arrow-right']") as HTMLElement;
    fireEvent.click(arrowRightIcon);

    const activeDate = container.querySelector("div[data-testid='active-date']") as HTMLElement;
    expect(activeDate).toBeTruthy();
    expect(activeDate.textContent).toBe("30");
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith(new Date(2023,4,30));
  });

  it("should not lose focus when moved from March 31 to February", () => {
    const mockFn = jest.fn();

    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-03-31")} onChange={mockFn}/>);
    const arrowLeftIcon = container.querySelector("svg[data-testid='arrow-left']") as HTMLElement;
    fireEvent.click(arrowLeftIcon);

    const activeDate = container.querySelector("div[data-testid='active-date']") as HTMLElement;
    expect(activeDate).toBeTruthy();
    expect(activeDate.textContent).toBe("28");
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith(new Date(2023,2,28));

  });

  it('When clicked on a date, the date should be highlighted', () => {
    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-01-01")}/>);
    const dateDiv = container.querySelectorAll("div[data-testid='date']");
    const dateDiv15 = Array.from(dateDiv).filter((div) => div.textContent === '15')[0];
    fireEvent.click(dateDiv15);
    const activeDate = container.querySelector("div[data-testid='active-date']") as HTMLElement;
    expect(activeDate).toBeTruthy();
    expect(activeDate.textContent).toBe("15");
  });

  it('When date is changed, event handler should have called.', () => {
    const mockOnChange = jest.fn();
    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-01-01")} onChange={mockOnChange}/>);
    // Click on date dive that includes 15 and data-testid="date"
    const dateDiv = container.querySelectorAll("div[data-testid='date']");
    const dateDiv15 = Array.from(dateDiv).filter((div) => div.textContent === '15')[0];
    fireEvent.click(dateDiv15);
    expect(mockOnChange).toHaveBeenCalled();

  });

  it('When active date is clicked, event handler should not have called.', () => {
    const mockOnChange = jest.fn();
    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-01-01")} onChange={mockOnChange}/>);
    const dateDiv = container.querySelector("div[data-testid='active-date']") as HTMLElement;
    fireEvent.click(dateDiv);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('When month is decremented, event handler should have called.', () => {
    const mockOnChange = jest.fn();
    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-01-01")} onChange={mockOnChange}/>);
    const arrowLeftIcon = container.querySelector("svg[data-testid='arrow-left']") as HTMLElement;
    fireEvent.click(arrowLeftIcon);
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('When month is incremented, event handler should have called.', () => {
    const mockOnChange = jest.fn();
    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-01-01")} onChange={mockOnChange}/>);
    const arrowRightIcon = container.querySelector("svg[data-testid='arrow-right']") as HTMLElement;
    fireEvent.click(arrowRightIcon);
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('When same day is selected, only corresponding month date should be active.', () => {
    const mockOnChange = jest.fn();
    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-02-01")} onChange={mockOnChange}/>);
    const activeDates = container.querySelectorAll("div[data-testid='active-date']") as NodeListOf<HTMLElement>;
    expect(activeDates.length).toBe(1);
  });

  it('When date from different previous month is clicked, calendar should move to previous month.', () => {
    const mockOnChange = jest.fn();
    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-02-01")} onChange={mockOnChange}/>);
    const dateDivs = container.querySelectorAll("div[data-testid*='date']");
    const january31 = dateDivs[1];
    fireEvent.click(january31);
    const activeDate = container.querySelector("div[data-testid='active-date']") as HTMLElement;
    expect(activeDate).toBeTruthy();
    expect(activeDate.textContent).toBe("31");

    const currentMonth = container.querySelector("h1[data-testid='current-month']") as HTMLElement;
    expect(currentMonth.textContent).toBe("January");

    const currentYear = container.querySelector("h3[data-testid='current-year']") as HTMLElement;
    expect(currentYear.textContent).toBe("2023");
  });

  it('When date from different next month is clicked, calendar should move to next month.', () => {
    const mockOnChange = jest.fn();
    const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-02-01")} onChange={mockOnChange}/>);
    const dateDivs = container.querySelectorAll("div[data-testid*='date']");
    const march1 = dateDivs[30];
    fireEvent.click(march1);
    const activeDate = container.querySelector("div[data-testid='active-date']") as HTMLElement;
    expect(activeDate).toBeTruthy();
    expect(activeDate.textContent).toBe("1");

    const currentMonth = container.querySelector("h1[data-testid='current-month']") as HTMLElement;
    expect(currentMonth.textContent).toBe("March");

    const currentYear = container.querySelector("h3[data-testid='current-year']") as HTMLElement;
    expect(currentYear.textContent).toBe("2023");
  });

  it('Check if the calendar has correct number of items when timezone has changed.', () => {
    const mockOnChange = jest.fn();

    // Iterate all timezones
    timeZones.forEach((timezone) => {
      timezoneMock.register(timezone as TimeZone);
      const {container, getByTestId} = render(<CustomCalendar date={new Date("2023-02-01")} onChange={mockOnChange}/>);
      const dateDivs = container.querySelectorAll("div[data-testid*='date']");
      expect(dateDivs.length).toBe(35);
    });



  });

});
