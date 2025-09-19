function generateMonthDays(year, monthName) {
  const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthIndex = monthNames.indexOf(monthName);
  if (monthIndex < 0) return [];
  const d = new Date(year, monthIndex, 1);
  const result = [];
  while (d.getMonth() === monthIndex) {
    result.push({
      name: daysNames[d.getDay()],
      day: d.getDate(),
      month: monthNames[d.getMonth()],
      monthCount: d.getMonth(),
      year: d.getFullYear(),
      toDoList: []
    });
    d.setDate(d.getDate() + 1);
  }
  return result;
}

function generateSingleDay(year, monthName, day) {
  const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthIndex = monthNames.indexOf(monthName);
  const d = new Date(year, monthIndex, day);
  return {
    name: daysNames[d.getDay()],
    day: d.getDate(),
    month: monthNames[d.getMonth()],
    monthCount: d.getMonth(),
    year: d.getFullYear(),
    toDoList: []
  };
}

function updateMonthToMonday(days) {
  if (days[0].name !== 'Monday') {
    let daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let d = new Date(days[0].year, days[0].monthCount, days[0].day);
    while (true) {
      d.setDate(d.getDate() - 1);
      let tempDate = {
        name: daysNames[d.getDay()],
        day: d.getDate(),
        month: monthNames[d.getMonth()],
        monthCount: d.getMonth(),
        year: d.getFullYear(),
        toDoList: []
      }
      if (tempDate.name === 'Sunday') {
        break;
      } else {
        days.unshift(tempDate);
      }
    }
    return days;
  } else { return days }
}

function updateMonthTo42Days(days) {
  let daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let d = new Date(days[days.length - 1].year, days[days.length - 1].monthCount, days[days.length - 1].day);
  while (days.length < 42) {
    d.setDate(d.getDate() + 1);
    let tempDate = {
      name: daysNames[d.getDay()],
      day: d.getDate(),
      month: monthNames[d.getMonth()],
      monthCount: d.getMonth(),
      year: d.getFullYear(),
      toDoList: []
    }
    days.push(tempDate);

  }
  return days;
}

module.exports = {
  generateMonthDays,
  generateSingleDay,
  updateMonthToMonday,
  updateMonthTo42Days,
};


