import { PositionOfResponsibility } from '@/types';

export const positions: PositionOfResponsibility[] = [
  {
    id: 'por-1',
    organization: 'University AI & ML Club',
    role: 'President',
    duration: {
      start: '2023-08',
      end: 'Present'
    },
    description: 'Leading the university\'s largest technical club focused on artificial intelligence and machine learning, organizing workshops, hackathons, and research discussions.',
    impact: [
      'Grew club membership from 80 to 200+ active members',
      'Organized 12+ technical workshops on ML/AI topics',
      'Hosted annual AI hackathon with 150+ participants',
      'Established partnerships with 5 tech companies for mentorship programs',
      'Launched weekly paper reading sessions with 40+ regular attendees'
    ],
    current: true
  },
  {
    id: 'por-2',
    organization: 'Computer Science Department',
    role: 'Teaching Assistant - Machine Learning',
    duration: {
      start: '2023-01',
      end: 'Present'
    },
    description: 'Assisting with undergraduate machine learning course, conducting lab sessions, grading assignments, and mentoring students on ML projects.',
    impact: [
      'Conducted weekly lab sessions for 60+ students',
      'Mentored 15 student teams on semester-long ML projects',
      'Developed supplementary learning materials and tutorials',
      'Achieved 4.8/5.0 student satisfaction rating',
      'Held office hours helping students with coursework and career guidance'
    ],
    current: true
  },
  {
    id: 'por-3',
    organization: 'Tech Conference 2023',
    role: 'Student Volunteer Coordinator',
    duration: {
      start: '2023-03',
      end: '2023-06'
    },
    description: 'Coordinated student volunteer program for regional tech conference with 500+ attendees.',
    impact: [
      'Managed team of 25 student volunteers',
      'Organized volunteer training and scheduling',
      'Facilitated smooth execution of 3-day conference',
      'Received commendation from conference organizers for exceptional coordination'
    ],
    current: false
  },
  {
    id: 'por-4',
    organization: 'Open Source Initiative',
    role: 'Core Contributor',
    duration: {
      start: '2022-09',
      end: 'Present'
    },
    description: 'Contributing to open-source machine learning libraries and tools, reviewing pull requests, and helping maintain documentation.',
    impact: [
      'Contributed 50+ pull requests to popular ML libraries',
      'Reviewed 100+ community contributions',
      'Improved documentation for 3 major features',
      'Helped onboard 20+ new contributors to the project',
      'Participated in monthly maintainer meetings'
    ],
    current: true
  },
  {
    id: 'por-5',
    organization: 'Student Government',
    role: 'Technology Committee Member',
    duration: {
      start: '2022-08',
      end: '2023-05'
    },
    description: 'Served on student government technology committee, advising on campus technology initiatives and student needs.',
    impact: [
      'Advocated for improved campus WiFi infrastructure',
      'Helped launch student feedback portal used by 2000+ students',
      'Organized tech literacy workshops for non-technical students',
      'Represented student interests in university IT planning meetings'
    ],
    current: false
  }
];

/**
 * Get current positions of responsibility
 * @returns Array of current positions (where current is true)
 */
export const getCurrentPositions = (): PositionOfResponsibility[] => {
  return positions.filter(p => p.current);
};

/**
 * Get a position by its ID
 * @param id - The position ID
 * @returns The position if found, undefined otherwise
 */
export const getPositionById = (id: string): PositionOfResponsibility | undefined => {
  return positions.find(p => p.id === id);
};

/**
 * Get positions by organization
 * @param organization - The organization name
 * @returns Array of positions in the specified organization
 */
export const getPositionsByOrganization = (organization: string): PositionOfResponsibility[] => {
  return positions.filter(p => p.organization === organization);
};

/**
 * Get all past positions (where current is false)
 * @returns Array of past positions
 */
export const getPastPositions = (): PositionOfResponsibility[] => {
  return positions.filter(p => !p.current);
};
