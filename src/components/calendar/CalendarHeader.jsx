import React from "react";
import Button from "../ui/Button.jsx";

function CalendarHeader({ currentDate, prevMonth, nextMonth }) {
  return (
    <div className="calendar-header">
      <div className="top">
        <Button onClick={() => prevMonth(currentDate)}>🡄</Button>
        <div className="date">
          <p>{currentDate.year}</p>
          <p>{currentDate.month}</p>
        </div>
        <Button onClick={() => nextMonth(currentDate)}>🡆</Button>
      </div>
      <div className="days-names">
        <p>Mon</p>
        <p>Tue</p>
        <p>Wed</p>
        <p>Thu</p>
        <p>Fri</p>
        <p>Sat</p>
        <p>Sun</p>
      </div>
    </div>
  );
}

export default CalendarHeader;


