import React from 'react';
import type { CoolProject } from '../types/portfolio';

interface ProjectGridProps {
  projects: CoolProject[];
}

const ProjectGrid: React.FC<ProjectGridProps> = () => {
  return (
    <div>
      {/* Project grid component - displays multiple projects */}
    </div>
  );
};

export default ProjectGrid;