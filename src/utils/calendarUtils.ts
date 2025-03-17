
/**
 * Get the number of days in a month
 * @param year 
 * @param month 
 * @returns number of days in the month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Get the month name in Portuguese
 * @param date 
 * @returns month name
 */
export const getMonthName = (date: Date): string => {
  return date.toLocaleString('pt-PT', { month: 'long' });
};

/**
 * Get the days of a week starting from the provided date
 * @param date 
 * @returns array of dates for the week
 */
export const getWeekDays = (date: Date): Date[] => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  const monday = new Date(date.setDate(diff));
  const result = [];
  
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(monday);
    nextDay.setDate(monday.getDate() + i);
    result.push(nextDay);
  }
  
  return result;
};
