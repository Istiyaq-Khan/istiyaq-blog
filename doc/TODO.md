# 📝 Project TODO List: Istiyaq Khan Blog Website

Based on the documentation provided:

- `PRD-Istiyaq-Khan-Blog-Website.md`
- `DESIGN-DOC-Istiyaq-Khan-Blog-Website.md`
- `TECH-DESIGN-DOC-Istiyaq-Khan-Blog-Website.md`
- `Colour Palette.txt`

---

## 🚀 Phase 1: Foundation & Setup

### 1.1 Project Initialization

- [x] Initialize Next.js project with App Router & TypeScript.
- [x] Configure Tailwind CSS.
- [x] Install dependencies: `mongoose`, `next-auth`, `gsap`, `lucide-react`, `clsx`, `tailwind-merge`.

### 1.2 Design System Configuration

- [x] **Color Palette Setup** (tailind.config.js):
  - Background: `Matte Black (#111111)` / `Dark (#0B0B0E)`
  - Primary Accent: `Neon Purple (#8B5CF6)`
  - Highlight/CTA: `Acid Green (#A3E635)`
  - Text Main: `Soft White (#EDEDED)`
  - Text Muted: `Muted Gray (#9CA3AF)`
- [x] **Typography Setup**:
  - Headers: `Space Grotesk` or `General Sans` (Weight 500-700)
  - Body: `Inter` or `Satoshi` (Line-height 1.6-1.75)
- [x] Create base `globals.css` with CSS variables for Theme support (Dark default).

### 1.3 Database Setup

- [x] Set up MongoDB Atlas cluster.
- [x] Configure Mongoose connection helper.
- [x] Define **Schemas**:
  - `User` (Admin auth)
  - `BlogPost` (See Tech Doc Section 3)
  - `Tag` (Optional, or embedded in BlogPost)

---

## 🎨 Phase 2: Core UI Components

### 2.1 Basic UI Library

- [x] Create `Button` component (Variants: Primary/Purple, Outline, Ghost).
- [x] Create `Card` component (Rounded corners 16-20px, dark overlay).
- [x] Create `Container` and `Section` layout wrappers.
- [x] Create `Input`/`Textarea` components for forms/admin.

### 2.2 Navigation & Layout

- [x] **Navbar**:
  - Logo/Name (Istiyaq Khan)
  - Links: Home, Blog, About, Uses, Contact
  - Mobile Menu (Hamburger)
- [x] **Footer**:
  - Social Links (Icons for YouTube, GitHub, X, LinkedIn)
  - Copyright & quick links.

### 2.3 Animations (GSAP)

- [x] **System Boot Loader**:
  - Fullscreen overlay.
  - Progress bar animation.
  - Text morph: "Initializing systems..." -> "Ready."
- [x] Implement `ScrollReveal` HOC or hook for section fade-ins.

---

## 🛠️ Phase 3: Admin Panel (The Content OS)

### 3.1 Authentication

- [x] Setup NextAuth v5.
- [x] Configure GitHub Provider (or Credentials).
- [x] Implement Middleware to protect `/admin` routes.

### 3.2 Admin Layout

- [x] Create Sidebar navigation (Dashboard, Posts, Drafts, Media, Settings).
- [x] Create Admin Dashboard (Draft count, published list).

### 3.3 Block-Based Editor (Core Feature)

- [x] Create Editor Container.
- [x] **Implement Blocks**:
  - [x] `HeadingBlock` (H2/H3)
  - [x] `ParagraphBlock` (Rich text or markdown subset)
  - [x] `ImageBlock` (Upload + Caption + Alt text)
  - [x] `CodeBlock` (Syntax highlighting input)
  - [x] `QuoteBlock` / `CalloutBlock`
- [x] Implement Block reordering (Drag & Drop or Up/Down buttons).
- [x] Implement "Add Block" menu.

### 3.4 SEO & Publishing Meta Panel

- [x] Sidebar for Post Settings:
  - Slug input
  - Primary & Secondary Tags
  - Meta Title & Description
  - Publish Date
  - Cover Image upload

---

## 🌍 Phase 4: Public Pages Implementation

### 4.1 Home Page

- [x] **Hero Section**:
  - Text fade-in animation.
  - Right side: Featured blog card (animated slide-in).
- [x] **What I Do Section**: 3 Cards (Automation, Content Systems, Creative + Tech).
- [x] **Featured Content**: Grid of latest articles/videos.

### 4.2 Blog System

- [x] **Blog Index (`/blog`)**:
  - Featured article (Large layout).
  - Grid of regular posts.
  - Filter Tabs: Guides, Tips, YouTube, Systems.
- [x] **Blog Post (`/blog/[slug]`)**:
  - Dynamic Rendering (SSG/ISR).
  - Render Block Content (Map blocks to components).
  - Syntax Highlighting for code blocks.
  - Table of Contents (Auto-generated).
  - Author Box & Related Posts.

### 4.3 About Page

- [x] Portrait Image.
- [x] Story/Bio text.
- [x] "Trust Graph" Social Links card.

### 4.4 Uses / Contact

- [x] **Uses Page**: Categories for Software, Gear, Stack.
- [x] **Contact Page**: Simple form + Email link.

---

## 🔍 Phase 5: SEO & Final Polish

### 5.1 Technical SEO

- [x] Implement `generateMetadata` for all dynamic pages.
- [x] Create `sitemap.xml` and `robots.txt`.
- [x] Implement OpenGraph images (OG Image generation).

### 5.2 Performance

- [x] optimize images (Next/Image).
- [x] Verify CLS (Content Layout Shift) with custom fonts.
- [x] Test Loader logic (run once per session).

### 5.3 Review

- [x] Verify all "Explicit Non-Goals" are met (No generic fluff).
- [x] Check Mobile Responsiveness on all pages.

---

## 📅 Future/Phase 2 (Post-Launch)

- [ ] Newsletter integration.
- [ ] Search functionality.
- [ ] Comment system in every blog post . 
