# IKK Studio - Master Design System

## Brand Core
- **Identity:** Technical builder, AI Workflow Architecture, Content Creation.
- **Voice:** Calm confidence, strategic depth, systems thinking, learning in public.
- **Vibe:** High authority, tech-focused, edgy but clean.

## Color Palette & Tokens
Use these exact hex codes and CSS custom properties for all styling.

| Token | Hex Code | Usage |
| :--- | :--- | :--- |
| `--color-bg-primary` | `#111111` | Matte Black. Main background for all pages, providing a dark-mode-first aesthetic. |
| `--color-accent-primary` | `#8B5CF6` | Neon Purple. Primary buttons, active states, key data visualization. |
| `--color-accent-secondary`| `#A3E635` | Acid Green. Hover states, terminal text, new feature badges, energetic highlights. |
| `--color-text-primary` | `#F8FAFC` | Off-White. Primary headings and high-contrast body text. |
| `--color-text-secondary`| `#94A3B8` | Slate Gray. Subtitles, muted paragraphs, metadata. |
| `--color-border` | `#333333` | Dark Gray. Card borders, dividers, subtle boundaries. |

## Typography System
Do not use system defaults. Import these from Google Fonts.

1. **Headings (`h1`, `h2`, `h3`, `h4`):** `Space Grotesk`
   - Weight: SemiBold (600) or Bold (700)
   - Usage: Display text, section titles. Communicates technical edge.
   - Letter-spacing: `-0.02em` for a tighter, engineered look.

2. **Body Text (`p`, `li`, `a`):** `Inter`
   - Weight: Regular (400) and Medium (500)
   - Usage: Paragraphs, descriptions, standard UI elements. Ensures perfect readability.
   - Line-height: `1.6` for paragraphs.

3. **Technical Data & Code (`code`, `pre`, `.tag`):** `JetBrains Mono`
   - Weight: Regular (400)
   - Usage: Code snippets, metadata, dates, labels, system outputs.

## UI Components & Layouts
- **Cards/Containers:** Darker than the background or outlined with a 1px solid `--color-border`. No heavy drop shadows. Use subtle glows (`box-shadow: 0 0 15px rgba(139, 92, 246, 0.1)`) for focus states.
- **Border Radius:** `4px` or `0px`. Keep it sharp and structural; avoid heavily rounded "pill" shapes.
- **Spacing:** Use a strict 8pt grid system (8px, 16px, 24px, 32px, 64px).

## Iconography Rules (STRICT)
- **NO EMOJIS:** Do not use emojis anywhere in the UI or content. They dilute the authoritative, technical brand voice.
- **Icon Library:** Use **Lucide Icons** or **Phosphor Icons**.
- **Icon Style:** Line icons, 1.5px or 2px stroke width. Keep them sharp, monochromatic (often mapping to `--color-text-secondary` or `--color-accent-primary`), and purely functional.

## Animation & Motion
- **Philosophy:** Calm, deliberate, performant. No bouncy or springy animations.
- **Easing:** Ease-in-out (`cubic-bezier(0.4, 0, 0.2, 1)`).
- **Duration:** Fast (`150ms` to `200ms`) for hovers; Medium (`300ms`) for page transitions or modal reveals.
- **Effects:** Stick to simple opacity fades and slight vertical translates (`transform: translateY(-2px)`).

## Agent Implementation Instructions
When writing code for IKK Studio:
1. Always implement dark mode as the default.
2. Structure the CSS/Tailwind configuration exactly as defined in the Color Palette section.
3. Replace all generic icon placeholders with Lucide React/SVG icons.
4. Ensure all code blocks in the blog use JetBrains Mono with syntax highlighting that matches the brand palette.