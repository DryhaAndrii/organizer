import React, { useState, useEffect } from 'react';
import Calendar from './components/calendar/calendar.jsx';
import SelectedDay from './components/selected-day/selected-day.jsx';
import AuthPanel from './components/auth-panel/auth-panel.jsx';
import Message from './components/message/message.jsx';
import './App.sass';

function App() {
  const [currentDate, setCurrentDate] = useState({ month: "August", year: 2022 });
  const [isAuthicated, setIsAuthicated] = useState(false);
  const [userLogin, setUserLogin] = useState('');
  const [showMessage, setShowMessage] = useState({ text: '', show: false });
  const [selectedDay, setSelectedDay] = useState({ day: '', month: '', year: '', toDoList: [] });
  const [rerenderCalendar, setRerenderCalendar] = useState(false);
  useEffect(() => {
    const todayDate = new Date();
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let todaysMonthName = monthNames[todayDate.getMonth()];
    setCurrentDate({ month: todaysMonthName, year: todayDate.getFullYear() });
  },[])
  


  function nextMonth(currentDate) {
      switch (currentDate.month) {
        case 'January': setCurrentDate({ month: 'February', year: currentDate.year }); break;
        case 'February': setCurrentDate({ month: 'March', year: currentDate.year }); break;
        case 'March': setCurrentDate({ month: 'April', year: currentDate.year }); break;
        case 'April': setCurrentDate({ month: 'May', year: currentDate.year }); break;
        case 'May': setCurrentDate({ month: 'June', year: currentDate.year }); break;
        case 'June': setCurrentDate({ month: 'July', year: currentDate.year }); break;
        case 'July': setCurrentDate({ month: 'August', year: currentDate.year }); break;
        case 'August': setCurrentDate({ month: 'September', year: currentDate.year }); break;
        case 'September': setCurrentDate({ month: 'October', year: currentDate.year }); break;
        case 'October': setCurrentDate({ month: 'November', year: currentDate.year }); break;
        case 'November': setCurrentDate({ month: 'December', year: currentDate.year }); break;
        case 'December': setCurrentDate({ month: 'January', year: currentDate.year + 1 }); break;
        default: console.log('kek');
      }
    }
  function prevMonth(currentDate) {
      switch (currentDate.month) {
        case 'January': setCurrentDate({ month: 'December', year: currentDate.year - 1 }); break;
        case 'December': setCurrentDate({ month: 'November', year: currentDate.year }); break;
        case 'November': setCurrentDate({ month: 'October', year: currentDate.year }); break;
        case 'October': setCurrentDate({ month: 'September', year: currentDate.year }); break;
        case 'September': setCurrentDate({ month: 'August', year: currentDate.year }); break;
        case 'August': setCurrentDate({ month: 'July', year: currentDate.year }); break;
        case 'July': setCurrentDate({ month: 'June', year: currentDate.year }); break;
        case 'June': setCurrentDate({ month: 'May', year: currentDate.year }); break;
        case 'May': setCurrentDate({ month: 'April', year: currentDate.year }); break;
        case 'April': setCurrentDate({ month: 'March', year: currentDate.year }); break;
        case 'March': setCurrentDate({ month: 'February', year: currentDate.year }); break;
        case 'February': setCurrentDate({ month: 'January', year: currentDate.year }); break;
        default: console.log('kek');
      }
    }
  function auth(userLogin) {
      setUserLogin(userLogin);
      setIsAuthicated(true);
    }
  return (
    <div className='app'>
      {isAuthicated && userLogin !== '' ? <>
        <Calendar rerenderCalendar={rerenderCalendar} setRerenderCalendar={setRerenderCalendar} currentDate={currentDate} setCurrentDate={setCurrentDate} nextMonth={nextMonth} prevMonth={prevMonth} userLogin={userLogin} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <SelectedDay setRerenderCalendar={setRerenderCalendar} userLogin={userLogin} setIsAuthicated={setIsAuthicated} setUserLogin={setUserLogin} selectedDay={selectedDay} setShowMessage={setShowMessage} />
      </> :
        <AuthPanel setShowMessage={setShowMessage} auth={auth} />
      }
      {showMessage.show ? <Message setShowMessage={setShowMessage} showMessage={showMessage} /> : <></>}

    </div>
  );
}

export default App;
