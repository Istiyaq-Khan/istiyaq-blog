# Autonomous Agent Operating Protocol (AGENTS.md)

This document establishes the **mandatory operational standard** that every AI agent and developer must strictly follow when inspecting, modifying, refactoring, and verifying code in the **Istiyaq Blog** codebase (`blog.istiyaq.com`).

---

## 1. The Five Golden Operational Rules

Every AI agent operating in this repository is bound by these five invariant rules:

### 🔴 Rule 1: Pre-Flight Audit & AST Inspection
1. **Never Guess Architecture or Imports**: Before modifying or creating any file, inspect the target directory, existing imports, TypeScript interfaces, and related component hierarchies.
2. **Framework Version Awareness**: This project runs on **Next.js 16 (App Router)** and **React 19**. Adhere strictly to Next.js 16 conventions (e.g., asynchronous `params` and `searchParams`). Never write deprecated Pages Router patterns or outdated Next.js 13/14 syntax.

### 🔴 Rule 2: Root Implementation Plan Artifact (`IMPLEMENTATION_PLAN.md`)
1. **Mandatory Ledger for Multi-Step Tasks**: For any architectural change, refactor, or multi-file task, the agent **MUST** author or update `IMPLEMENTATION_PLAN.md` at the repository root before making edits.
2. **Structure & Status**: The file must record:
   - Specific user objective & constraints.
   - Exact files to be created or modified (with line/scope references).
   - Known runtime/build risks and mitigations.
   - Step-by-step progress checklist (`[ ]` to `[x]`).
3. **Single-Pass Isolation**: If a task involves more than 3 distinct systems (e.g., DB caching + GSAP refactoring + RSS generation), execute and verify each phase sequentially. Never batch high-risk refactors across unrelated modules in a single blind edit.

### 🔴 Rule 3: Zero-Tolerance Verification & Build Integrity
1. **Mandatory Verification Suite**: After every file change, the agent **MUST** run and pass the following checks:
   - Type check: `npm run typecheck` (or `npx tsc --noEmit`)
   - Next.js production build: `npm run build`
   - Lint check: `npm run lint`
2. **Immediate Remediation**: If any TypeScript diagnostic, Next.js build error, or ESLint rule fails, diagnose the root cause and fix it immediately. Never leave suppressed type errors or broken builds.
3. **Clean Rollback**: If a refactor breaks compilation and cannot be resolved cleanly within two iterations, roll back to the last clean Git commit before proceeding with an alternative approach.

### 🔴 Rule 4: Runtime & Environment Safety
1. **Node.js vs. Edge Runtime Separation**: Any route handler, Server Component, or utility that connects to MongoDB/Mongoose via `connectDB()` **MUST** execute on the default Node.js runtime. **NEVER** set `export const runtime = "edge"` on files that import Mongoose models or database clients.
2. **No Experimental Header Tampering**: Never introduce middleware or custom response headers that hijack or corrupt Next.js internal streaming headers (`RSC`, `Next-Router-State-Tree`, `Next-Url`). Do not implement fragile content negotiation hacks (such as custom `Accept: text/markdown` rewrites).

### 🔴 Rule 5: Zero-Drift Type & Schema Contracts
1. **Single Source of Truth**: Data models, Mongoose schemas, and TypeScript interfaces must stay strictly in sync. When modifying `BlogPost` or related models, update both the database schema and its exported TypeScript types.
2. **Strict TypeScript**: Avoid `any`. Use strict utility types, explicit function return signatures, or Zod schemas for runtime payload validation.

---

## 2. Core Architectural Guardrails

### A. Image & Core Web Vitals (CWV) Standards

* **Banned Raw Image Tags**: Raw `<img>` elements are prohibited in public-facing routes. Always use `next/image`.
* **Hero Image Preloading**: The primary LCP candidate on blog post pages (cover image) must feature:
* `priority={true}`
* Explicit `sizes` property (e.g., `sizes="(max-width: 768px) 100vw, 1024px"`)
* Container aspect ratio to prevent Cumulative Layout Shift (CLS).


* **Remote Host Whitelisting**: When introducing external image CDNs, immediately update `images.remotePatterns` in `next.config.ts`.
* **Modern Formats**: Ensure `next.config.ts` enables `formats: ['image/avif', 'image/webp']`.

### B. SEO, Structured Data & Metadata Integrity

* **App Router Metadata API**: Declare page titles, descriptions, canonical URLs, and Open Graph cards using the native `Metadata` or `generateMetadata` exports.
* **Title Template Compliance**: Respect the root title template pattern (`%s | Istiyaq Khan Blog`). Child layouts and pages must define `title: { default: "Page Name" }` or `title: "Page Name"`, never hardcoded full strings that clash with the root template.
* **JSON-LD Entity Accuracy**:
* Personal entity: Type `Person` (`Istiyaq Khan Razin`) linking to verified `sameAs` profiles (GitHub, LinkedIn, X, YouTube).
* Blog index / Home: Type `WebSite` with `potentialAction` search box schema.
* Article pages: Type `BlogPosting` with `headline`, `image`, `datePublished`, `dateModified`, `author` (`Person`), and `publisher` (`Person` or verified brand entity with logo >= 112x112px).
* Breadcrumbs: Type `BreadcrumbList` matching visible page breadcrumbs.
* **Prohibition**: Never inject corporate `Organization` schemas requiring fake physical postal addresses or fake contact numbers for this personal blog.



### c. GSAP & UI Animation Safety

* **Context Cleanup**: Any GSAP animation or `ScrollTrigger` implementation inside client components must be encapsulated inside `gsap.context()` within a `useLayoutEffect` or `useEffect`, ensuring full `ctx.revert()` cleanup on unmount.
* **DOM Stability**: When refactoring components containing GSAP animations (e.g., `HomeClient`), do not alter parent DOM hierarchies, ref attachments, or target class names without refactoring the corresponding animation selectors.
* **SSR Hydration Mismatch Prevention**: Render stable HTML structure from the server; avoid conditional renders based on `window` or `document` checks before component mount.

### D. Security & Agent Sanitation

* **Banned Commands**: The agent must never execute destructive file operations (`rm -rf /`, raw disk formatters, or unversioned bulk file deletions).
* **No Hallucinated Dummy Endpoints**: Never generate fake API docs, unused mock endpoints, or dummy OpenAPI specifications unless explicitly instructed by the user.
* **Secrets & Credentials**: Never hardcode API keys, MongoDB connection strings, or webhook URLs into repository files. Access all secrets via `process.env`.

---

## 3. Standard Development & Verification Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript type check across all files
npm run typecheck

# Run Next.js production build (Validates SSR, SSG, routes, and asset bundling)
npm run build

# Run ESLint validation
npm run lint

```