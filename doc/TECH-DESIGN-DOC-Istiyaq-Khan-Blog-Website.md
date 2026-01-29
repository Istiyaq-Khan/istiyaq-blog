# 🧠 TECH DESIGN DOCUMENT

**Project:** Istiyaq Khan – Dynamic Blog & Content System  
**Stack:** Next.js + MongoDB  
**Goal:** SEO-first, system-driven, future-proof personal blog

---

## 1. CONTENT TAG STRATEGY (SEO + BRAND)

### ❌ What NOT to do

- Random WordPress-style tags
- Too many generic tags
- Duplicate tags across every post

### ✅ Best Tag Strategy for YOU

You need **3 levels of tagging**, not one.

#### 1️⃣ Primary Tags (SEO Pillars)

**Used for:**
- URL structure
- Category pages
- Google indexing

**LIMIT:** 5–7 total

**Recommended primary tags:**
- `content-automation`
- `ai-workflows`
- `creator-systems`
- `youtube-seo`
- `web-development`
- `learning-in-public`
- `case-studies`

**These become:**
```
/blog/content-automation
/blog/ai-workflows
```

#### 2️⃣ Secondary Tags (Contextual SEO)

**Used for:**
- Internal linking
- Related posts
- Long-tail search

**Examples:**
- `gsap`
- `nextjs`
- `mongodb`
- `automation-tools`
- `video-editing`
- `content-repurposing`
- `systems-thinking`

#### 3️⃣ Meta Intent Tags (NOT visible to users)

**Used only internally:**
- `tutorial`
- `opinion`
- `breakdown`
- `guide`
- `experiment`

**These help:**
- Admin filtering
- Homepage sections
- AI-powered features later

---

## 2. SEO-FRIENDLY BLOCK DATA MODEL (IMPORTANT)

You are building a **block-based editor**.  
That's powerful — but only if stored correctly.

### 🧱 Block Philosophy (Critical)

- ❌ Don't store raw HTML blobs
- ❌ Don't store Markdown only
- ✅ **Store structured content blocks**

**Why?**
- Better SEO
- Better rendering
- Better reuse
- Better AI integration later

---

## 3. MONGODB DATA SCHEMA (OPTIMAL)

### 📝 BlogPost Collection

```javascript
BlogPost {
  _id: ObjectId,
  title: string,
  slug: string, // SEO URL
  excerpt: string, // meta description backup
  coverImage: {
    url: string,
    alt: string // SEO image alt
  },
  primaryTag: string,
  secondaryTags: string[],
  intentTags: string[],
  blocks: Block[],
  readingTime: number,
  status: "draft" | "published",
  publishedAt: Date,
  updatedAt: Date,
  author: {
    name: "Istiyaq Khan",
    image: string
  },
  seo: {
    metaTitle: string,
    metaDescription: string,
    canonicalUrl: string
  }
}
```

### 🧱 Block Model (KEY PART)

```javascript
Block {
  type: "heading" | "paragraph" | "image" | "code" | "quote" | "callout",
  content: any,
  order: number
}
```

#### Example Blocks

**Heading Block**
```javascript
{
  type: "heading",
  content: {
    text: "How I Automated My Content Workflow",
    level: 2 // h2
  }
}
```

**Paragraph Block**
```javascript
{
  type: "paragraph",
  content: {
    text: "This system reduced my content creation time by 70%."
  }
}
```

**Image Block**
```javascript
{
  type: "image",
  content: {
    url: "...",
    alt: "Istiyaq Khan content automation workflow",
    caption: "System overview"
  }
}
```

**Code Block**
```javascript
{
  type: "code",
  content: {
    language: "js",
    code: "console.log('system');"
  }
}
```

### ✅ This structure is:

- SEO-safe
- Render-flexible
- CMS-independent
- AI-ready

---

## 4. NEXT.JS RENDERING STRATEGY (SEO)

### Pages

- `/blog/[slug].tsx` → **SSG** (Static Generation)
- `/blog/tag/[tag].tsx` → **SSG**
- Home page → **ISR**

### Why?

- Google loves static pages
- Faster TTFB
- Better Core Web Vitals

### Use:

- `generateStaticParams`
- `generateMetadata`
- `revalidate: 60`

---

## 5. LIGHT MODE / DARK MODE SYSTEM

### Strategy

- **Default:** Dark mode
- **Optional:** Light mode
- System preference respected

### Implementation

- `next-themes`
- CSS variables

```css
:root {
  --bg: #ffffff;
  --text: #111111;
}

[data-theme="dark"] {
  --bg: #0b0b0e;
  --text: #ededed;
}
```

### Rules

- Same layout
- Same spacing
- Only colors change
- Animations unchanged

---

## 6. ADMIN PANEL ARCHITECTURE

### 🧠 Admin Philosophy

Your admin panel is:
- **A content OS**
- Not a blog editor toy

### 🛠 Admin Tech Stack

- Next.js App Router
- Server Actions
- MongoDB
- Auth.js (NextAuth v5)
- Zod validation
- RBAC (Role-based access)

### 🔐 SECURITY (NON-NEGOTIABLE)

#### Authentication

- Email + password
- OR GitHub OAuth (recommended)
- 2FA-ready

#### Authorization

- Only admin role can publish
- Drafts protected

#### Protection

- Middleware route protection
- CSRF protection
- Rate limiting
- Environment-based secrets

---

## 7. ADMIN UI DESIGN (BEST PRACTICE)

### Layout

```
Sidebar
├─ Dashboard
├─ Posts
├─ Drafts
├─ Tags
├─ Media
├─ Settings
```

### Post Editor UI

**Left: Block Editor**
- Add block (+)
- Drag to reorder
- Inline preview

**Right: SEO Panel**
- Meta title
- Meta description
- Canonical URL
- Primary tag
- Publish date

*This separation is elite-level UX.*

### Admin Dashboard Widgets

- Draft count
- Published posts
- Top tags
- Recent edits

*Minimal. No charts unless useful.*

---

## 8. DYNAMIC CONTENT FLOW (END TO END)

1. Write post in admin
2. Save as draft (MongoDB)
3. Preview (server-rendered)
4. **Publish**
   - Next.js regenerates page
   - Blog appears instantly
   - SEO metadata auto-injected

---

## 9. WHY THIS SYSTEM IS FUTURE-PROOF

This architecture supports:

- AI summaries
- Email automation
- Content repurposing
- API access
- Multi-author later
- Agency use

> You're not locking yourself into a "blog".  
> You're building a **content engine**.

---

## 10. FINAL STRATEGIC NOTE

**Most people build:**
> "A blog with an admin panel"

**You're building:**
> A content infrastructure for a creator-engineer

**That's the difference between:**
- A site that exists
- **A system that compounds**
