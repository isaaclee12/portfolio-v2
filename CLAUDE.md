# Claude Code Configuration

## 🚧 EXPERIMENTAL BRANCH - Animated Portfolio
This branch contains the animated portfolio transformation experiment. The main portfolio page now includes a dramatic animation sequence where plain HTML elements transform into a modern design.

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

## 🎭 Animated Portfolio Feature

### Core Concept
The portfolio page starts as plain HTML (Times New Roman, basic styling) with a prominent "Click me to improve this Portfolio!" button. When clicked, the same DOM elements transform through CSS transitions into a beautiful, modern portfolio layout.

### Key Components
- **AnimatedPortfolio.tsx** - Main component with transformation logic
- **AnimatedPortfolio.css** - CSS handling `.basic` vs `.transformed` states
- **State Management** - Simple `isTransformed` boolean controls the animation

### Technical Approach
- **Same DOM Elements** - No element creation/destruction, just CSS class changes
- **CSS Transitions** - 0.8s cubic-bezier easing for smooth morphing
- **Performance Optimized** - Uses transform/opacity for GPU acceleration
- **Accessibility** - Respects `prefers-reduced-motion` with skip button

### Animation Phases
1. **Background** - White → gradient background
2. **Typography** - Times New Roman → modern fonts
3. **Layout** - Linear → card-based design  
4. **Colors** - Black/white → full color palette
5. **Interactive** - Static → hover effects

### Development Notes
- **Future Improvements** - Could add FLIP animations for precise element choreography
- **Timing** - Current transitions are uniform; staggered timing would enhance effect
- **Mobile** - Works on mobile but could use device-specific optimizations

## Node Version
This project requires Node.js v22+

## Branch Status
This is an experimental feature branch. Return to `main` for production development.

