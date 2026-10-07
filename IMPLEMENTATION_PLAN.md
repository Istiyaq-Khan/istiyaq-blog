# Implementation Plan: Auth Streamlining, Ad Block Removal & High-CTR Canvas Social Card Engine

## 1. Objectives & User Constraints
- **Remove GitHub Sign-in**: Remove GitHub OAuth provider from admin sign-in UI and Auth.js backend. Clean up `# GitHub OAuth Provider` from environment files.
- **Remove Google Ad Blocks**: Strip AdSense components from the dynamic blog post route (`app/(public)/blog/[slug]/page.tsx`).
- **Fix Canvas Social Card Refresh Loop**: Eliminate continuous re-rendering on `http://localhost:3000/admin/posts/new` by removing circular state dependencies and stabilizing refs.
- **Implement YouTube Thumbnail Psychology (Video `9_7q6vUaRsM`)**:
  - Incorporate split-composition layout (left side portrait / right side bold typography with gradient scrim protection).
  - Provide 4 high-CTR color harmonies (Cyber Obsidian, Solar Amber, Electric Violet, Matrix Emerald).
  - Add Custom BG support to the canvas generator.
  - Create dedicated Gemini Imagen 3 prompt text files in `prompt/` for generating personalized, high-contrast, edge-lit portrait backgrounds.

---

## 2. Modified & Created Files
- `auth.ts`: Removed `GitHub` provider and imports. Preserved `Credentials` provider and `trustHost: true`.
- `app/auth/signin/page.tsx`: Removed GitHub OAuth button and separator line.
- `.env.local`: Removed `# GitHub OAuth Provider`, `AUTH_GITHUB_ID`, and `AUTH_GITHUB_SECRET`.
- `app/(public)/blog/[slug]/page.tsx`: Removed `AdSense` import and all AdSense banner blocks (`middle-ad`, `down-ad`).
- `components/admin/thumbnail-generator.tsx`: Eliminated infinite canvas re-render cycle; added custom background URL toggle.
- `lib/thumbnail-canvas.ts`: Added `matrix-emerald` color harmony, added `customBgUrl` rendering with dark right-to-left gradient scrim.
- `prompt/01_cyber_obsidian_tech_architect.txt`: Gemini Imagen 3 prompt for electric cyan rim light tech portrait.
- `prompt/02_solar_amber_authority_builder.txt`: Gemini Imagen 3 prompt for solar amber authority portrait.
- `prompt/03_electric_violet_ai_studio.txt`: Gemini Imagen 3 prompt for electric violet / acid lime creative tech portrait.
- `prompt/04_matrix_emerald_systems_engineer.txt`: Gemini Imagen 3 prompt for matrix emerald / cyber lime systems portrait.
- `prompt/05_wide_split_composition_1200x630.txt`: Gemini Imagen 3 prompt for wide 1200x630 rule-of-thirds composition.
- `prompt/README.md`: Guide explaining thumbnail psychology, color psychology, and how to use reference photos with Gemini Imagen 3.

---

## 3. Risks & Mitigations
- **Canvas Re-render Thrashing**: Circular state updates (`setPreviewUrl` triggering `useEffect` which re-triggers `setPreviewUrl`) mitigated via `useRef` for callbacks and `lastRenderKeyRef` guard.
- **Text Legibility over Custom Photo Background**: Placing a photo behind text risks poor contrast. Mitigated with a directional black-to-transparent scrim overlay starting from x=320px to x=1200px.
- **Next.js 16 Build/Type Stability**: Checked with `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`.

---

## 4. Progress Checklist
- [x] Remove GitHub Provider from `auth.ts`
- [x] Remove GitHub login button from `app/auth/signin/page.tsx`
- [x] Remove GitHub OAuth credentials from `.env.local`
- [x] Remove Google Ad blocks from `app/(public)/blog/[slug]/page.tsx`
- [x] Fix continuous 1-second refresh loop in `components/admin/thumbnail-generator.tsx`
- [x] Add Matrix Emerald preset and Custom BG support in `lib/thumbnail-canvas.ts`
- [x] Write 5 Gemini Imagen 3 prompts in `prompt/` directory
- [x] Author psychological guide in `prompt/README.md`
- [x] Run test suite (`npm test`) -> 18/18 tests passed
- [x] Run typecheck (`npm run typecheck`) -> 0 errors
- [x] Run linter (`npm run lint`) -> 0 errors
- [x] Verify production build (`npm run build`) completion
