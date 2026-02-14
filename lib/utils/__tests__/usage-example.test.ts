/**
 * Usage examples demonstrating how to use the utility functions
 * with actual experience and leadership data
 */

import { formatDuration, getCompleteDuration } from '../date';
import { experiences } from '../../data/experience';
import { positions } from '../../data/leadership';

describe('Utility Usage Examples', () => {
  describe('Experience data formatting', () => {
    it('should format experience durations correctly', () => {
      const exp1 = experiences[0]; // TechCorp AI Labs
      expect(formatDuration(exp1.duration)).toBe('June 2023 - August 2023');
    });

    it('should format current experience with Present', () => {
      const currentExp = experiences.find(e => e.duration.end === 'Present');
      if (currentExp) {
        const formatted = formatDuration(currentExp.duration);
        expect(formatted).toContain('Present');
      }
    });

    it('should get complete duration with length', () => {
      const exp1 = experiences[0];
      const complete = getCompleteDuration(exp1.duration);
      expect(complete).toContain('June 2023 - August 2023');
      expect(complete).toContain('months');
    });
  });

  describe('Leadership position formatting', () => {
    it('should format current position durations', () => {
      const currentPositions = positions.filter(p => p.current);
      
      currentPositions.forEach(position => {
        const formatted = formatDuration(position.duration);
        expect(formatted).toContain('Present');
      });
    });

    it('should format past position durations', () => {
      const pastPositions = positions.filter(p => !p.current);
      
      pastPositions.forEach(position => {
        const formatted = formatDuration(position.duration);
        expect(formatted).not.toContain('Present');
        expect(formatted).toMatch(/\w+ \d{4} - \w+ \d{4}/);
      });
    });

    it('should get complete duration for leadership positions', () => {
      const position = positions[0]; // AI Club President
      const complete = getCompleteDuration(position.duration);
      expect(complete).toContain(position.duration.start.split('-')[0]); // year
      expect(complete).toMatch(/\(.*\)/); // duration length in parentheses
    });
  });

  describe('Real-world usage patterns', () => {
    it('should format all experiences consistently', () => {
      const formattedExperiences = experiences.map(exp => ({
        ...exp,
        formattedDuration: formatDuration(exp.duration),
        completeDuration: getCompleteDuration(exp.duration)
      }));

      formattedExperiences.forEach(exp => {
        expect(exp.formattedDuration).toBeTruthy();
        expect(exp.completeDuration).toBeTruthy();
        expect(exp.completeDuration).toContain(exp.formattedDuration);
      });
    });

    it('should format all positions consistently', () => {
      const formattedPositions = positions.map(pos => ({
        ...pos,
        formattedDuration: formatDuration(pos.duration),
        completeDuration: getCompleteDuration(pos.duration)
      }));

      formattedPositions.forEach(pos => {
        expect(pos.formattedDuration).toBeTruthy();
        expect(pos.completeDuration).toBeTruthy();
        expect(pos.completeDuration).toContain(pos.formattedDuration);
      });
    });
  });
});
