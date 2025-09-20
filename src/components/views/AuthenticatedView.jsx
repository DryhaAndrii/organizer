import React from "react";
import Calendar from "../calendar/calendar.jsx";
import SelectedDay from "../selected-day/selected-day.jsx";
import Message from "../message/message.jsx";

function AuthenticatedView({
  rerenderCalendar,
  setRerenderCalendar,
  currentDate,
  setCurrentDate,
  nextMonth,
  prevMonth,
  userLogin,
  selectedDay,
  setSelectedDay,
  setIsAuthenticated,
  setUserLogin,
  showMessage,
  setShowMessage,
}) {
  return (
    <div className="app">
      <Calendar
        rerenderCalendar={rerenderCalendar}
        setRerenderCalendar={setRerenderCalendar}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
        userLogin={userLogin}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <SelectedDay
        setRerenderCalendar={setRerenderCalendar}
        userLogin={userLogin}
        setIsAuthicated={setIsAuthenticated}
        setUserLogin={setUserLogin}
        selectedDay={selectedDay}
        setShowMessage={setShowMessage}
      />
      {showMessage.show && (
        <Message setShowMessage={setShowMessage} showMessage={showMessage} />
      )}
    </div>
  );
}

export default AuthenticatedView;


