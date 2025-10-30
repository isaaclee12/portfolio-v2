# Claude Code Configuration

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build the project  
- `npm run lint` - Run ESLint
- `npm run pdf` - Generate PDF

## Project Structure
This is a monorepo with:
- `portfolio-website/` - React/TypeScript frontend
- `pdf-generator/` - Node.js PDF generation
- `shared-data/` - Shared types and portfolio data

## Node Version
This project requires Node.js v22+

## Interview Questions JSON Generation - Progress Saved

### ✅ COMPLETED (40/164 questions):
- **JavaScript**: 13/13 questions ✅
- **TypeScript**: 13/13 questions ✅ 
- **Node.js**: 7/13 questions (need 6 more)
- **React**: 5/15 questions (need 10 more)
- **General Software Architecture**: 1/14 questions (need 13 more)

### 📋 CURRENT STATUS:
- **File**: `senior-engineer-interview-questions.json`
- **Total Questions**: 40/164 (24% complete)
- **JSON Status**: ✅ Valid format
- **Helper Scripts Created**:
  - `generate-remaining-questions.js`
  - `complete-questions.js`
  - `generate-all-remaining.js`
  - `batch-generate.js`
  - `comprehensive-generate.js`

### 🎯 REMAINING CATEGORIES NEEDED:
- Node.js: 6 more questions (security, performance, modules, database connections, monitoring, scaling)
- React: 10 more questions (lifecycle, code splitting, forms, context API, testing, error boundaries, performance, useEffect, suspense)
- General Software Architecture: 13 more questions (clean architecture, MVC, API design, microservices, SOLID, caching, design patterns, system design, consistency, databases, fault tolerance, API versioning, auth)
- SQL & Data: 13 questions (JOINs, indexes, optimization, ACID, normal forms, migrations, locking, schema design, CAP theorem, stored procedures, connection pooling, backup, sharding)
- AWS: 12 questions (core services, EC2/ECS/Lambda, storage, networking, IAM, RDS/DynamoDB, CloudFormation, architecture, regions, monitoring, Auto Scaling, security model)
- HTML: 10 questions (semantic elements, accessibility, CSS/JS inclusion, div vs span, data attributes, web components, DOM, SEO, PWAs, forms)
- CSS: 11 questions (box model, Flexbox/Grid, specificity, preprocessors, responsive design, custom properties, positioning, performance, animations, cross-browser, CSS-in-JS)
- Git/GitHub: 10 questions (merge/rebase/squash, branching, conflicts, hooks, sensitive data, reset/revert/checkout, bisect, commit messages, CI, forking vs cloning)
- Terraform/DevOps: 10 questions (IaC, state management, modules, immutable infrastructure, deployments, CI/CD, monitoring, secrets, scaling, disaster recovery)
- Docker: 10 questions (containerization benefits, images vs containers, optimization, multi-stage builds, persistent data, networks, debugging, Compose, configuration, security)
- Kubernetes: 10 questions (problems solved, Pods/Services/Deployments, service discovery, ConfigMaps/Secrets, autoscaling, etcd, persistent storage, Ingress, debugging, security)
- AI: 10 questions (ML vs DL vs AI, integration, use cases, privacy/ethics, supervised vs unsupervised, A/B testing, deployment challenges, performance evaluation, frameworks, bias/fairness)

### 🚀 NEXT STEPS TO CONTINUE:
1. Run: `node -e "const fs = require('fs'); const data = JSON.parse(fs.readFileSync('senior-engineer-interview-questions.json', 'utf8')); console.log('Current total:', data.questions.length);"`
2. Create new batch script to generate remaining questions systematically
3. Use the pattern established in existing questions (id, category, question, explanation, usage, realWorldExample, frontOfCard, backOfCard)
4. Continue with Node.js questions first, then React, then move through other categories
5. Validate JSON after each batch with: `node -e "JSON.parse(fs.readFileSync('senior-engineer-interview-questions.json', 'utf8')); console.log('Valid JSON');"`

### 📝 QUESTION FORMAT ESTABLISHED:
Each question needs:
- `id`: sequential number
- `category`: exact category name
- `question`: exact question text from original list
- `explanation`: 2-3 bullet points for high school understanding
- `usage`: detailed code examples with implementation
- `realWorldExample`: practical e-commerce/social media scenario
- `frontOfCard`: formatted title for Quizlet
- `backOfCard`: formatted with **Explanation**, **Usage**, **Real World Example** sections

