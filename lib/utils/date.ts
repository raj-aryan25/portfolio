/**
 * Date formatting utilities for experience and position of responsibility durations
 */

/**
 * Format a date string from 'YYYY-MM' format to 'Month Year' format
 * @param dateString - Date in 'YYYY-MM' format or 'Present'
 * @returns Formatted date string like 'June 2023' or 'Present'
 * @example
 * formatDate('2023-06') // 'June 2023'
 * formatDate('Present') // 'Present'
 */
export function formatDate(dateString: string): string {
  if (dateString === 'Present') {
    return 'Present';
  }

  const [year, month] = dateString.split('-');
  
  // Use a month names array to avoid Date constructor issues
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthIndex = parseInt(month) - 1;
  const monthName = monthNames[monthIndex];
  
  return `${monthName} ${year}`;
}

/**
 * Format a duration object with start and end dates
 * @param duration - Object with start and end date strings
 * @returns Formatted duration string like 'June 2023 - August 2023' or 'June 2023 - Present'
 * @example
 * formatDuration({ start: '2023-06', end: '2023-08' }) // 'June 2023 - August 2023'
 * formatDuration({ start: '2023-06', end: 'Present' }) // 'June 2023 - Present'
 */
export function formatDuration(duration: { start: string; end: string | 'Present' }): string {
  const startFormatted = formatDate(duration.start);
  const endFormatted = formatDate(duration.end);
  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Calculate the duration in months between two dates
 * @param start - Start date in 'YYYY-MM' format
 * @param end - End date in 'YYYY-MM' format or 'Present'
 * @returns Number of months between the dates
 * @example
 * calculateDurationInMonths('2023-06', '2023-08') // 2
 * calculateDurationInMonths('2023-06', 'Present') // calculated from start to current date
 */
export function calculateDurationInMonths(start: string, end: string | 'Present'): number {
  const [startYear, startMonth] = start.split('-').map(Number);
  
  let endYear: number;
  let endMonth: number;
  
  if (end === 'Present') {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1; // getMonth() is 0-indexed
  } else {
    [endYear, endMonth] = end.split('-').map(Number);
  }
  
  return (endYear - startYear) * 12 + (endMonth - startMonth);
}

/**
 * Format duration in months to a human-readable string
 * @param months - Number of months
 * @returns Formatted string like '2 months', '1 year', '1 year 3 months'
 * @example
 * formatDurationLength(2) // '2 months'
 * formatDurationLength(12) // '1 year'
 * formatDurationLength(15) // '1 year 3 months'
 */
export function formatDurationLength(months: number): string {
  if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }
  
  return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
}

/**
 * Get a complete duration string with length
 * @param duration - Object with start and end date strings
 * @returns Formatted string like 'June 2023 - August 2023 (2 months)'
 * @example
 * getCompleteDuration({ start: '2023-06', end: '2023-08' }) // 'June 2023 - August 2023 (2 months)'
 */
export function getCompleteDuration(duration: { start: string; end: string | 'Present' }): string {
  const formattedDuration = formatDuration(duration);
  const months = calculateDurationInMonths(duration.start, duration.end);
  const length = formatDurationLength(months);
  return `${formattedDuration} (${length})`;
}
