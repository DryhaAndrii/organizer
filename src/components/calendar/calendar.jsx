import React, { useEffect, useState } from "react";
import Day from "./day/day.jsx";
import "./calendar.sass";
import CalendarHeader from "./CalendarHeader.jsx";
function Calendar(props) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    getDays(props.currentDate.year, props.currentDate.month, props.userLogin);
    props.setRerenderCalendar(false);
  }, [
    props.currentDate.year,
    props.currentDate.month,
    props.userLogin,
    props.selectedDay,
    props.rerenderCalendar,
    props,
  ]);

  async function getDays(year, month, login) {
    const body = { year, month, login: login };
    console.log("posted:", body);
    fetch("/api/get-days", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => setDays(res));
  }

  return (
    <div className="calendar">
      <CalendarHeader currentDate={props.currentDate} prevMonth={props.prevMonth} nextMonth={props.nextMonth} />
      <div className="days">
        {days.map((item) => (
          <Day
            key={`${item.year} ${item.month} ${item.day}`}
            day={item.day}
            toDo={item.toDoList}
            currentDate={props.currentDate}
            month={item.month}
            year={item.year}
            selectedDay={props.selectedDay}
            setSelectedDay={props.setSelectedDay}
            userLogin={props.userLogin}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
