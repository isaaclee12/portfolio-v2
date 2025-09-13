import React, { useState, useEffect, useRef } from 'react';
import type { PortfolioData } from '../../../shared-data/types';
import portfolioData from '../../../shared-data/portfolio-data.json';
import './ProfessionalPortfolio.css';


const ProfessionalPortfolio: React.FC = () => {
  const data = portfolioData as PortfolioData;
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sections = [
    { id: 'hero', ref: heroRef, title: 'Home' },
    { id: 'about', ref: aboutRef, title: 'About' },
    { id: 'experience', ref: experienceRef, title: 'Experience' },
    { id: 'projects', ref: projectsRef, title: 'Projects' },
    { id: 'skills', ref: skillsRef, title: 'Skills' },
    { id: 'contact', ref: contactRef, title: 'Contact' }
  ];

  useEffect(() => {
    // Trigger load animations
    setTimeout(() => setIsLoaded(true), 100);

    // Intersection Observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.3] }
    );

    sections.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.ref.current) {
      section.ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`portfolio ${isLoaded ? 'loaded' : ''}`}>
      {/* Navigation Sidebar */}
      <nav className="nav-sidebar">
        <div className="nav-progress">
          {sections.map((section, index) => {
            const icons = ['🏠', '👤', '💼', '🚀', '🧠', '📧'];
            return (
              <div
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => scrollToSection(section.id)}
              >
                <div className="nav-dot">
                  <span>{icons[index]}</span>
                </div>
                <span className="nav-label">{section.title}</span>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="section hero-section">
          <div className="hero-background">
            <div className="hero-gradient"></div>
            <div className="hero-particles"></div>
          </div>
          <div className="hero-content slide-in-left">
            <h1 className="hero-title">
              <span className="title-line">Isaac</span>
              <span className="title-line">Lee</span>
            </h1>
            <p className="hero-subtitle slide-in-left delay-200">
              {data.personal.title}
            </p>
            <p className="hero-description slide-in-left delay-400">
              {data.personal.summary}
            </p>
            <div className="hero-cta slide-in-left delay-600">
              <button 
                className="cta-button primary"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </button>
              <button 
                className="cta-button secondary"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </button>
            </div>
          </div>
          <div className="hero-image slide-in-right delay-300">
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar-placeholder">IL</div>
              </div>
              <div className="profile-info">
                <h3>Available for hire</h3>
                <p>{data.personal.location}</p>
                <p>{data.personal.email}</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="section about-section">
          <div className="section-content">
            <h2 className="section-title slide-in-up">About Me</h2>
            <div className="about-grid">
              <div className="about-text slide-in-left">
                <p>
                  I'm a passionate software engineer with expertise in building scalable web applications 
                  and data-driven solutions. My experience spans from AI-powered learning platforms to 
                  interactive data visualizations that serve real public utility.
                </p>
                <p>
                  I thrive on tackling complex technical challenges, from optimizing performance for 
                  thousands of users to processing massive datasets with innovative approaches.
                </p>
              </div>
              <div className="about-stats slide-in-right">
                <div className="stat-item">
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{data.coolProjects.length + data.oldProjects.length}</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{data.professionalExperience.length}</div>
                  <div className="stat-label">Companies Worked</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" ref={experienceRef} className="section experience-section">
          <div className="section-content">
            <h2 className="section-title slide-in-up">Professional Experience</h2>
            <div className="timeline">
              {data.professionalExperience.map((exp, expIndex) => (
                <div key={expIndex} className={`timeline-item slide-in-${expIndex % 2 === 0 ? 'left' : 'right'} delay-${expIndex * 200}`}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="experience-card">
                      <div className="card-header">
                        <h3 className="company">{exp.company}</h3>
                        <div className="period">{exp.dates_worked[0]} - {exp.dates_worked[1]}</div>
                      </div>
                      {exp.subsidiary_or_department && (
                        <p className="department">{exp.subsidiary_or_department}</p>
                      )}
                      <div className="role">{exp.titles_held.join(', ')}</div>
                      
                      <ul className="achievements">
                        {exp.achievements.slice(0, 3).map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                      
                      <div className="tech-stack">
                        {exp.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="section projects-section">
          <div className="section-content">
            <h2 className="section-title slide-in-up">Featured Projects</h2>
            <div className="projects-grid">
              {data.coolProjects.map((project, projIndex) => (
                <div key={projIndex} className={`project-card slide-in-up delay-${projIndex * 200}`}>
                  <div className="project-image">
                    <div className="image-placeholder">
                      <span>🌟</span>
                    </div>
                    <div className="project-overlay">
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="project-link">
                          View Live
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    {project.highlights && (
                      <ul className="project-highlights">
                        {project.highlights.slice(0, 2).map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="project-tech">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="section skills-section">
          <div className="section-content">
            <h2 className="section-title slide-in-up">Technical Skills</h2>
            <div className="skills-grid">
              {data.techStack.map((category, index) => (
                <div key={index} className={`skill-category slide-in-up delay-${index * 100}`}>
                  <div className="skill-icon">
                    <span>{index === 0 ? '🎨' : index === 1 ? '⚙️' : '🔧'}</span>
                  </div>
                  <h3 className="skill-title">{category.category}</h3>
                  <div className="skill-items">
                    {category.technologies.map((tech, idx) => (
                      <div key={idx} className="skill-item">
                        <span className="skill-name">{tech}</span>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress" 
                            style={{ width: `${85 + Math.random() * 15}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="section contact-section">
          <div className="section-content">
            <h2 className="section-title slide-in-up">Let's Work Together</h2>
            <div className="contact-content slide-in-up delay-200">
              <p className="contact-intro">
                Ready to bring your next project to life? Let's discuss how we can work together.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span className="contact-text">{data.personal.email}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span className="contact-text">{data.personal.location}</span>
                </div>
              </div>
              <div className="contact-cta">
                <a href={`mailto:${data.personal.email}`} className="cta-button primary">
                  Send Message
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfessionalPortfolio;