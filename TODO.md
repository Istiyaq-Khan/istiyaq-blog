# 📝 Project TODO List: Istiyaq Khan Blog Website

Based on the documentation provided:
- `PRD-Istiyaq-Khan-Blog-Website.md`
- `DESIGN-DOC-Istiyaq-Khan-Blog-Website.md`
- `TECH-DESIGN-DOC-Istiyaq-Khan-Blog-Website.md`
- `Colour Palette.txt`

---

## 🚀 Phase 1: Foundation & Setup

### 1.1 Project Initialization
- [ ] Initialize Next.js project with App Router & TypeScript.
- [ ] Configure Tailwind CSS.
- [ ] Install dependencies: `mongoose`, `next-auth`, `gsap`, `lucide-react`, `clsx`, `tailwind-merge`.

### 1.2 Design System Configuration
- [ ] **Color Palette Setup** (tailind.config.js):
    - Background: `Matte Black (#111111)` / `Dark (#0B0B0E)`
    - Primary Accent: `Neon Purple (#8B5CF6)`
    - Highlight/CTA: `Acid Green (#A3E635)`
    - Text Main: `Soft White (#EDEDED)`
    - Text Muted: `Muted Gray (#9CA3AF)`
- [ ] **Typography Setup**:
    - Headers: `Space Grotesk` or `General Sans` (Weight 500-700)
    - Body: `Inter` or `Satoshi` (Line-height 1.6-1.75)
- [ ] Create base `globals.css` with CSS variables for Theme support (Dark default).

### 1.3 Database Setup
- [ ] Set up MongoDB Atlas cluster.
- [ ] Configure Mongoose connection helper.
- [ ] Define **Schemas**:
    - `User` (Admin auth)
    - `BlogPost` (See Tech Doc Section 3)
    - `Tag` (Optional, or embedded in BlogPost)

---

## 🎨 Phase 2: Core UI Components

### 2.1 Basic UI Library
- [ ] Create `Button` component (Variants: Primary/Purple, Outline, Ghost).
- [ ] Create `Card` component (Rounded corners 16-20px, dark overlay).
- [ ] Create `Container` and `Section` layout wrappers.
- [ ] Create `Input`/`Textarea` components for forms/admin.

### 2.2 Navigation & Layout
- [ ] **Navbar**:
    - Logo/Name (Istiyaq Khan)
    - Links: Home, Blog, About, Uses, Contact
    - Mobile Menu (Hamburger)
- [ ] **Footer**:
    - Social Links (Icons for YouTube, GitHub, X, LinkedIn)
    - Copyright & quick links.

### 2.3 Animations (GSAP)
- [ ] **System Boot Loader**:
    - Fullscreen overlay.
    - Progress bar animation.
    - Text morph: "Initializing systems..." -> "Ready."
- [ ] Implement `ScrollReveal` HOC or hook for section fade-ins.

---

## 🛠️ Phase 3: Admin Panel (The Content OS)

### 3.1 Authentication
- [ ] Setup NextAuth v5.
- [ ] Configure GitHub Provider (or Credentials).
- [ ] Implement Middleware to protect `/admin` routes.

### 3.2 Admin Layout
- [ ] Create Sidebar navigation (Dashboard, Posts, Drafts, Media, Settings).
- [ ] Create Admin Dashboard (Draft count, published list).

### 3.3 Block-Based Editor (Core Feature)
- [ ] Create Editor Container.
- [ ] **Implement Blocks**:
    - [ ] `HeadingBlock` (H2/H3)
    - [ ] `ParagraphBlock` (Rich text or markdown subset)
    - [ ] `ImageBlock` (Upload + Caption + Alt text)
    - [ ] `CodeBlock` (Syntax highlighting input)
    - [ ] `QuoteBlock` / `CalloutBlock`
- [ ] Implement Block reordering (Drag & Drop or Up/Down buttons).
- [ ] Implement "Add Block" menu.

### 3.4 SEO & Publishing Meta Panel
- [ ] Sidebar for Post Settings:
    - Slug input
    - Primary & Secondary Tags
    - Meta Title & Description
    - Publish Date
    - Cover Image upload

---

## 🌍 Phase 4: Public Pages Implementation

### 4.1 Home Page
- [ ] **Hero Section**:
    - Text fade-in animation.
    - Right side: Featured blog card (animated slide-in).
- [ ] **What I Do Section**: 3 Cards (Automation, Content Systems, Creative + Tech).
- [ ] **Featured Content**: Grid of latest articles/videos.

### 4.2 Blog System
- [ ] **Blog Index (`/blog`)**:
    - Featured article (Large layout).
    - Grid of regular posts.
    - Filter Tabs: Guides, Tips, YouTube, Systems.
- [ ] **Blog Post (`/blog/[slug]`)**:
    - Dynamic Rendering (SSG/ISR).
    - Render Block Content (Map blocks to components).
    - Syntax Highlighting for code blocks.
    - Table of Contents (Auto-generated).
    - Author Box & Related Posts.

### 4.3 About Page
- [ ] Portrait Image.
- [ ] Story/Bio text.
- [ ] "Trust Graph" Social Links card.

### 4.4 Uses / Contact
- [ ] **Uses Page**: Categories for Software, Gear, Stack.
- [ ] **Contact Page**: Simple form + Email link.

---

## 🔍 Phase 5: SEO & Final Polish

### 5.1 Technical SEO
- [ ] Implement `generateMetadata` for all dynamic pages.
- [ ] Create `sitemap.xml` and `robots.txt`.
- [ ] Implement OpenGraph images (OG Image generation).

### 5.2 Performance
- [ ] optimize images (Next/Image).
- [ ] Verify CLS (Content Layout Shift) with custom fonts.
- [ ] Test Loader logic (run once per session).

### 5.3 Review
- [ ] Verify all "Explicit Non-Goals" are met (No generic fluff).
- [ ] Check Mobile Responsiveness on all pages.

---

## 📅 Future/Phase 2 (Post-Launch)
- [ ] Newsletter integration.
- [ ] Search functionality.
- [ ] Comment system (optional).
