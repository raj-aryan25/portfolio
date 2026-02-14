import { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python', proficiency: 95 },
      { name: 'JavaScript/TypeScript', proficiency: 85 },
      { name: 'Java', proficiency: 75 },
      { name: 'C++', proficiency: 70 },
      { name: 'SQL', proficiency: 80 }
    ]
  },
  {
    category: 'ML/AI Frameworks',
    skills: [
      { name: 'TensorFlow', proficiency: 90 },
      { name: 'PyTorch', proficiency: 90 },
      { name: 'Keras', proficiency: 85 },
      { name: 'Scikit-learn', proficiency: 90 },
      { name: 'Hugging Face Transformers', proficiency: 80 }
    ]
  },
  {
    category: 'Deep Learning',
    skills: [
      { name: 'Computer Vision', proficiency: 85 },
      { name: 'Natural Language Processing', proficiency: 85 },
      { name: 'Neural Networks', proficiency: 90 },
      { name: 'CNNs & RNNs', proficiency: 85 },
      { name: 'Transformers', proficiency: 80 }
    ]
  },
  {
    category: 'Data Science & Analytics',
    skills: [
      { name: 'Pandas', proficiency: 90 },
      { name: 'NumPy', proficiency: 90 },
      { name: 'Matplotlib/Seaborn', proficiency: 85 },
      { name: 'Jupyter Notebooks', proficiency: 90 },
      { name: 'Data Visualization', proficiency: 80 }
    ]
  },
  {
    category: 'Web Development',
    skills: [
      { name: 'React', proficiency: 85 },
      { name: 'Next.js', proficiency: 80 },
      { name: 'Node.js', proficiency: 75 },
      { name: 'FastAPI', proficiency: 85 },
      { name: 'REST APIs', proficiency: 85 }
    ]
  },
  {
    category: 'Tools & Technologies',
    skills: [
      { name: 'Git/GitHub', proficiency: 90 },
      { name: 'Docker', proficiency: 80 },
      { name: 'AWS', proficiency: 70 },
      { name: 'Linux/Unix', proficiency: 85 },
      { name: 'MLflow', proficiency: 75 }
    ]
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL', proficiency: 75 },
      { name: 'MongoDB', proficiency: 70 },
      { name: 'Redis', proficiency: 65 },
      { name: 'Vector Databases', proficiency: 60 }
    ]
  }
];

/**
 * Get all skills across all categories
 * @returns Flat array of all skills
 */
export const getAllSkills = () => {
  return skillCategories.flatMap(category => category.skills);
};

/**
 * Get skills by category name
 * @param categoryName - The category name
 * @returns Array of skills in the specified category, or empty array if not found
 */
export const getSkillsByCategory = (categoryName: string) => {
  const category = skillCategories.find(c => c.category === categoryName);
  return category ? category.skills : [];
};

/**
 * Get top skills across all categories
 * @param count - Number of top skills to return (default: 10)
 * @returns Array of top skills sorted by proficiency
 */
export const getTopSkills = (count: number = 10) => {
  return getAllSkills()
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, count);
};

/**
 * Get skills above a certain proficiency threshold
 * @param threshold - Minimum proficiency level (0-100)
 * @returns Array of skills meeting the threshold
 */
export const getSkillsAboveThreshold = (threshold: number) => {
  return getAllSkills().filter(skill => skill.proficiency >= threshold);
};
