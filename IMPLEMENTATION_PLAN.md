# IMPLEMENTATION PLAN: Client-Side Automated High-CTR Thumbnail Engine with Hardened Security

## 1. Executive Summary & Objectives
- **Objective:** Build a zero-server-compute, client-side social card / thumbnail generator inside the Next.js 16 admin panel.
- **Cognitive Design:** 1200x630 HTML5 Canvas 2D engine adhering to the 2-focal-point rule (author portrait cutout with ambient rim light at left 32%, pill category badge, wrapped clamped 3-line title, and author/read-time footer at right 68%).
- **Harmonies:** 3 deterministic high-contrast feed presets (Cyber Obsidian, Solar Amber, Electric Violet) with edge vignette for feed contrast.
- **Security Pipeline:** Hardened thumbnail upload API endpoint with session auth, strict slug sanitization (path traversal immunity), binary magic bytes verification (`RIFF....WEBP`), and 500KB strict size limit.
- **SEO & Structured Data:** Automatic absolute OpenGraph (`og:image`, `og:image:width: 1200`, `og:image:height: 630`, `og:image:type: image/webp`), Twitter Card (`summary_large_image`), and JSON-LD `BlogPosting` wiring.

---

## 2. File Change Scope

| File Path | Action | Description |
| :--- | :--- | :--- |
| `IMPLEMENTATION_PLAN.md` | Create | Root ledger tracking plan, architecture, risks, and progress. |
| `lib/thumbnail-canvas.ts` | Create | Pure Canvas 2D engine: layout calculation, font loading assurance, 3-line text wrapping with ellipsis, portrait rim glow & fallback monogram, presets. |
| `components/admin/thumbnail-generator.tsx` | Create | Interactive Admin Thumbnail UI component with live 1200x630 preview, preset switcher, debounce, and WebP blob export. |
| `app/api/upload/thumbnail/route.ts` | Create | Hardened upload endpoint: NextAuth session check, slug sanitization, 12-byte WebP magic bytes check, size limit, disk writing. |
| `components/editor/post-settings.tsx` | Modify | Integrate `ThumbnailGenerator` into post settings, linking title, category, slug, reading time, and thumbnail upload. |
| `app/admin/posts/new/page.tsx` | Modify | Bind thumbnail generation and upload to new post creation workflow. |
| `app/admin/posts/[id]/client.tsx` | Modify | Bind thumbnail generation and upload to existing post edit workflow. |
| `app/(public)/blog/[slug]/page.tsx` | Modify | Update `generateMetadata` and JSON-LD `BlogPosting` with absolute OpenGraph WebP image, width/height/type, twitter cards, and robot tags. |
| `models/BlogPost.ts` | Modify | Ensure schema and types support `thumbnail` or og image metadata cleanly without drift. |
| `public/assets/author-avatar.png` | Create/Ensure | Ensure valid fallback/author asset exists alongside existing portrait webp. |
| `tests/thumbnail-security.test.ts` (or node runner test) | Create | Verification tests for magic bytes, slug traversal, auth guards, and canvas wrapping. |
| `docs/thumbnail-engine.md` | Create | Technical architecture, preset documentation, security specifications, and user guide. |

---

## 3. Risks & Mitigations

1. **Font Loading Race Conditions:**
   - *Risk:* Canvas renders before web fonts ('Inter', 'Space Grotesk') finish downloading, resulting in system font fallback or incorrect text metrics.
   - *Mitigation:* Explicitly await `document.fonts.ready` and invoke `document.fonts.load()` with timeout fallback before rendering text.
2. **CORS & Tainted Canvas:**
   - *Risk:* Loading external or relative images onto canvas throws `SecurityError: The operation is insecure` upon calling `toBlob()`.
   - *Mitigation:* Set `img.crossOrigin = "anonymous"`, use local public assets, and provide graceful geometric monogram fallback if image loading fails.
3. **MIME Spoofing & Upload Exploits:**
   - *Risk:* Attacker uploads malicious script renamed to `.webp` or bypasses client-side Content-Type.
   - *Mitigation:* Reject files lacking exact WebP magic bytes (0-3: `RIFF`, 8-11: `WEBP`) in the raw Node.js Buffer on the server.
4. **Path Traversal Attacks:**
   - *Risk:* Slugs like `../../etc/passwd` or `..\\` could overwrite arbitrary server files.
   - *Mitigation:* Strict regex whitelist `slug.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 80)`, rejecting empty results and sanitizing filenames.
5. **Next.js 16 App Router Dynamic Server vs Edge:**
   - *Risk:* Breaking Rule 4 by placing Node.js file system / database calls on Edge runtime.
   - *Mitigation:* Keep default Node.js runtime on all upload and database endpoints.

---

## 4. Step-by-Step Checklist

- [x] **Phase 1: Codebase Inspection & Discovery** (Completed)
- [x] **Phase 2: Design & Cognitive Layout Engine (Canvas 2D)**
  - [x] Implement `lib/thumbnail-canvas.ts` with 1200x630 buffer, font assurance, 3 color presets (Cyber Obsidian, Solar Amber, Electric Violet), portrait rim-light at 32%, pill category badge, wrapped clamped 3-line title with ellipsis, and footer.
  - [x] Implement fallback monogram/badge when image loading fails.
  - [x] Create `components/admin/thumbnail-generator.tsx` with responsive CSS preview and preset controls.
- [x] **Phase 3: Secure Upload & Storage Pipeline**
  - [x] Implement `app/api/upload/thumbnail/route.ts` with NextAuth v5 check (`auth()`).
  - [x] Implement slug whitelist sanitization (anti-traversal).
  - [x] Implement 12-byte binary magic byte inspection (`RIFF` + `WEBP`).
  - [x] Implement 500KB payload limit.
  - [x] Ensure `public/uploads/thumbnails` folder creation and storage.
- [x] **Phase 4: Frontend Admin UI Integration**
  - [x] Integrate thumbnail generator into `components/editor/post-settings.tsx`.
  - [x] Add 150ms debounce for live preview on title/tag changes.
  - [x] Integrate into `app/admin/posts/new/page.tsx` and `app/admin/posts/[id]/client.tsx` saving pipelines.
- [x] **Phase 5: SEO, OpenGraph & Structured Data Wiring**
  - [x] Update `app/(public)/blog/[slug]/page.tsx` `generateMetadata` with absolute 1200x630 WebP OpenGraph, Twitter card, and robot tags.
  - [x] Update JSON-LD `BlogPosting` schema with the thumbnail URL in `image`.
- [x] **Phase 6: Automated Verification & Testing**
  - [x] Create and run unit/integration test suite for magic bytes, slug traversal, and text wrapping (`npm test`: 18 tests passing).
  - [x] Run `npm run typecheck` (0 errors).
  - [x] Run `npm run lint` (0 errors).
  - [x] Run `npm run build` (0 errors, 18 static/dynamic routes optimized).
- [x] **Phase 7: Documentation & Git Commit**
  - [x] Write `docs/thumbnail-engine.md`.
  - [x] Commit changes with required conventional commit message.
