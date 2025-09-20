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
        <p>Pn</p>
        <p>Vt</p>
        <p>Sr</p>
        <p>Ch</p>
        <p>Ptn</p>
        <p>Sub</p>
        <p>Voskr</p>
      </div>
    </div>
  );
}

export default CalendarHeader;


