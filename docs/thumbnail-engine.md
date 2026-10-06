# Automated High-CTR Thumbnail Engine & Hardened Security Pipeline

## 1. Overview & Architecture

The **High-CTR Thumbnail Engine** is a zero-server-compute, client-side social card generation and hardened upload pipeline designed for `blog.istiyaq.com` (IKK Studio).

When creating or modifying a blog post within the admin panel (`/admin/posts/new` or `/admin/posts/[id]`), the browser programmatically composes, renders, and exports an optimized `1200x630` social card using the HTML5 Canvas 2D API. The exported card is formatted as an ultra-compact WebP blob (typically 45–75KB) and uploaded through a hardened, authenticated upload endpoint.

```
┌────────────────────────────────────────────────────────┐
│                   Admin Browser                        │
│                                                        │
│  [Post Title & Tag Inputs]                             │
│             │ (150ms debounce)                         │
│             ▼                                          │
│  [HTML5 Canvas 2D Engine (1200x630)]                   │
│   ├── Focal Point 1 (32%): Portrait Silhouette + Glow  │
│   └── Focal Point 2 (68%): Pill Tag + Clamped 3-Lines  │
│             │                                          │
│             ▼ (toBlob: 'image/webp', 0.85)             │
│  [WebP Blob (< 80KB)]                                  │
│             │                                          │
└─────────────┼──────────────────────────────────────────┘
              │ POST /api/upload/thumbnail (multipart/form-data)
              ▼
┌────────────────────────────────────────────────────────┐
│             Next.js 16 Server (Node Runtime)           │
│                                                        │
│  1. NextAuth v5 Admin Session Guard                    │
│  2. Slug Whitelist & Anti-Traversal Sanitization       │
│  3. 12-Byte Binary Magic Bytes (RIFF...WEBP)           │
│  4. Strict 500KB Payload Limit                         │
│  5. Store: public/uploads/thumbnails/[filename].webp   │
│  6. Index in Media DB Model                            │
└────────────────────────────────────────────────────────┘
```

---

## 2. Visual Cognitive Composition (The 2-Focal-Point Rule)

The layout complies with cognitive neuroscience principles regarding left-to-right saccadic flow in feed scanning:

### Focal Point 1: Left 32% (Author Anchor & Rim-Light)
- **Author Portrait:** Anchored to bottom-left with head positioning aligned near the upper Rule-of-Thirds horizontal coordinate ($y \approx 210\text{px}$).
- **Ambient Rim-Light:** A radial glow behind the silhouette matching the preset accent color to create visual pop against dark feed backgrounds.
- **Feathered Bottom Blend:** Vertical alpha gradient overlay smoothly blending the torso cutout into the card base.
- **Fail-Safe Monogram:** If the author image fails to load or experiences CORS delays, an engineered geometric emblem ("IK / IKK STUDIO") renders automatically.

### Focal Point 2: Right 68% (Content & Value Hierarchy)
- **Category Pill Badge:** High-contrast pill container with letter-spaced uppercase category name in `JetBrains Mono` font.
- **Post Title:** Engineered bold display typography (`58px` Inter font) wrapping dynamically across the available width and strictly clamped to a maximum of 3 lines with ellipsis (`...`).
- **Accent Rule:** High-precision divider with a glowing origin pip at $y = 490\text{px}$.
- **Footer:** Technical watermark (`blog.istiyaq.com • Istiyaq Khan Razin`) and estimated reading time (`X MIN READ`).
- **Edge Vignette:** Dark perimeter gradient preventing low contrast when displayed on pure-white feed themes (e.g. Twitter/LinkedIn light mode).

---

## 3. High-Contrast Feed Presets

| Preset Name | ID | Background | Surface Card | Text | Accent Rim | Usage Scenario |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Cyber Obsidian** | `cyber-obsidian` | `#090d16` | `#111726` | `#ffffff` | `#00f0ff` (Cyan) | High-tech, agentic workflows, architecture deep dives. |
| **Solar Amber** | `solar-amber` | `#120c06` | `#1c130a` | `#ffffff` | `#f59e0b` (Amber) | Strategy, productivity, AI engineering announcements. |
| **Electric Violet** | `electric-violet` | `#0f0a1c` | `#17102b` | `#ffffff` | `#a855f7` (Violet) | Primary brand harmony matching IKK Studio core theme. |

---

## 4. Security & Hardening Checklist

### 1. Authentication Guard
The thumbnail endpoint `/api/upload/thumbnail` requires an active NextAuth v5 session with `role === "admin"`. Unauthenticated or unauthorized callers receive HTTP `401 Unauthorized`.

### 2. Path Traversal Defense
Slugs are sanitized through a strict whitelist:
```ts
const sanitized = slug
    .toLowerCase()
    .replace(/(\.\.[\/\\])+/g, "")
    .replace(/[\/\\]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
```
Delimiters (`/`, `\`, `..`) are rejected and stripped. Filenames are constructed as `${sanitized}-${Date.now()}.webp`.

### 3. Binary Magic Bytes Verification
Uploaded files are never trusted based on client-provided `Content-Type` or file extension. The first 12 bytes of the raw Node.js buffer must match:
- **Bytes 0..3:** ASCII `RIFF` (`0x52`, `0x49`, `0x46`, `0x46`)
- **Bytes 8..11:** ASCII `WEBP` (`0x57`, `0x45`, `0x42`, `0x50`)

Payloads that fail this inspection are rejected immediately with HTTP `400 Bad Request`.

### 4. Payload Size Limit
Maximum allowable upload size is strictly capped at `500KB`. Oversized requests are rejected with HTTP `413 Payload Too Large`.

---

## 5. SEO & Metadata Integration

Every public blog post page (`app/(public)/blog/[slug]/page.tsx`) automatically consumes the generated thumbnail:

### OpenGraph & Twitter Cards
```html
<meta property="og:image" content="https://blog.istiyaq.com/uploads/thumbnails/[slug]-[timestamp].webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/webp" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://blog.istiyaq.com/uploads/thumbnails/[slug]-[timestamp].webp" />
<meta name="robots" content="index, follow, max-image-preview:large" />
```

### JSON-LD Structured Data
The `BlogPosting` schema contains the absolute image URL:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "image": ["https://blog.istiyaq.com/uploads/thumbnails/[slug]-[timestamp].webp"]
}
```

---

## 6. Development & Verification Commands

```bash
# Run unit and security test suite
npm test

# Run TypeScript type check
npm run typecheck

# Run ESLint validation
npm run lint

# Run Next.js production build
npm run build
```
