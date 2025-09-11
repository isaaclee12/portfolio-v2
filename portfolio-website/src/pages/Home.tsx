import type {
  PortfolioData,
  ProfessionalExperience,
  CoolProject,
  OldProject,
  TechStack,
  PersonalInfo,
} from "../../../shared-data/types";
import portfolioData from "../../../shared-data/portfolio-data.json";

import React from "react";

const Resume: React.FC = () => {
  return (
    <div>
      <h2>Resume</h2>
      {portfolioData.professionalExperience.map(
        (exp: ProfessionalExperience, index: number) => (
          <div>
            <br />
            <div>
              {exp.company}, {exp.subsidiary_or_department}
            </div>
            <div>{exp.titles_held}</div>
            <div>{exp.dates_worked[0] + " - " + exp.dates_worked[1]}</div>
            <div>
              <p>Relevant URLs:</p>
              <ul>
                {exp.relevant_urls.map((url: string) => (
                  <li>
                    <a href={url}>{url}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p>Achievements:</p>
              <ul>
                {exp.achievements.map((achievement: string) => (
                  <li>
                    <div>{achievement}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p>Technologies Used:</p>
              <ul>
                {exp.technologies.map((technology: string) => (
                  <li>
                    <div>{technology}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      )}
    </div>
  );
};

const FeaturedProject: React.FC = () => {
  return (
    <div>
      <h2>Featured Projects</h2>
      {portfolioData.coolProjects.map((project: CoolProject) => (
        <div>
          <h3>{project.name}</h3>
          <div>{project.description}</div>
          <div>{project.backstory}</div>
          <a href={project.live_url}>{project.live_url}</a>
          <div>{project.image}</div>
          <div>
            <p>Highlights:</p>
            <ul>
              {project.highlights?.map((highlight: string) => (
                <li>{highlight}</li>
              ))}
            </ul>
          </div>
          <div>
            <p>Technologies Used:</p>
            <ul>
              {project.technologies?.map((technology: string) => (
                <li>{technology}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <h1>Isaac Lee</h1>
      <button>Click me to improve my Portfolio!</button>
      {/* Home page - hero, featured projects, overview */}
      <FeaturedProject />
      <Resume />
    </div>
  );
};

export default Home;
