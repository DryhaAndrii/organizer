import React, { useEffect, useState } from "react";
import Day from "./day/day.jsx";
import "./calendar.sass";
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
    fetch("http://localhost:4000/get-days", {
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
      <div className="calendar-header">
        <div className="top">
          <button
            onClick={() => {
              props.prevMonth(props.currentDate);
            }}
          >
            🡄
          </button>
          <div className="date">
            <p>{props.currentDate.year}</p>
            <p>{props.currentDate.month}</p>
          </div>

          <button
            onClick={() => {
              props.nextMonth(props.currentDate);
            }}
          >
            🡆
          </button>
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
