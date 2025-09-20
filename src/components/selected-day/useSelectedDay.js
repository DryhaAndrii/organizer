import { useCallback, useEffect, useMemo, useState } from "react";

export function useSelectedDay({ externalSelectedDay, userLogin, setShowMessage, setRerenderCalendar }) {
  const [selectedDay, setSelectedDay] = useState({ day: '', month: '', year: '', name: '', toDoList: [] });
  const [business, setBusiness] = useState('');

  const isValidExternal = useMemo(() => (
    externalSelectedDay.year !== '' && externalSelectedDay.month !== '' && externalSelectedDay.day !== ''
  ), [externalSelectedDay.day, externalSelectedDay.month, externalSelectedDay.year]);

  const getDay = useCallback((day, month, year, login) => {
    const body = { day, month, year, userLogin: login };
    fetch('/api/get-day', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(res => setSelectedDay({ day: res.day, month: res.month, year: res.year, name: res.name, toDoList: res.toDoList }));
  }, []);

  const refresh = useCallback(() => {
    if (isValidExternal) {
      getDay(externalSelectedDay.day, externalSelectedDay.month, externalSelectedDay.year, userLogin);
    }
  }, [getDay, isValidExternal, externalSelectedDay.day, externalSelectedDay.month, externalSelectedDay.year, userLogin]);

  useEffect(() => {
    if (isValidExternal) {
      getDay(externalSelectedDay.day, externalSelectedDay.month, externalSelectedDay.year, userLogin);
    }
  }, [isValidExternal, externalSelectedDay.day, externalSelectedDay.month, externalSelectedDay.year, userLogin, getDay]);

  const addToList = useCallback((day, month, year, text, login) => {
    if (text === '') {
      setShowMessage({ text: 'Input should not be empty', show: true });
      return;
    }
    const body = { day, month, year, business: text, login };
    fetch('/api/addToList', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(body)
    })
      .then(() => {
        refresh();
        setRerenderCalendar(true);
        setBusiness('');
      });
  }, [refresh, setShowMessage, setRerenderCalendar]);

  const removeFromList = useCallback((day, month, year, index, login) => {
    const body = { day, month, year, index, login };
    fetch('/api/removeFromList', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(body)
    })
      .then(() => {
        refresh();
        setRerenderCalendar(true);
      });
  }, [refresh, setRerenderCalendar]);

  const hasDate = selectedDay.day !== '' && selectedDay.month !== '' && selectedDay.year !== '';

  return {
    selectedDay,
    business,
    setBusiness,
    addToList,
    removeFromList,
    hasDate,
  };
}


