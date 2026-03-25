# Design System: Terminal Hub Technical Specification

## 1. Overview & Creative North Star: "The Kinetic Monolith"
The Creative North Star for this design system is **The Kinetic Monolith**. This is not a standard SaaS dashboard; it is a high-performance command center for artificial intelligence. It draws inspiration from brutalist architecture and 1980s mainframe terminals, reimagined through a high-end, editorial lens.

The experience breaks the "template" look by using **intentional asymmetry** and **brutalist bento grids**. We reject soft rounded corners and decorative fluff in favor of raw, technical precision. The UI should feel like a living piece of hardware—cold, efficient, and authoritative.

---

## 2. Colors & Surface Logic
The palette is anchored in deep obsidian and high-contrast vermilion. We utilize a strict tonal hierarchy to define space without relying on decorative lines.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background shifts using the `surface-container` tiers. For example, a `surface-container-low` module sits directly on a `surface` background. The shift in hex value provides the structural definition.

### Surface Hierarchy & Nesting
Treat the UI as a series of recessed or elevated "plates":
*   **Base Layer:** `surface` (#131313) or `surface-container-lowest` (#0e0e0e) for the deep background.
*   **Module Layer:** `surface-container` (#201f1f) for primary bento grid cells.
*   **Interactive Layer:** `surface-bright` (#3a3939) for hovered or active technical states.

### The "Glass & Gradient" Rule
While the aesthetic is brutalist, we inject "soul" through technical glass. Use `surface-variant` with a `backdrop-blur` of 12px for floating command palettes. Main CTAs should utilize a subtle linear gradient from `primary` (#ffb3b1) to `primary_container` (#ff535b) to simulate a high-energy LED glow.

---

## 3. Typography: Technical Aggression
The typography system relies on the tension between a massive, loud Sans-serif and a precise, quiet Monospaced font.

*   **Display & Headlines (Inter/Archivo):** Use `display-lg` and `headline-lg` for high-impact labels. These should be set with tight letter-spacing (-0.04em) and forced uppercase to feel like stamped industrial markings.
*   **Technical Data (JetBrains Mono/Space Grotesk):** All functional data, code snippets, and UI labels use the `body` and `label` scales. This provides the "Terminal" feel.
*   **Hierarchy:** Use `on_surface_variant` (Silver-Zinc) for secondary technical data to ensure the `primary` Vermilion Red highlights only the most critical telemetry.

---

## 4. Elevation & Depth
In this system, depth is "carved" or "stacked," never floated with traditional drop shadows.

*   **The Layering Principle:** Stacking `surface-container-high` on `surface-container-low` creates a physical offset. This "plate" logic replaces the need for shadows.
*   **Ambient Shadows:** If a floating element (like a modal) is required, use an extra-diffused shadow: `box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5)`. The shadow color must be a tinted version of the background, never a generic grey.
*   **The Ghost Border Fallback:** If accessibility requires a container boundary, use a "Ghost Border": `outline-variant` at 15% opacity. High-contrast, 100% opaque borders are forbidden.
*   **The Glitch State:** On hover, elements may trigger a 1px `primary` glow or a subtle 2px horizontal offset (glitch) to signal high-performance responsiveness.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#ffb3b1) background with `on_primary` (#680011) text. Sharp 0px corners. On hover, trigger a red "border glow" (`box-shadow: 0 0 15px var(--primary)`).
*   **Secondary:** Transparent background, `primary` ghost border (20% opacity). Text in `primary`.
*   **Tertiary:** Pure Monospaced text with a `_` trailing underscore that blinks in `primary` red.

### Inputs
*   **Minimalist Terminal:** Transparent backgrounds with a `surface-container-highest` bottom-border only. 
*   **Blinking Cursor:** Use a custom animation for the input caret: a solid Vermilion Red block that pulses at 1Hz.

### Bento Grid Cards
*   **Forbid Dividers:** Do not use lines to separate content within cards. Use `Spacing-8` (1.75rem) or `Spacing-12` (2.75rem) to create clear groupings.
*   **Data Visualization:** Use `tertiary` (#6fd8cc) for secondary data streams (e.g., CPU/GPU loads) to provide a "phosphor-green" legacy terminal contrast against the Vermilion.

### Additional Components: The "Status Scanner"
A custom component for this system: A thin, horizontal line (1px `primary`) that constantly scans vertically across high-priority data modules at 5% opacity, reinforcing the "AI Lab" workstation aesthetic.

---

## 6. Do's and Don'ts

### Do
*   **DO** use 0px border-radius for every single element. Roundness is a weakness in this system.
*   **DO** use extreme typographic scale—pair a 3.5rem headline with a 0.6875rem label.
*   **DO** leave ample "negative space" as a functional buffer; the UI should feel expensive and uncrowded.

### Don't
*   **DON'T** use soft drop shadows or "claymorphism."
*   **DON'T** use icons with rounded caps; use sharp, geometric SVG icons only.
*   **DON'T** use 100% white text. Use the Silver-Zinc (`on_surface`) to maintain the "obsidian" atmosphere.