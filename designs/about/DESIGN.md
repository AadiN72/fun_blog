---
name: Technical Precision
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#45464c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#575e70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#141b2b'
  on-primary-container: '#7d8497'
  inverse-primary: '#c0c6db'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#261906'
  on-tertiary-container: '#968065'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f7'
  primary-fixed-dim: '#c0c6db'
  on-primary-fixed: '#141b2b'
  on-primary-fixed-variant: '#404758'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#f9debf'
  tertiary-fixed-dim: '#dcc2a4'
  on-tertiary-fixed: '#261906'
  on-tertiary-fixed-variant: '#55442d'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-max: 800px
  gutter: 24px
  section-gap: 64px
  stack-sm: 8px
  stack-md: 16px
---

## Brand & Style

This design system is built for a professional engineering and research context. The brand personality is **intellectual, precise, and understated**. It avoids the "flashiness" of consumer tech in favor of the functional aesthetic of engineering documentation and academic research.

The style is a blend of **Minimalism** and **Modern Corporate**, utilizing heavy white space and a monochrome palette to allow technical content (code, diagrams, and project logs) to take center stage. Visual interest is generated through high-quality typography and subtle structural elements rather than decorative graphics. The emotional response should be one of clarity, reliability, and technical competence.

## Colors

The palette is intentionally restrained, focusing on a grayscale spectrum to communicate a "blank slate" engineering feel.

- **Primary:** Deep Ink (#111827). Used for headings, primary text, and high-emphasis UI icons.
- **Secondary:** Precision Blue (#3B82F6). Used sparingly for active states, text links, and small interactive accents like the navigation underline.
- **Surface/Neutral:** A series of cool grays. The main background is pure white or near-white (#F9FAFB), while containers and cards use a subtle slate tint (#F3F4F6) to create soft differentiation without heavy shadows.
- **Success/Error:** Use standard semantic colors only when necessary for technical feedback (e.g., build status, form errors), but keep them desaturated to match the overall tone.

## Typography

The typography strategy uses a "Swiss-style" hierarchy. 

1. **Headlines:** Use **Hanken Grotesk** for a sharp, modern, and high-end tech feel. Tighten letter spacing on larger sizes to create a cohesive visual block.
2. **Body:** Use **Inter** for maximum readability in long-form blog posts and project descriptions. The line height is generous (1.6) to prevent eye strain during technical reading.
3. **Labels/Tech Details:** Use **JetBrains Mono** for "metadata" like dates, tags, and small technical annotations. This reinforces the engineer/developer persona.

Large headlines (XL) should be used for main page titles and intro sections, while LG is reserved for section headers within projects or blog posts.

## Layout & Spacing

This design system uses a **fixed-width, centered column model** for its primary content. 

- **Max Width:** The main content container is capped at 800px to ensure optimal line lengths for reading.
- **Fluidity:** Within that 800px, elements are fluid. On mobile, margins reduce to 20px on either side.
- **Vertical Rhythm:** Spacing is strictly based on a 4px grid. Use large vertical gaps (64px+) between major sections (e.g., Intro to Project List) to maintain the minimalist "breathable" feel.
- **Alignment:** All content is left-aligned to mimic a technical manuscript. Avoid center-alignment even for hero sections.

## Elevation & Depth

This system prioritizes **flatness and tonal layers** over shadows.

- **Surface Tiers:** Use subtle background color shifts to indicate depth. The main page is the lowest tier (White). Cards and inputs sit on the second tier (Slate-50).
- **Outlines:** Use thin (1px) low-contrast borders (#E5E7EB) to define boundaries for cards and the navigation bar.
- **Shadows:** Avoid shadows entirely, or use a single "Ambient" shadow for floating elements (like the VS Code-style toast notification). This shadow should be extremely diffused: `0 4px 20px rgba(0, 0, 0, 0.05)`.
- **Interactions:** Use tonal shifts (e.g., a slightly darker gray background) for hover states rather than lifting elements via shadows.

## Shapes

The shape language is **Medium-Rounded**, striking a balance between the clinical sharpness of engineering and the approachability of modern software.

- **Default:** 0.5rem (8px) for buttons, input fields, and small cards.
- **Large:** 1rem (16px) for main content containers or the navigation bar wrapper.
- **Pill:** Reserved exclusively for "Tags" or "Chips" to distinguish them from interactive buttons.

## Components

- **Navigation:** A floating "pill" style bar at the top, centered, with a light border. Use a simple 2px blue underline for the active state.
- **Cards:** Light gray background (#F3F4F6) with no shadow and a thin border. Headings inside cards should use `headline-lg` (at a smaller scale) or `body-md` bolded.
- **Buttons:** Primary buttons are solid `Primary Color`. Ghost buttons use a simple border. All buttons use 8px rounded corners.
- **Tags/Chips:** Small, pill-shaped elements with a very light gray background and `label-caps` typography. They should not be vibrant; they are meant to be metadata.
- **Input Fields:** Flat, slate-colored backgrounds with no borders until focused. On focus, a 1px `Secondary Color` border appears.
- **Toasts/Popups:** Style these to mimic IDE notifications (like VS Code). Use a white background, high-quality icons, and a clear "Action" button.