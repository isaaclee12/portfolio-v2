import React from 'react';
import type { Project } from '../types/portfolio';

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = () => {
  return (
    <div>
      {/* Project grid component - displays multiple projects */}
    </div>
  );
};

export default ProjectGrid;