export const handleFormattedDate = (currentDate) => {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const getNextDate = (currentDate) => {
  currentDate.setDate(currentDate.getDate() + 1);
  return currentDate;
};

export const getLastDateOfCurrentMonth = (month) => {
  const date = new Date(new Date().getFullYear(), month, 0);
  const lastDay = date.getDate();
  return lastDay;
};

export const getMonthName = () => {
  const currentMonthIndex = new Date().getMonth();
  let previousMonthIndex;
  if (currentMonthIndex === 0) {
    previousMonthIndex = 11;
  } else {
    previousMonthIndex = currentMonthIndex - 1;
  }
  switch (previousMonthIndex) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "";
  }
};

const formattedDate = handleFormattedDate(new Date());
const nextDate = getNextDate(new Date());
const nextDateFormatted = handleFormattedDate(nextDate);

export const dateToBeChecked =
  new Date().getHours() >= 18 && new Date().getHours() <= 23
    ? nextDateFormatted
    : formattedDate;
