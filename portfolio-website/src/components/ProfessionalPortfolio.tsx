import React, { useState, useEffect, useRef } from "react";
import type { PortfolioData } from "../../../shared-data/types";
import portfolioData from "../../../shared-data/portfolio-data.json";
import "./ProfessionalPortfolio.css";

const ProfessionalPortfolio: React.FC = () => {
  const data = portfolioData as PortfolioData;
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoaded, setIsLoaded] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sections = [
    { id: "hero", ref: heroRef, title: "Home" },
    { id: "about", ref: aboutRef, title: "About" },
    { id: "experience", ref: experienceRef, title: "Experience" },
    { id: "projects", ref: projectsRef, title: "Projects" },
    { id: "skills", ref: skillsRef, title: "Skills" },
    { id: "contact", ref: contactRef, title: "Contact" },
  ];

  useEffect(() => {
    // Trigger load animations
    setTimeout(() => setIsLoaded(true), 100);

    // Intersection Observer for active section tracking and scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
          // Add visible class when section enters viewport
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      { threshold: [0.2, 0.3] }
    );

    sections.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section?.ref.current) {
      section.ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`portfolio ${isLoaded ? "loaded" : ""}`}>
      {/* Navigation Sidebar */}
      <nav className="nav-sidebar">
        <div className="nav-progress">
          {sections.map((section, index) => {
            const icons = ["🏠", "👋", "💻", "🚀", "🧠", "📧"];
            return (
              <div
                key={section.id}
                className={`nav-item ${
                  activeSection === section.id ? "active" : ""
                }`}
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
              <span className="title-line">Isaac Lee</span>
            </h1>
            <p className="hero-subtitle slide-in-left delay-200">
              {data.personal.title}
            </p>
            <p className="hero-description slide-in-left delay-400">
              {data.personal.description}
            </p>
            <div className="hero-cta slide-in-left delay-600">
              <button
                className="cta-button primary"
                onClick={() => scrollToSection("experience")}
              >
                View My Experience
              </button>
              <button
                className="cta-button secondary"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </button>
            </div>
          </div>
          <div className="hero-image slide-in-right delay-300">
            <div className="profile-card card-throw">
              <div className="profile-avatar">
                <img src="/images/isaac.jpg" alt="Isaac Lee" className="avatar-image" />
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
              <div className="about-text">
                <p className="slide-in-up delay-100">
                  I'm a full-stack software engineer passionate about building technology that drives meaningful impact. Over the past 3+ years, I've thrived as a technical generalist who seamlessly moves between frontend development, backend architecture, DevOps infrastructure, and everything in between to deliver complete solutions that serve millions of users globally.
                </p>
                <p className="slide-in-up delay-200">
                  In my professional roles, I've acquired expertise in TypeScript, React, Node.js, Python, and Django, plus DevOps expertise in AWS, Docker, and Kafka. I've led performance optimizations that improved system speeds by 200%, implemented compliance-focused features (GDPR, accessibility), and architected AI-powered applications from concept to production.
                </p>
                <p className="slide-in-up delay-300">
                  I find I'm driven to work hard when collaborating with like-minded people on cross-functional teams to solve complex technical challenges in domains that make life better. I thrive in environments where technical excellence meets social impact, working alongside kind, mission-driven colleagues who care about the work we're building together.
                </p>
                <p className="slide-in-up delay-400">
                  Whether I'm diving deep into a single component or architecting across an entire system, I adapt quickly to what each project needs. I'm equally comfortable contributing to a focused sprint or leading cross-functional initiatives. I switch contexts and projects as readily as I switch between the terminal and the browser.
                </p>
                <p className="slide-in-up delay-500">
                  I believe the best software comes from truly understanding the people it serves. Whether working with medical professionals on patient treatment software or collaborating with product teams on globalized and accessible learner experiences, I bring curiosity, clear communication, and a commitment to building solutions that make a real difference.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          ref={experienceRef}
          className="section experience-section"
        >
          <div className="section-content">
            <h2 className="section-title slide-in-up">
              Professional Experience
            </h2>
            <div className="timeline">
              {data.professionalExperience.map((exp, expIndex) => (
                <div
                  key={expIndex}
                  className={`timeline-item slide-in-${
                    expIndex % 2 === 0 ? "left" : "right"
                  } delay-${expIndex * 200}`}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="experience-card">
                      <div className="card-header">
                        <h3 className="company">{exp.company}</h3>
                        <div className="period">
                          {exp.dates_worked[0]} - {exp.dates_worked[1]}
                        </div>
                      </div>
                      {exp.subsidiary_or_department && (
                        <p className="department">
                          {exp.subsidiary_or_department}
                        </p>
                      )}
                      <div className="role">{exp.titles_held.join(", ")}</div>

                      <ul className="achievements">
                        {exp.achievements
                          .slice(0, 3)
                          .map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                      </ul>

                      <div className="tech-stack">
                        {exp.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Education Timeline End */}
              {data.education && (
                <div className="timeline-end">
                  <div className="education-card slide-in-up delay-600">
                    <div className="education-icon">🎓</div>
                    <h3 className="education-school">{data.education.school}</h3>
                    <div className="education-degree">{data.education.degree}</div>
                    <div className="education-dates">
                      {data.education.dates[0]} - {data.education.dates[1]}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={projectsRef}
          className="section projects-section"
        >
          <div className="section-content">
            <h2 className="section-title slide-in-up">Featured Projects</h2>
            <div className="projects-grid">
              {data.coolProjects.map((project, projIndex) => (
                <div
                  key={projIndex}
                  className={`project-card slide-in-up delay-${
                    projIndex * 200
                  }`}
                >
                  <div className="project-image">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`A screenshot of Isaac Lee's ${project.name} project`}
                      />
                    ) : (
                      <div className="image-placeholder">
                        <span>🌟</span>
                      </div>
                    )}
                    <div className="project-overlay">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
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
                        {project.highlights
                          .slice(0, 2)
                          .map((highlight, idx) => (
                            <li key={idx}>{highlight}</li>
                          ))}
                      </ul>
                    )}

                    <div className="project-tech">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="tech-badge">
                          {tech}
                        </span>
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
            <div className="skills-container">
              {data.techStack.map((category, index) => {
                const getTechIcon = (tech: string) => {
                  const iconMap: { [key: string]: string } = {
                    // Front End
                    'JavaScript': '🟨',
                    'TypeScript': '🟦',
                    'React': '⚛️',
                    'Redux': '🔄',
                    'Jest': '🃏',
                    // Back End
                    'Node.js': '🟢',
                    'Python': '🐍',
                    'Django': '🎸',
                    'MySQL': '🐬',
                    'MongoDB': '🍃',
                    // DevOps & Cloud
                    'AWS': '☁️',
                    'RESTful APIs': '🔌',
                    'Docker': '🐳',
                    'Kubernetes': '⚓',
                    'Kafka': '📡',
                    'Terraform': '🏗️',
                    'OAuth': '🔐',
                    'JWT': '🎫',
                    // Tools & Platforms
                    'Git': '📝',
                    'GitHub Actions': '🤖',
                    'A/B Testing': '🧪',
                    'Agile Development': '🔁',
                    // AI/LLMs
                    'GenAI': '🤖',
                    'AI Integrations': '🧠',
                    'OpenAI': '✨',
                    'Claude Code': '🎯',
                    // Monitoring
                    'Datadog': '🐕',
                    'New Relic': '📊',
                    'Splunk': '🔍',
                    'Snowflake': '❄️'
                  };
                  return iconMap[tech] || '⚙️';
                };

                return (
                  <div key={index} className={`skill-category-section slide-in-up delay-${index * 100}`}>
                    <h3 className="skill-category-title">{category.category}</h3>
                    <div className="tech-badges">
                      {category.technologies.map((tech, idx) => (
                        <div key={idx} className="tech-badge">
                          <span className="tech-icon">{getTechIcon(tech)}</span>
                          <span className="tech-name">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={contactRef}
          className="section contact-section"
        >
          <div className="section-content">
            <h2 className="section-title slide-in-up">Let's Work Together</h2>
            <div className="contact-content">
              <p className="contact-intro slide-in-up delay-100">
                Ready to bring your next project to life? Let's discuss how we
                can work together.
              </p>
              <div className="contact-info">
                <div className="contact-item slide-in-up delay-200">
                  <span className="contact-icon">📧</span>
                  <span className="contact-text">{data.personal.email}</span>
                </div>
                <div className="contact-item slide-in-up delay-300">
                  <span className="contact-icon">📍</span>
                  <span className="contact-text">{data.personal.location}</span>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a
                href={data.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfessionalPortfolio;
