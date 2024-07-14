import { DateTime } from 'luxon';

export const substractHours = (date: Date, hours: number): Date => {
  return DateTime.fromJSDate(date).minus({ hours }).toJSDate();
};
