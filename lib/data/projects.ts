import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Neural Style Transfer',
    description: 'Deep learning model for artistic style transfer using CNNs',
    longDescription: 'Implemented a neural style transfer system using convolutional neural networks to apply artistic styles to photographs. The model uses VGG19 as a feature extractor and optimizes content and style loss functions.',
    thumbnail: '/images/projects/neural-style-transfer.jpg',
    techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
    githubUrl: 'https://github.com/username/neural-style-transfer',
    demoUrl: 'https://neural-style-demo.example.com',
    featured: true,
    category: 'AI'
  },
  {
    id: 'project-2',
    title: 'Sentiment Analysis API',
    description: 'REST API for real-time sentiment analysis using transformer models',
    longDescription: 'Built a scalable REST API for sentiment analysis using BERT-based transformer models. Deployed with Docker and FastAPI, achieving 92% accuracy on multi-class sentiment classification.',
    thumbnail: '/images/projects/sentiment-api.jpg',
    techStack: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'Transformers'],
    githubUrl: 'https://github.com/username/sentiment-api',
    featured: true,
    category: 'ML'
  },
  {
    id: 'project-3',
    title: 'Object Detection System',
    description: 'Real-time object detection using YOLO v8 for autonomous systems',
    longDescription: 'Developed a real-time object detection system for autonomous vehicle applications using YOLO v8. Optimized for edge deployment with TensorRT, achieving 60 FPS on embedded hardware.',
    thumbnail: '/images/projects/object-detection.jpg',
    techStack: ['Python', 'PyTorch', 'YOLO', 'TensorRT', 'OpenCV'],
    githubUrl: 'https://github.com/username/object-detection',
    demoUrl: 'https://object-detection-demo.example.com',
    featured: true,
    category: 'AI'
  },
  {
    id: 'project-4',
    title: 'Recommendation Engine',
    description: 'Collaborative filtering recommendation system for e-commerce',
    longDescription: 'Built a hybrid recommendation engine combining collaborative filtering and content-based approaches. Implemented using matrix factorization and deep learning techniques.',
    thumbnail: '/images/projects/recommendation-engine.jpg',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'PostgreSQL', 'Redis'],
    githubUrl: 'https://github.com/username/recommendation-engine',
    featured: false,
    category: 'ML'
  },
  {
    id: 'project-5',
    title: 'Time Series Forecasting',
    description: 'LSTM-based model for stock price prediction and analysis',
    longDescription: 'Developed a time series forecasting system using LSTM networks for financial market prediction. Includes feature engineering, data preprocessing, and visualization dashboard.',
    thumbnail: '/images/projects/time-series.jpg',
    techStack: ['Python', 'TensorFlow', 'Pandas', 'Matplotlib', 'Streamlit'],
    githubUrl: 'https://github.com/username/time-series-forecasting',
    featured: false,
    category: 'Data Science'
  },
  {
    id: 'project-6',
    title: 'NLP Chatbot',
    description: 'Conversational AI chatbot using GPT-based language models',
    longDescription: 'Created an intelligent chatbot using fine-tuned GPT models for customer service applications. Integrated with web interface and supports context-aware conversations.',
    thumbnail: '/images/projects/chatbot.jpg',
    techStack: ['Python', 'OpenAI API', 'LangChain', 'React', 'Node.js'],
    githubUrl: 'https://github.com/username/nlp-chatbot',
    demoUrl: 'https://chatbot-demo.example.com',
    featured: false,
    category: 'AI'
  }
];

/**
 * Get featured projects for display on the main page
 * @param projectList - Optional array of projects to filter (defaults to the main projects array)
 * @returns Array of featured projects, limited to 3 items
 */
export const getFeaturedProjects = (projectList: Project[] = projects): Project[] => {
  return projectList.filter(p => p.featured).slice(0, 3);
};

/**
 * Get a project by its ID
 * @param id - The project ID
 * @returns The project if found, undefined otherwise
 */
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};

/**
 * Get projects by category
 * @param category - The project category
 * @returns Array of projects in the specified category
 */
export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(p => p.category === category);
};
