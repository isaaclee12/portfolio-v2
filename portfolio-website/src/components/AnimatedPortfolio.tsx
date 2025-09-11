import React, { useState, useEffect, useRef } from 'react';
import type { 
  PortfolioData, 
  ProfessionalExperience, 
  CoolProject, 
  TechStack 
} from '../../../shared-data/types';
import portfolioData from '../../../shared-data/portfolio-data.json';
import './AnimatedPortfolio.css';

interface AnimatedPortfolioProps {
  data?: PortfolioData;
}

const AnimatedPortfolio: React.FC<AnimatedPortfolioProps> = ({ 
  data = portfolioData as PortfolioData 
}) => {
  const [isTransformed, setIsTransformed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  const respectsReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const triggerTransformation = async () => {
    if (respectsReducedMotion) {
      setIsTransformed(true);
      return;
    }

    setIsAnimating(true);
    
    // FLIP Animation technique will be implemented here
    // For now, simple state change
    setTimeout(() => {
      setIsTransformed(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    }, 100);
  };

  const skipAnimation = () => {
    setIsTransformed(true);
    setIsAnimating(false);
  };

  return (
    <div 
      ref={containerRef}
      className={`animated-portfolio-container ${isTransformed ? 'transformed' : 'basic'} ${isAnimating ? 'animating' : ''}`}
    >
      {/* Skip Animation Button */}
      {!isTransformed && (
        <button 
          className="skip-animation-btn"
          onClick={skipAnimation}
          aria-label="Skip animation and go directly to portfolio"
        >
          Skip Animation
        </button>
      )}

      {/* Main Transform Button */}
      {!isTransformed && (
        <div className="transform-trigger">
          <button 
            className="transform-btn"
            onClick={triggerTransformation}
            disabled={isAnimating}
          >
            Click me to improve this Portfolio!
          </button>
        </div>
      )}

      {/* Original Plain HTML Structure */}
      <div className="portfolio-content">
        <h1 className="main-title">{data.personal.name}</h1>
        <p className="main-subtitle">{data.personal.title}</p>
        
        {/* Resume Section - Original Structure */}
        <div className="resume-section">
          <h2 className="section-heading">Resume</h2>
          {data.professionalExperience.map((exp: ProfessionalExperience, index: number) => (
            <div key={index} className="experience-item">
              <div className="company-info">
                {exp.company}, {exp.subsidiary_or_department}
              </div>
              <div className="job-info">{exp.titles_held.join(', ')}</div>
              <div className="date-info">{exp.dates_worked[0]} - {exp.dates_worked[1]}</div>
              
              <div className="urls-section">
                <p>Relevant URLs:</p>
                <ul className="urls-list">
                  {exp.relevant_urls.map((url: string, idx: number) => (
                    <li key={idx} className="url-item">
                      <a href={url} className="url-link">{url}</a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="achievements-section">
                <p>Achievements:</p>
                <ul className="achievements-list">
                  {exp.achievements.map((achievement: string, idx: number) => (
                    <li key={idx} className="achievement-item">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="tech-section">
                <p>Technologies Used:</p>
                <ul className="tech-list">
                  {exp.technologies.map((technology: string, idx: number) => (
                    <li key={idx} className="tech-item">
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Projects Section - Original Structure */}
        <div className="projects-section">
          <h2 className="section-heading">Featured Projects</h2>
          {data.coolProjects.map((project: CoolProject, index: number) => (
            <div key={index} className="project-item">
              <h3 className="project-title">{project.name}</h3>
              <div className="project-description">{project.description}</div>
              <div className="project-backstory">{project.backstory}</div>
              {project.live_url && (
                <a href={project.live_url} className="project-url">{project.live_url}</a>
              )}
              {project.image && (
                <div className="project-image-path">{project.image}</div>
              )}
              
              <div className="highlights-section">
                <p>Highlights:</p>
                <ul className="highlights-list">
                  {project.highlights?.map((highlight: string, idx: number) => (
                    <li key={idx} className="highlight-item">{highlight}</li>
                  ))}
                </ul>
              </div>
              
              <div className="project-tech-section">
                <p>Technologies Used:</p>
                <ul className="project-tech-list">
                  {project.technologies.map((technology: string, idx: number) => (
                    <li key={idx} className="project-tech-item">{technology}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Section - Original Structure */}
        <div className="skills-section">
          <h2 className="section-heading">Technical Skills</h2>
          {data.techStack.map((category: TechStack, index: number) => (
            <div key={index} className="skill-category">
              <h3 className="skill-category-title">{category.category}</h3>
              <ul className="skill-list">
                {category.technologies.map((tech: string, idx: number) => (
                  <li key={idx} className="skill-item">{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedPortfolio;