// Core data types for the portfolio website

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  category: 'ML' | 'AI' | 'Web' | 'Data Science' | 'Other';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: {
    start: string;
    end: string | 'Present';
  };
  description: string;
  achievements: string[];
  technologies: string[];
  featured: boolean;
}

export interface PositionOfResponsibility {
  id: string;
  organization: string;
  role: string;
  duration: {
    start: string;
    end: string | 'Present';
  };
  description: string;
  impact: string[];
  current: boolean;
}

export interface Skill {
  name: string;
  proficiency: number; // 0-100
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  colors: {
    light: ColorScheme;
    dark: ColorScheme;
  };
  animations: {
    duration: {
      fast: number;
      normal: number;
      slow: number;
    };
    easing: string;
  };
}

export interface ColorScheme {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
}

export interface NavLink {
  label: string;
  href: string;
}

// Component prop types

export interface ProjectCardProps {
  project: Project;
  variant?: 'preview' | 'full';
}

export interface ExperienceCardProps {
  experience: Experience;
  variant?: 'preview' | 'full';
}

export interface PORDisplayProps {
  positions: PositionOfResponsibility[];
}

export interface HeaderProps {
  navLinks: NavLink[];
}

export interface ThemeToggleProps {
  className?: string;
}

export interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

export interface TypeWriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}
