# 🎨 DESIGN DOCUMENT — Istiyaq Khan Blog Website

**Type:** Personal Brand × Blog × Content System  
**Style Direction:** Editorial + Futuristic + Minimal  
**Stack Assumption:** Next.js / React + Tailwind + GSAP

---

## 1. DESIGN GOALS (WHY THIS LOOK)

Your design must communicate 4 things instantly:

1. You are technical
2. You are creative
3. You think in systems
4. You are not a beginner blogger

**So the design should feel like:**

- A modern editorial blog
- With motion intelligence
- And strong personal identity

**Not:**
- SaaS landing-page generic
- WordPress blog boring

---

## 2. VISUAL INSPIRATION (FROM YOUR REFERENCES)

### Reference 1 (GOXY-style hero)

**What we take:**
- Bold typography
- Asymmetric layout
- Floating cards
- High-contrast dark UI

**What we avoid:**
- Overloaded widgets
- Random stats with no meaning

### Reference 2 (News / Editorial layout)

**What we take:**
- Clear content hierarchy
- Grid-based blog listing
- "Featured story" concept
- Scannability

**What we avoid:**
- Traditional news clutter
- Too many categories visible at once

### Reference 3 (Indise-style blog)

**What we take:**
- Large featured article
- Soft card corners
- Calm spacing
- Editorial storytelling feel

**What we avoid:**
- Light pastel theme
- Stock-photo-heavy design

---

## 3. BRAND COLOR SYSTEM (STRICT)

Your blog must use your brand palette consistently.

### Core Colors

| Element | Color | Hex Code |
|---------|-------|----------|
| **Background** | Matte Black / Near Black | `#0B0B0E` or `#111111` |
| **Primary Accent** | Neon Purple | `#8B5CF6` |
| **Highlight / CTA** | Acid Green | `#A3E635` |
| **Text Primary** | Soft White | `#EDEDED` |
| **Text Secondary** | Muted Gray | `#9CA3AF` |

### Usage Rules

- **Purple** = identity & links
- **Green** = action & emphasis only
- Never use both aggressively in same section
- **80%** black, **15%** white, **5%** accent

*This keeps it premium, not flashy.*

---

## 4. TYPOGRAPHY SYSTEM

### Headings (Hero / Blog Titles)

- **Font:** Space Grotesk / General Sans / Inter Tight
- **Weight:** 500–700
- **Line-height:** Tight (1.05–1.15)

### Body Text

- **Font:** Inter / Satoshi
- **Size:** 16–18px
- **Line-height:** 1.6–1.75 (editorial feel)

### Rules

- Max 2 fonts
- No fancy display fonts
- Content > decoration

---

## 5. PAGE-BY-PAGE DESIGN SPEC

### 🏠 HOME PAGE

#### Section 1: Hero (Above the Fold)

**Layout:**
- Left: Text
- Right: Featured blog card (animated)

**Hero Text Example:**
```
Building content systems,
AI workflows,
and creative automation.
```

**Subtext:**
```
I'm Istiyaq Khan — I design systems that help creators 
publish faster, smarter, and consistently.
```

**Motion:**
- Text fades in line-by-line
- Featured card slides in from right (GSAP)

#### Section 2: Featured Content Grid

- 1 Large featured article
- 2–3 secondary cards

**Card design:**
- Rounded corners (16–20px)
- Image with dark overlay
- Category tag (purple)
- Hover → subtle scale + shadow

#### Section 3: What I Write About

**3 cards:**
- Automation
- Content Systems
- Creative + Tech

*Minimal icons, not illustrations.*

---

### 📝 BLOG INDEX PAGE

#### Layout

- **Top:** Featured article (large)
- **Below:** Grid (2–3 columns desktop, 1 mobile)

#### Filters

- Guides
- Tips
- YouTube
- Systems

*Use tabs, not dropdowns.*

---

### 📄 BLOG POST PAGE (MOST IMPORTANT)

#### Structure

**Hero**
- Title
- Subtitle
- Reading time
- Category

**Content Body**
- Max width: 720–760px
- Clean spacing
- Code blocks styled dark

**Inline Enhancements**
- Pull quotes
- Callout boxes (purple border)
- System diagrams (later)

**End Section**
- Related posts
- CTA: "Watch the YouTube version"
- Author box

---

### 👤 ABOUT PAGE

#### Design Tone

- Calm
- Honest
- Minimal motion

#### Layout

- **Left:** Portrait
- **Right:** Story text

**Include:**
- Your mission
- Your system mindset
- Your links (clean cards, not icons only)

---

## 6. GSAP LOADING ANIMATION (IMPORTANT)

### Philosophy

Your loader should:
- Be fast
- Be branded
- Not feel like a gimmick

### Loader Concept: "System Boot"

#### Visual

- Black screen
- Thin purple progress line
- Text morphing:
  ```
  Initializing systems…
  Loading content…
  Ready.
  ```

#### Animation Flow (GSAP)

1. Background fade in
2. Progress bar expands horizontally
3. Text changes with opacity
4. Screen slides up to reveal site

#### Duration

- **1.2s – 1.8s max**
- Skip animation after first visit (`localStorage`)

### GSAP Principles

- Use `gsap.timeline()`
- Avoid easing overload
- Prefer `power2.out` or `expo.out`

---

## 7. MICRO-INTERACTIONS

### Hover States

- **Links:** underline grows from left
- **Cards:** slight lift + glow
- **Buttons:** green pulse (very subtle)

### Scroll Animations

- Section fade-in
- No parallax overload
- Respect performance

---

## 8. RESPONSIVE RULES

### Mobile First

- One column
- Large text
- Easy thumb navigation

### Tablet

- Two columns
- Reduced animations

### Desktop

- Full grid
- All animations enabled

---

## 9. PERFORMANCE & UX RULES

- Loader only once per session
- Lazy-load images
- GSAP only where necessary
- No animation on low-power devices

---

## 10. WHAT MAKES THIS BLOG DIFFERENT

This design:

✅ Supports SEO  
✅ Supports reading  
✅ Supports authority  
✅ Supports future products

**It doesn't scream:**
> "Look at my design skills"

**It quietly says:**
> "This person thinks clearly."
