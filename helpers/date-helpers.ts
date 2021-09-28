import moment from 'moment';

export const getTodayMidnightDate = (): Date => {
  const date = new Date();

  date.setHours(0, 0, 0, 0);

  return date;
};

export const getTomorrowDate = (): Date => {
  const date = getTodayMidnightDate();

  date.setDate(date.getDate() + 1);

  return date;
};

export const getYearsAgoDate = (yearsAgo: number): Date => {
  const date = getTodayMidnightDate();

  date.setFullYear(date.getFullYear() - yearsAgo);

  return date;
};

export const formatDate = (date: Date | string, format: string): string => moment(date).format(format);
