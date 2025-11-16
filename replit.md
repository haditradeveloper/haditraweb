# Haditra Website

## Overview

Haditra is a corporate website for a technology and creative solutions provider based in the UAE. The platform showcases the company's services across software engineering, AI technologies, and creative studio offerings. The website features a modern, professional design with bilingual support (English and Arabic), smooth animations, and a comprehensive portfolio presentation system.

The application is built as a full-stack solution with a React frontend and Express backend, though the current implementation focuses primarily on the frontend presentation layer with minimal backend functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing (single-page application pattern)

**UI Component System**
- shadcn/ui component library (New York style variant) providing a comprehensive set of accessible, customizable components
- Radix UI primitives for accessibility-compliant interactive components
- Tailwind CSS for utility-first styling with custom theme configuration
- Framer Motion for declarative animations and transitions throughout the site
- Custom design system following corporate color palette (slate/blue theme)

**State Management & Data Flow**
- TanStack Query (React Query) for server state management and caching
- Local component state using React hooks
- No global state management library (Redux, Zustand, etc.) - state is kept local to components

**Internationalization**
- Custom i18n implementation with translation objects stored in `client/src/lib/i18n.ts`
- Language toggle between English and Arabic
- Language state managed at the top level (Home component) and passed down via props

**Component Structure**
- Page-level components in `client/src/pages/` (currently only Home and NotFound)
- Feature components in `client/src/components/` organized by section:
  - Navigation - Fixed header with smooth scroll navigation
  - HeroSlider - Auto-playing full-screen carousel with 4 slides
  - StatsSection - Animated counter statistics with intersection observer
  - ServicesSection - Three-column service grid
  - PortfolioSection - Filterable project gallery
  - AboutSection - Company mission and values
  - ContactSection - Contact form (frontend only, no backend integration)
  - CTASection - Call-to-action banner
  - Footer - Multi-column footer with links

**Asset Management**
- Static images stored in `attached_assets/` directory
- Images imported as ES modules and bundled by Vite
- Generated images for hero slider slides referenced from assets folder

### Backend Architecture

**Server Framework**
- Express.js running on Node.js
- TypeScript for type safety
- Development server integrates with Vite for HMR

**Current Implementation Status**
- Minimal backend with placeholder routes (`server/routes.ts`)
- No active API endpoints implemented
- Basic storage interface defined (`server/storage.ts`) with in-memory implementation for user management
- No authentication or authorization currently active

**Routing & Middleware**
- Request logging middleware capturing API calls
- JSON body parsing with raw body preservation
- Static file serving for production builds
- Vite middleware integration for development mode

**Database Layer**
- Drizzle ORM configured for PostgreSQL
- Schema defined in `shared/schema.ts` with a basic users table
- Neon serverless PostgreSQL configured as the database provider
- Database connection via `DATABASE_URL` environment variable
- Migration support configured but no active database operations in use

### Design System

**Color Palette**
- Primary: Deep slate tones (#0F172A, #1E293B, #334155)
- Accent: Blue system (#2563EB, #3B82F6, #60A5FA)
- Backgrounds: White, Slate 50, Slate 100 for hierarchy
- Gradients: Blue-to-indigo for hero sections, blue-to-blue for buttons

**Typography**
- Inter font family loaded from Google Fonts
- Responsive font sizing (4xl-7xl for heroes, 3xl-5xl for sections)
- Tailwind typography utilities with custom line heights

**Layout Principles**
- Max-width container at 7xl (1280px)
- Consistent spacing using Tailwind scale (2, 4, 6, 8, 12, 16, 20, 24, 32)
- Responsive grid systems (3-column desktop, 1-column mobile)
- Section padding: py-20 to py-32 on desktop, py-12 to py-16 on mobile

**Animation Strategy**
- Framer Motion for component entrance animations
- Intersection Observer for scroll-triggered animations (stats counters)
- Hover states with Tailwind transitions
- Auto-playing carousel with pause-on-hover

### Build & Deployment

**Development Mode**
- `npm run dev` starts both Vite dev server and Express server
- Hot module replacement for rapid development
- Replit-specific plugins for runtime error overlay and dev tools

**Production Build**
- `npm run build` compiles both frontend (Vite) and backend (esbuild)
- Frontend output to `dist/public`
- Backend bundled to `dist/index.js` as ESM module
- `npm start` runs the production server

**Type Checking**
- `npm run check` runs TypeScript compiler in check mode
- Shared types in `shared/` directory accessible to both client and server
- Path aliases configured for cleaner imports (@/, @shared/)

## External Dependencies

**Frontend Libraries**
- React ecosystem: react, react-dom, wouter (routing)
- UI components: @radix-ui/* (20+ component primitives), embla-carousel-react
- Styling: tailwindcss, autoprefixer, class-variance-authority, clsx, tailwind-merge
- Animation: framer-motion
- Forms: react-hook-form, @hookform/resolvers
- State: @tanstack/react-query
- Icons: lucide-react
- Utilities: date-fns, nanoid

**Backend Libraries**
- Server: express
- Database: drizzle-orm, @neondatabase/serverless, drizzle-zod
- Session: connect-pg-simple (configured but not actively used)
- Build: tsx (development), esbuild (production)

**Development Tools**
- Vite and plugins (@vitejs/plugin-react, Replit-specific plugins)
- TypeScript with strict mode enabled
- Drizzle Kit for database migrations

**Third-Party Services**
- Neon serverless PostgreSQL (configured via DATABASE_URL)
- Google Fonts (Inter font family)
- No analytics, authentication providers, or payment processors currently integrated

**Design References**
- Inspired by zainlee.com for modern, tech-forward aesthetic
- Design guidelines documented in `design_guidelines.md`
- Professional corporate design patterns with clean layouts and generous whitespace