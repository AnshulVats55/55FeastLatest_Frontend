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
