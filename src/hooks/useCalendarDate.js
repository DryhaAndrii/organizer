import { useEffect, useState, useCallback } from 'react';
import { getTodayMonthAndYear, getNextMonth, getPrevMonth } from '../utils/date-utils';

export function useCalendarDate() {
  const [currentDate, setCurrentDate] = useState({ month: 'August', year: 2022 });

  useEffect(() => {
    setCurrentDate(getTodayMonthAndYear());
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentDate(prev => getNextMonth(prev));
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentDate(prev => getPrevMonth(prev));
  }, []);

  return { currentDate, setCurrentDate, nextMonth, prevMonth };
}


