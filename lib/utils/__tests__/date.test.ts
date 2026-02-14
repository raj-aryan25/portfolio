import {
  formatDate,
  formatDuration,
  calculateDurationInMonths,
  formatDurationLength,
  getCompleteDuration
} from '../date';

describe('Date Utilities', () => {
  describe('formatDate', () => {
    it('should format YYYY-MM date to Month Year', () => {
      expect(formatDate('2023-06')).toBe('June 2023');
      expect(formatDate('2023-01')).toBe('January 2023');
      expect(formatDate('2023-12')).toBe('December 2023');
    });

    it('should return "Present" unchanged', () => {
      expect(formatDate('Present')).toBe('Present');
    });

    it('should handle different years', () => {
      expect(formatDate('2022-03')).toBe('March 2022');
      expect(formatDate('2024-09')).toBe('September 2024');
    });
  });

  describe('formatDuration', () => {
    it('should format duration with start and end dates', () => {
      const duration = { start: '2023-06', end: '2023-08' };
      expect(formatDuration(duration)).toBe('June 2023 - August 2023');
    });

    it('should format duration with Present as end date', () => {
      const duration = { start: '2023-06', end: 'Present' };
      expect(formatDuration(duration)).toBe('June 2023 - Present');
    });

    it('should handle same month and year', () => {
      const duration = { start: '2023-06', end: '2023-06' };
      expect(formatDuration(duration)).toBe('June 2023 - June 2023');
    });

    it('should handle cross-year durations', () => {
      const duration = { start: '2022-12', end: '2023-02' };
      expect(formatDuration(duration)).toBe('December 2022 - February 2023');
    });
  });

  describe('calculateDurationInMonths', () => {
    it('should calculate months within same year', () => {
      expect(calculateDurationInMonths('2023-06', '2023-08')).toBe(2);
      expect(calculateDurationInMonths('2023-01', '2023-12')).toBe(11);
    });

    it('should calculate months across years', () => {
      expect(calculateDurationInMonths('2022-12', '2023-02')).toBe(2);
      expect(calculateDurationInMonths('2022-06', '2023-06')).toBe(12);
    });

    it('should calculate months for same month', () => {
      expect(calculateDurationInMonths('2023-06', '2023-06')).toBe(0);
    });

    it('should calculate months to Present', () => {
      // Mock current date to January 2024 for consistent testing
      const mockDate = new Date('2024-01-15');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

      expect(calculateDurationInMonths('2023-06', 'Present')).toBe(7);

      jest.restoreAllMocks();
    });

    it('should handle multi-year durations', () => {
      expect(calculateDurationInMonths('2021-01', '2023-01')).toBe(24);
      expect(calculateDurationInMonths('2020-06', '2023-08')).toBe(38);
    });
  });

  describe('formatDurationLength', () => {
    it('should format single month', () => {
      expect(formatDurationLength(1)).toBe('1 month');
    });

    it('should format multiple months', () => {
      expect(formatDurationLength(2)).toBe('2 months');
      expect(formatDurationLength(11)).toBe('11 months');
    });

    it('should format single year', () => {
      expect(formatDurationLength(12)).toBe('1 year');
    });

    it('should format multiple years', () => {
      expect(formatDurationLength(24)).toBe('2 years');
      expect(formatDurationLength(36)).toBe('3 years');
    });

    it('should format years and months', () => {
      expect(formatDurationLength(13)).toBe('1 year 1 month');
      expect(formatDurationLength(15)).toBe('1 year 3 months');
      expect(formatDurationLength(26)).toBe('2 years 2 months');
      expect(formatDurationLength(38)).toBe('3 years 2 months');
    });

    it('should handle zero months', () => {
      expect(formatDurationLength(0)).toBe('0 months');
    });
  });

  describe('getCompleteDuration', () => {
    it('should return complete duration string with length', () => {
      const duration = { start: '2023-06', end: '2023-08' };
      expect(getCompleteDuration(duration)).toBe('June 2023 - August 2023 (2 months)');
    });

    it('should handle Present end date', () => {
      // Mock current date to January 2024 for consistent testing
      const mockDate = new Date('2024-01-15');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

      const duration = { start: '2023-06', end: 'Present' as const };
      expect(getCompleteDuration(duration)).toBe('June 2023 - Present (7 months)');

      jest.restoreAllMocks();
    });

    it('should handle year-long duration', () => {
      const duration = { start: '2022-06', end: '2023-06' };
      expect(getCompleteDuration(duration)).toBe('June 2022 - June 2023 (1 year)');
    });

    it('should handle duration with years and months', () => {
      const duration = { start: '2022-01', end: '2023-04' };
      expect(getCompleteDuration(duration)).toBe('January 2022 - April 2023 (1 year 3 months)');
    });
  });
});
