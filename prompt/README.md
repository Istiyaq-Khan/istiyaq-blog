# High-CTR Thumbnail & Background Generation Guide (Gemini Imagen 3)

This directory contains tailored prompts based on the psychological principles from the YouTube breakdown: **"Thumbnail Psychology: How to Get a Viewer's Click on Every Video"** (`https://youtu.be/9_7q6vUaRsM`).

---

## 1. Key Lessons from the YouTube Video

1. **The 3-Second Competition:**
   Viewers scan feeds at high velocity. Your thumbnail has less than 2 seconds to earn a click. The image must have high edge contrast that pops on both dark mode and pure-white backgrounds (e.g. Twitter/LinkedIn desktop light mode).

2. **The 2-Focal-Point Rule (Zero Clutter):**
   - **Focal Point 1 (Left 32%):** A human face with intense, direct eye contact and emotional engagement. The human brain prioritizes faces during initial saccadic scanning.
   - **Focal Point 2 (Right 68%):** A high-contrast curiosity cue / headline title + category pill badge.
   - **Rule:** Never add unnecessary icons or competing elements that dilute visual focus.

3. **High-Contrast Silhouette Separation:**
   A strong **rim-light (glow)** along the shoulders and hair separates the subject from the background, creating immediate 3D depth.

4. **Complementary Harmonies:**
   - **Cyber Obsidian:** Deep obsidian void + Electric Cyan (#00f0ff)
   - **Solar Amber:** Warm charcoal + Golden Amber (#f59e0b)
   - **Electric Violet:** Deep purple-black + Ultraviolet (#a855f7) (IKK Studio Signature)
   - **Matrix Emerald:** Carbon black + Acid Emerald (#10b981)

---

## 2. How to Generate Your Background in Gemini Imagen 3

### Method A: Using Gemini with Your Real Photo (Recommended)
1. Go to **Google Gemini** (gemini.google.com) or **Google AI Studio** with Imagen 3 enabled.
2. Click the **+** (Attach Image) button and upload your reference portrait (for example, `public/istiyaq-khan-razin-founder-ikk-studio.webp`).
3. Copy the prompt from any of the style files in this folder:
   - `01_cyber_obsidian_tech_architect.txt`
   - `02_solar_amber_authority_builder.txt`
   - `03_electric_violet_ai_studio.txt`
   - `04_matrix_emerald_systems_engineer.txt`
   - `05_wide_split_composition_1200x630.txt`
4. Add this instruction at the beginning of the prompt:
   > *"Using the face, facial features, and likeness of the person in the attached image, generate..."*
5. Set the output aspect ratio to **16:9** (wide landscape).
6. Click **Generate**.

### Method B: Text-to-Image Generation
If generating without a reference photo, simply paste the prompt directly into Imagen 3 to generate a representative cinematic founder portrait.

---

## 3. How to Use Your Generated Image in the Admin Panel

Once you have downloaded your generated image:

1. Upload the image through the admin **Media** library (`/admin/media`), or place it into `public/uploads/`.
2. When creating or editing a blog post (`/admin/posts/new` or `/admin/posts/[id]`):
   - In the **Social Thumbnail (1200×630)** card, click the **"Custom BG"** button.
   - Paste the URL (e.g. `/uploads/my-ai-portrait.webp`).
   - Click **Apply**.
3. The engine automatically overlays a high-contrast split gradient scrim on the right side so your text, category pill, and watermark stay 100% crisp and readable while displaying your custom portrait on the left!
4. Click **"Use as Cover"** to instantly assign it as your post's featured cover and OpenGraph card!
