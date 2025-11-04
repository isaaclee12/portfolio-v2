export interface ProfessionalExperience {
  company: string;
  subsidiary_or_department?: string;
  titles_held: string[];
  dates_worked: string[];
  relevant_urls: string[];
  achievements: string[];
  technologies: string[];
}

export interface CoolProject {
  name: string;
  description: string;
  backstory?: string;
  live_url?: string;
  image?: string;
  highlights?: string[];
  technologies: string[];
}

export interface OldProject {
  title: string;
  description: string;
  url?: string;
}

export interface TechStack {
  category: string;
  technologies: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  dates: string[];
}

export interface PortfolioData {
  personal: PersonalInfo;
  professionalExperience: ProfessionalExperience[];
  education?: Education;
  coolProjects: CoolProject[];
  oldProjects: OldProject[];
  techStack: TechStack[];
}
