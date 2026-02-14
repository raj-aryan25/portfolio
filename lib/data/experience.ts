import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'TechCorp AI Labs',
    role: 'Machine Learning Engineering Intern',
    duration: {
      start: '2023-06',
      end: '2023-08'
    },
    description: 'Worked on developing and optimizing machine learning models for computer vision applications in the autonomous systems team.',
    achievements: [
      'Improved model inference speed by 35% through optimization techniques',
      'Developed data augmentation pipeline that increased training dataset by 200%',
      'Implemented automated testing framework for ML model validation',
      'Collaborated with cross-functional team of 8 engineers on production deployment'
    ],
    technologies: ['Python', 'PyTorch', 'Docker', 'AWS', 'MLflow', 'Git'],
    featured: true
  },
  {
    id: 'exp-2',
    company: 'DataVision Inc.',
    role: 'AI Research Intern',
    duration: {
      start: '2023-01',
      end: '2023-05'
    },
    description: 'Conducted research on natural language processing and developed prototype models for text analysis applications.',
    achievements: [
      'Published research paper on transformer-based sentiment analysis',
      'Built NLP pipeline processing 10K+ documents per hour',
      'Achieved 94% accuracy on multi-class text classification task',
      'Presented findings at internal research symposium'
    ],
    technologies: ['Python', 'TensorFlow', 'Transformers', 'BERT', 'Jupyter', 'Pandas'],
    featured: true
  },
  {
    id: 'exp-3',
    company: 'StartupX',
    role: 'Full Stack Developer Intern',
    duration: {
      start: '2022-06',
      end: '2022-08'
    },
    description: 'Developed web applications and RESTful APIs for a SaaS platform serving 5000+ users.',
    achievements: [
      'Built responsive frontend using React and TypeScript',
      'Designed and implemented REST API with Node.js and Express',
      'Reduced page load time by 40% through optimization',
      'Implemented user authentication and authorization system'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'AWS'],
    featured: false
  },
  {
    id: 'exp-4',
    company: 'University Research Lab',
    role: 'Research Assistant',
    duration: {
      start: '2022-01',
      end: 'Present'
    },
    description: 'Assisting with deep learning research projects focused on computer vision and medical image analysis.',
    achievements: [
      'Contributed to 2 research papers submitted to top-tier conferences',
      'Developed custom CNN architectures for medical image segmentation',
      'Managed dataset of 50K+ annotated medical images',
      'Mentored 3 undergraduate students on ML projects'
    ],
    technologies: ['Python', 'PyTorch', 'OpenCV', 'scikit-learn', 'CUDA', 'Linux'],
    featured: false
  }
];

/**
 * Get featured experiences for display on the main page
 * @param experienceList - Optional array of experiences to filter (defaults to the main experiences array)
 * @returns Array of featured experiences, limited to 2 items
 */
export const getFeaturedExperiences = (experienceList: Experience[] = experiences): Experience[] => {
  return experienceList.filter(e => e.featured).slice(0, 2);
};

/**
 * Get an experience by its ID
 * @param id - The experience ID
 * @returns The experience if found, undefined otherwise
 */
export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find(e => e.id === id);
};

/**
 * Get current experiences (where end date is 'Present')
 * @returns Array of current experiences
 */
export const getCurrentExperiences = (): Experience[] => {
  return experiences.filter(e => e.duration.end === 'Present');
};
