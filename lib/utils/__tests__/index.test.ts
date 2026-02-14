import {
  cn,
  formatDate,
  formatDuration,
  calculateDurationInMonths,
  formatDurationLength,
  getCompleteDuration
} from '../index';

describe('Utils index exports', () => {
  it('should export cn utility', () => {
    expect(typeof cn).toBe('function');
    expect(cn('test')).toBe('test');
  });

  it('should export date utilities', () => {
    expect(typeof formatDate).toBe('function');
    expect(typeof formatDuration).toBe('function');
    expect(typeof calculateDurationInMonths).toBe('function');
    expect(typeof formatDurationLength).toBe('function');
    expect(typeof getCompleteDuration).toBe('function');
  });

  it('should work with exported functions', () => {
    expect(formatDate('2023-06')).toBe('June 2023');
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });
});
