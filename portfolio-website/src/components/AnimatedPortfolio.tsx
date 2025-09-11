import React, { useState, useEffect } from 'react';
import type { PortfolioData } from '../../../shared-data/types';
import portfolioData from '../../../shared-data/portfolio-data.json';
import './AnimatedPortfolio.css';

type AnimationPhase = 'basic' | 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'complete';

interface AnimatedPortfolioProps {
  data?: PortfolioData;
}

const AnimatedPortfolio: React.FC<AnimatedPortfolioProps> = ({ 
  data = portfolioData as PortfolioData 
}) => {
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('basic');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);

  // Check for reduced motion preference
  const respectsReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Show skip button after component mounts
    setShowSkipButton(true);
  }, []);

  const triggerTransformation = () => {
    if (respectsReducedMotion) {
      // Instant transformation for reduced motion
      setAnimationPhase('complete');
      return;
    }

    setIsTransitioning(true);
    
    // Staggered phase transitions
    const phaseTimings = [
      { phase: 'phase1' as AnimationPhase, delay: 0 },
      { phase: 'phase2' as AnimationPhase, delay: 200 },
      { phase: 'phase3' as AnimationPhase, delay: 400 },
      { phase: 'phase4' as AnimationPhase, delay: 800 },
      { phase: 'complete' as AnimationPhase, delay: 1800 }
    ];

    phaseTimings.forEach(({ phase, delay }) => {
      setTimeout(() => {
        setAnimationPhase(phase);
        if (phase === 'complete') {
          setIsTransitioning(false);
        }
      }, delay);
    });
  };

  const skipAnimation = () => {
    setAnimationPhase('complete');
    setIsTransitioning(false);
  };

  const baseClasses = `animated-portfolio ${animationPhase}`;

  return (
    <div className={baseClasses}>
      {/* Skip Animation Button */}
      {showSkipButton && animationPhase === 'basic' && (
        <button 
          className="skip-animation-btn"
          onClick={skipAnimation}
          aria-label="Skip animation and go directly to portfolio"
        >
          Skip Animation
        </button>
      )}

      {/* Main Transform Button */}
      {animationPhase === 'basic' && (
        <div className="transform-trigger">
          <button 
            className="transform-btn"
            onClick={triggerTransformation}
            disabled={isTransitioning}
          >
            Click me to improve this Portfolio!
          </button>
        </div>
      )}

      {/* Background */}
      <div className="portfolio-background"></div>

      {/* Header Section */}
      <header className="portfolio-header">
        <h1 className="portfolio-title">{data.personal.name}</h1>
        <p className="portfolio-subtitle">{data.personal.title}</p>
        
        {/* Navigation */}
        <nav className="portfolio-nav">
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="hero-content">
          <p className="hero-summary">{data.personal.summary}</p>
          <div className="hero-contact">
            <span className="contact-item">{data.personal.email}</span>
            <span className="contact-item">{data.personal.location}</span>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="portfolio-section" id="experience">
        <h2 className="section-title">Professional Experience</h2>
        <div className="experience-grid">
          {data.professionalExperience.map((exp, index) => (
            <article key={index} className="experience-card">
              <div className="card-header">
                <h3 className="company-name">{exp.company}</h3>
                {exp.subsidiary_or_department && (
                  <p className="department">{exp.subsidiary_or_department}</p>
                )}
              </div>
              
              <div className="card-meta">
                <p className="job-title">{exp.titles_held.join(', ')}</p>
                <p className="dates">{exp.dates_worked[0]} - {exp.dates_worked[1]}</p>
              </div>

              <ul className="achievements-list">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="achievement-item">{achievement}</li>
                ))}
              </ul>

              <div className="tech-stack">
                {exp.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="portfolio-section" id="projects">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {data.coolProjects.map((project, index) => (
            <article key={index} className="project-card">
              <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                {project.live_url && (
                  <a href={project.live_url} className="project-link" target="_blank" rel="noopener noreferrer">
                    View Live
                  </a>
                )}
              </div>

              <p className="project-description">{project.description}</p>
              
              {project.backstory && (
                <p className="project-backstory">{project.backstory}</p>
              )}

              {project.highlights && (
                <ul className="highlights-list">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="highlight-item">{highlight}</li>
                  ))}
                </ul>
              )}

              <div className="tech-stack">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="portfolio-section" id="skills">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {data.techStack.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.category}</h3>
              <div className="skills-list">
                {category.technologies.map((tech, idx) => (
                  <span key={idx} className="skill-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnimatedPortfolio;