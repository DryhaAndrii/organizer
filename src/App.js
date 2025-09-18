import React, { useState } from "react";
import Calendar from "./components/calendar/calendar.jsx";
import SelectedDay from "./components/selected-day/selected-day.jsx";
import AuthPanel from "./components/auth-panel/auth-panel.jsx";
import Message from "./components/message/message.jsx";
import { useCalendarDate } from "./hooks/useCalendarDate";
import { useAuth } from "./hooks/useAuth";
import { useMessage } from "./hooks/useMessage";
import "./App.sass";

function App() {
  const { currentDate, setCurrentDate, nextMonth, prevMonth } =
    useCalendarDate();
  const { isAuthenticated, setIsAuthenticated, userLogin, setUserLogin, auth } =
    useAuth();
  const { showMessage, setShowMessage } = useMessage();
  const [selectedDay, setSelectedDay] = useState({
    day: "",
    month: "",
    year: "",
    toDoList: [],
  });
  const [rerenderCalendar, setRerenderCalendar] = useState(false);

  if (isAuthenticated && userLogin !== "")
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
  return (
    <div className="app">
      <AuthPanel setShowMessage={setShowMessage} auth={auth} />
      {showMessage.show && (
        <Message setShowMessage={setShowMessage} showMessage={showMessage} />
      )}
    </div>
  );
}

export default App;
