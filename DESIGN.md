---
name: Box Studio
colors:
  surface: '#200e11'
  surface-dim: '#200e11'
  surface-bright: '#4a3336'
  surface-container-lowest: '#1a090c'
  surface-container-low: '#291619'
  surface-container: '#2e1a1d'
  surface-container-high: '#392427'
  surface-container-highest: '#452f32'
  on-surface: '#fddadd'
  on-surface-variant: '#e6bcc1'
  inverse-surface: '#fddadd'
  inverse-on-surface: '#402b2d'
  outline: '#ad878c'
  outline-variant: '#5d3f43'
  surface-tint: '#ffb2bd'
  primary: '#ffb2bd'
  on-primary: '#670024'
  primary-container: '#ff4e7a'
  on-primary-container: '#5a001f'
  inverse-primary: '#bd0049'
  secondary: '#ffb2bd'
  on-secondary: '#670025'
  secondary-container: '#900237'
  on-secondary-container: '#ff97a8'
  tertiary: '#ffb59a'
  on-tertiary: '#5b1b00'
  tertiary-container: '#f85e16'
  on-tertiary-container: '#4f1700'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9dd'
  primary-fixed-dim: '#ffb2bd'
  on-primary-fixed: '#400013'
  on-primary-fixed-variant: '#900036'
  secondary-fixed: '#ffd9dd'
  secondary-fixed-dim: '#ffb2bd'
  on-secondary-fixed: '#400014'
  on-secondary-fixed-variant: '#900237'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#802900'
  background: '#200e11'
  on-background: '#fddadd'
  surface-variant: '#452f32'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin: 40px
  radius-pill: 32px
---

## Brand & Style
The brand personality is defined by high-energy creativity and a bold, editorial sensibility. Transitioning from a purely corporate aesthetic to a "Content-First" philosophy, this design system serves a high-end media agency that values vibrant expression and dynamic impact.

The style is **Bold and Immersive**, utilizing a deep, high-contrast dark-mode foundation to make creative work and media assets pulsate with energy. By maintaining high-radius containers and a vivid magenta-led palette, the interface functions as a "Digital Gallery"—a premium, cinematic environment that commands attention through luminosity and professional clarity.

## Colors
The color strategy employs a "Content" variant approach, prioritizing high-saturation primary tones against a sophisticated dark background to ensure maximum visual pop and reduced eye strain.

- **Primary & Navigation:** Vivid Pink (#fe0065) is the signature color for core actions and brand highlights, acting as a luminous beacon against the dark interface.
- **Surface:** The system uses a deep, warm-neutral foundation (#8c7073 based neutrals) to create a multi-layered dark environment that feels premium rather than purely black.
- **Secondary & Tertiary:** Secondary rose tones (#d34065) provide tonal depth, while Tertiary burnt orange (#e45000) is used for specialized accents and high-alert call-to-actions.
- **Semantic Feedback:** Errors and alerts are integrated into the warm-dark palette, leveraging the high-contrast saturation of the secondary scales to remain visible against dark surfaces.

## Typography
Plus Jakarta Sans remains the sole typeface, maintaining a modern, geometric construction that balances the bold color palette.

Hierarchy is established through weight and scale. In this dark-mode environment, typography must maintain high contrast against deep backgrounds. Display styles use tight letter spacing and bold weights to anchor the layout. Body text maintains a generous line height (1.6) to ensure long-form legibility, while labels and metadata utilize increased letter spacing to remain crisp and readable against the dark-neutral surfaces.

## Layout & Spacing
This design system employs a **Fixed Grid** model for desktop views, centered with a maximum width of 1440px to focus the user's attention on the content-rich center.

The rhythm is based on an 8px square grid. Large internal padding (minimum 32px) within cards and sections remains mandatory to balance the high-intensity colors with breathable negative space. Margins are generous, ensuring the vibrant content containers never feel cramped against the edges of the display.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and inner luminosity. In dark mode, elevation is perceived by moving from the deepest background colors to increasingly lighter or more "tinted" surface containers.

- **Level 1 (Cards):** Uses a dark surface container slightly lighter than the background, with a subtle 1px border using a low-opacity primary tint.
- **Level 2 (Modals):** High-contrast surface with a soft, diffused outer glow in the primary magenta color (#fe0065) at 10% opacity to simulate the element emitting light.

Avoid traditional black shadows. Instead, use "inner-glow" techniques or lighter neutral-tinted surface variants to define boundaries, allowing the primary magenta to act as a neon-like light source for active elements.

## Shapes
The defining visual characteristic remains the **32px border radius**. This high-roundedness applies to all primary containers, buttons, and input fields.

This "pill-inspired" geometry softens the aggressive vibrancy of the dark mode palette, maintaining a user-friendly and modern feel. Smaller utility elements like tags or checkboxes scale down proportionally but maintain a minimum of 8px to ensure the organic, friendly language is consistent across the interface.

## Components
Consistent execution across components balances energy with usability:

- **Buttons:** Primary buttons use a solid Vivid Pink (#fe0065) fill with white text and a 32px radius. In dark mode, these should appear to "glow" slightly.
- **Input Fields:** Styled with a dark-neutral surface and a subtle bottom border. Upon focus, the border transitions to a 2px primary magenta stroke with a soft outer glow.
- **Cards:** Must use the 32px radius and the tonal layering approach for depth. Internal padding remains at least 32px to provide high-end clarity.
- **Icons:** Use Lucide-React icons with a 1.5px stroke weight. Icons use the secondary rose or primary magenta for active states to ensure visibility against dark backgrounds.
- **Charts:** Utilize "Luminous Gradients." Use the Tertiary orange and Primary pink to create high-contrast data visualizations that "pop" against the dark surfaces.
- **Chips/Badges:** Pill-shaped with 100px radius, using high-saturation fills with white text for maximum visibility.