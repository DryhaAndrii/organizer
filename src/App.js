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
  const { isAuthenticated, setIsAuthenticated, userLogin, setUserLogin, auth, isCheckingAuth, serverUnavailable, checkAuth } =
    useAuth();
  const { showMessage, setShowMessage } = useMessage();
  const [selectedDay, setSelectedDay] = useState({
    day: "",
    month: "",
    year: "",
    toDoList: [],
  });
  const [rerenderCalendar, setRerenderCalendar] = useState(false);

  if (isCheckingAuth) {
    return (
      <div className="app">
        <div style={{ color: '#fff' }}>Loading...</div>
      </div>
    );
  }

  if (serverUnavailable) {
    return (
      <div className="app">
        <div style={{ color: '#fff', textAlign: 'center', maxWidth: 420 }}>
          <h2>Service is not available</h2>
          <p>Unable to connect to the server. Check the internet or try again later.</p>
          <button onClick={checkAuth}>Try again</button>
        </div>
      </div>
    );
  }

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
