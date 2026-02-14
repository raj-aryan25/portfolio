import fc from 'fast-check';
import { Project, Experience } from '@/types';
import { getFeaturedProjects } from '../projects';
import { getFeaturedExperiences } from '../experience';

/**
 * **Validates: Requirements 3.4, 4.5**
 * 
 * Property 2: Featured Content Filtering
 * 
 * For any collection of content items (projects or experiences) where some items 
 * are marked as `featured: true`, the preview section on the main page should 
 * display only the featured items and exclude non-featured items.
 */

// Arbitraries for generating test data
const projectArbitrary = fc.record({
  id: fc.string({ minLength: 1 }),
  title: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
  thumbnail: fc.string({ minLength: 1 }),
  techStack: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
  featured: fc.boolean(),
  category: fc.constantFrom('ML', 'AI', 'Web', 'Data Science', 'Other') as fc.Arbitrary<'ML' | 'AI' | 'Web' | 'Data Science' | 'Other'>,
  longDescription: fc.option(fc.string(), { nil: undefined }),
  githubUrl: fc.option(fc.webUrl(), { nil: undefined }),
  demoUrl: fc.option(fc.webUrl(), { nil: undefined }),
}) as fc.Arbitrary<Project>;

const experienceArbitrary = fc.record({
  id: fc.string({ minLength: 1 }),
  company: fc.string({ minLength: 1 }),
  role: fc.string({ minLength: 1 }),
  duration: fc.record({
    start: fc.string({ minLength: 1 }),
    end: fc.oneof(fc.string({ minLength: 1 }), fc.constant('Present')),
  }),
  description: fc.string({ minLength: 1 }),
  achievements: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
  technologies: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
  featured: fc.boolean(),
}) as fc.Arbitrary<Experience>;

describe('Featured Content Filtering - Property-Based Tests', () => {
  describe('getFeaturedProjects', () => {
    it('should return only featured projects', () => {
      fc.assert(
        fc.property(
          fc.array(projectArbitrary, { minLength: 5, maxLength: 20 }),
          (projects) => {
            const featured = getFeaturedProjects(projects);
            
            // Property 1: All returned items should be featured
            const allFeatured = featured.every((p: Project) => p.featured === true);
            expect(allFeatured).toBe(true);
            
            // Property 2: All returned items should exist in the original projects array
            // and should be marked as featured in the original array
            featured.forEach((featuredProject) => {
              const originalProject = projects.find(p => 
                p === featuredProject || 
                (p.id === featuredProject.id && p.featured === featuredProject.featured)
              );
              expect(originalProject).toBeDefined();
              expect(originalProject?.featured).toBe(true);
            });
            
            // Property 3: Should not return more than 3 items (as per spec)
            expect(featured.length).toBeLessThanOrEqual(3);
            
            // Property 4: If there are featured items, at least some should be returned
            const featuredCount = projects.filter(p => p.featured).length;
            if (featuredCount > 0) {
              expect(featured.length).toBeGreaterThan(0);
              expect(featured.length).toBeLessThanOrEqual(Math.min(3, featuredCount));
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return empty array when no projects are featured', () => {
      fc.assert(
        fc.property(
          fc.array(projectArbitrary, { minLength: 1, maxLength: 10 }),
          (projects) => {
            // Set all projects to non-featured
            const nonFeaturedProjects = projects.map(p => ({ ...p, featured: false }));
            const featured = getFeaturedProjects(nonFeaturedProjects);
            
            expect(featured).toEqual([]);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain order of featured projects from original array', () => {
      fc.assert(
        fc.property(
          fc.array(projectArbitrary, { minLength: 5, maxLength: 20 }),
          (projects) => {
            const featured = getFeaturedProjects(projects);
            const featuredFromOriginal = projects.filter(p => p.featured).slice(0, 3);
            
            // The order should match the original array order
            expect(featured.map(p => p.id)).toEqual(featuredFromOriginal.map(p => p.id));
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('getFeaturedExperiences', () => {
    it('should return only featured experiences', () => {
      fc.assert(
        fc.property(
          fc.array(experienceArbitrary, { minLength: 3, maxLength: 15 }),
          (experiences) => {
            const featured = getFeaturedExperiences(experiences);
            
            // Property 1: All returned items should be featured
            const allFeatured = featured.every((e: Experience) => e.featured === true);
            expect(allFeatured).toBe(true);
            
            // Property 2: All returned items should exist in the original experiences array
            // and should be marked as featured in the original array
            featured.forEach((featuredExperience) => {
              const originalExperience = experiences.find(e => 
                e === featuredExperience || 
                (e.id === featuredExperience.id && e.featured === featuredExperience.featured)
              );
              expect(originalExperience).toBeDefined();
              expect(originalExperience?.featured).toBe(true);
            });
            
            // Property 3: Should not return more than 2 items (as per spec)
            expect(featured.length).toBeLessThanOrEqual(2);
            
            // Property 4: If there are featured items, at least some should be returned
            const featuredCount = experiences.filter(e => e.featured).length;
            if (featuredCount > 0) {
              expect(featured.length).toBeGreaterThan(0);
              expect(featured.length).toBeLessThanOrEqual(Math.min(2, featuredCount));
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return empty array when no experiences are featured', () => {
      fc.assert(
        fc.property(
          fc.array(experienceArbitrary, { minLength: 1, maxLength: 10 }),
          (experiences) => {
            // Set all experiences to non-featured
            const nonFeaturedExperiences = experiences.map(e => ({ ...e, featured: false }));
            const featured = getFeaturedExperiences(nonFeaturedExperiences);
            
            expect(featured).toEqual([]);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain order of featured experiences from original array', () => {
      fc.assert(
        fc.property(
          fc.array(experienceArbitrary, { minLength: 3, maxLength: 15 }),
          (experiences) => {
            const featured = getFeaturedExperiences(experiences);
            const featuredFromOriginal = experiences.filter(e => e.featured).slice(0, 2);
            
            // The order should match the original array order
            expect(featured.map(e => e.id)).toEqual(featuredFromOriginal.map(e => e.id));
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
