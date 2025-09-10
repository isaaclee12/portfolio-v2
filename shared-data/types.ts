export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  highlights?: string[];
  category: 'professional' | 'personal';
}

export interface TechStack {
  category: string;
  technologies: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  summary: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  projects: Project[];
  techStack: TechStack[];
}