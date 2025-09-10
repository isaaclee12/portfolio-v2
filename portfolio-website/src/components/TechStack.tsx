import React from 'react';
import type { TechStack as TechStackType } from '../types/portfolio';

interface TechStackProps {
  techStacks: TechStackType[];
}

const TechStack: React.FC<TechStackProps> = () => {
  return (
    <section>
      {/* Tech stack component - displays technologies and skills */}
    </section>
  );
};

export default TechStack;