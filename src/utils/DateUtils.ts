import dayjs, { Dayjs } from 'dayjs';

// Function to format a date
export function formatDate(
  date: Dayjs | string | number | Date,
  formatString: string = 'YYYY-MM-DD HH:mm:ss'
): string {
  return dayjs(date).format(formatString);
}

// Function to parse a date
export function parseDate(
  dateString: string | Date,
  formatString: string = 'YYYY-MM-DD HH:mm:ss'
): Dayjs {
  return dayjs(dateString, formatString);
}

// Function to get the difference between two dates
export function getDateDiff(
  start: Dayjs,
  end: Dayjs,
  unit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' = 'day'
): number {
  return end.diff(start, unit);
}

// More utility functions as needed...
