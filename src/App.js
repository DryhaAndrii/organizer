import React, { useState } from "react";
import LoadingView from "./components/views/LoadingView.jsx";
import ServerUnavailable from "./components/views/ServerUnavailable.jsx";
import AuthenticatedView from "./components/views/AuthenticatedView.jsx";
import UnauthenticatedView from "./components/views/UnauthenticatedView.jsx";
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
    return <LoadingView />;
  }

  if (serverUnavailable) {
    return <ServerUnavailable onRetry={checkAuth} />;
  }

  if (isAuthenticated && userLogin !== "")
    return (
      <AuthenticatedView
        rerenderCalendar={rerenderCalendar}
        setRerenderCalendar={setRerenderCalendar}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
        userLogin={userLogin}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setIsAuthenticated={setIsAuthenticated}
        setUserLogin={setUserLogin}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
    );
  return (
    <UnauthenticatedView
      auth={auth}
      showMessage={showMessage}
      setShowMessage={setShowMessage}
    />
  );
}

export default App;
