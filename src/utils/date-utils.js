export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function getTodayMonthAndYear() {
  const today = new Date();
  return { month: MONTH_NAMES[today.getMonth()], year: today.getFullYear() };
}

export function getNextMonth(current) {
  const index = MONTH_NAMES.indexOf(current.month);
  if (index === -1) return current;
  const nextIndex = (index + 1) % 12;
  const nextYear = nextIndex === 0 ? current.year + 1 : current.year;
  return { month: MONTH_NAMES[nextIndex], year: nextYear };
}

export function getPrevMonth(current) {
  const index = MONTH_NAMES.indexOf(current.month);
  if (index === -1) return current;
  const prevIndex = (index + 11) % 12;
  const prevYear = prevIndex === 11 ? current.year - 1 : current.year;
  return { month: MONTH_NAMES[prevIndex], year: prevYear };
}


