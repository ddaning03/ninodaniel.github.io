# Design System Specification: The Nocturnal Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Silent Authority"**
This design system rejects the "app-like" clutter of modern interfaces in favor of high-end Swiss editorial prestige. It is designed to feel like a limited-edition physical monograph—stark, intentional, and expensive. 

To move beyond a "template" look, we utilize **The Rule of Negative Tension**: whitespace is not "empty," but a structural element used to compress content into high-impact zones. We break the standard centered grid by employing **Intentional Asymmetry**—shifting key elements (like massive vertical titles) off-axis to create a sense of bespoke, hand-crafted layout. This is a system of "quiet luxury" where the absence of ornamentation proves its value.

---

## 2. Colors & Surface Philosophy

The palette is rooted in a heritage cream and a "True Black" to evoke a sense of timelessness, accented by a singular, violent red that demands action.

### The Palette (Material Tokens)
- **Surface (Background):** `#fcf9f2` (Elegant Cream)
- **Primary:** `#000000` (Pure Black)
- **Surface Tint / Primary Fixed:** `#c00100` (Signature Red)
- **Secondary (Muted elements):** `#5e5e5e`
- **Surface Container (Lowest to Highest):** `#ffffff` → `#f6f3ec` → `#f1eee7` → `#ebe8e1` → `#e5e2db`

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. The UI must never look like a spreadsheet.
- Boundaries are defined solely through background color shifts.
- Use `surface_container_low` for sections resting on the main `surface`.
- Use `surface_container_highest` for immersive, full-width content blocks that need to recede.

### Surface Hierarchy & Nesting
Treat the interface as stacked sheets of heavy-stock paper. Instead of drawing a line to separate a "Card," use `surface_container_lowest` (#ffffff) to create a subtle "lift" against the cream background. 

### Signature Textures
For high-impact CTAs, use a subtle linear gradient from `primary_fixed` (#c00100) to `primary_container` (#7e0100). This adds a "velvet" depth to the red, ensuring it looks like a physical material rather than a digital hex code.

---

## 3. Typography

The typographic system is a dialogue between 18th-century elegance and mid-century modernism.

| Level | Font Family | Size | Character |
| :--- | :--- | :--- | :--- |
| **Display-LG** | Newsreader (Serif) | 3.5rem | High-contrast, vertical, tracking -2% |
| **Headline-LG** | Newsreader (Serif) | 2.0rem | Editorial headers, italicized for emphasis |
| **Title-MD** | Inter (Sans) | 1.125rem | Medium weight, All-Caps, tracking +10% |
| **Body-LG** | Inter (Sans) | 1.0rem | Leading at 1.6 for maximum breathability |
| **Label-SM** | Inter (Sans) | 0.6875rem | Bold, All-Caps, for navigation and metadata |

**Editorial Application:** 
- **Vertical Titles:** Large `display-lg` Serif titles should be rotated -90 degrees and placed along the left or right margin of the split-screen layout.
- **Micro-Copy:** All labels and titles must use wide letter-spacing (+5% to +10%) to evoke Swiss precision.

---

## 4. Elevation & Depth

Standard shadows are too "tech." We achieve depth through **Tonal Layering**.

- **The Layering Principle:** Place a `surface_container_lowest` object on a `surface_container_low` background to create a soft, natural separation.
- **Ambient Shadows:** Only for "floating" elements (e.g., a cocktail menu modal). Use a 32px blur, 4% opacity, using the `on_surface` (#1c1c18) color as the shadow tint. It should look like a shadow cast on a wall, not a button effect.
- **Glassmorphism:** For top navigation overlays, use a `surface` color at 80% opacity with a `backdrop-filter: blur(20px)`. This allows the "Nocturne" imagery to bleed through softly, maintaining a premium, integrated feel.
- **The Ghost Border:** If a button requires an outline, use the `outline_variant` (#c6c6c6) at 20% opacity. Never use 100% black for outlines.

---

## 5. Components

### Buttons
- **Primary:** No fill. A 1.5px border of `primary_fixed` (Red). Text is `primary` (Black), All-Caps Inter, 12px. Sharp 0px corners.
- **Secondary:** Underline only. `primary` (Black) text with a 1px underline offset by 4px. No box.
- **State Change:** On hover, the Primary button fills with `primary_fixed` (Red) and text shifts to `on_error` (White).

### Cards & Lists
- **Rule:** Forbid divider lines.
- **Execution:** Separate list items using the Spacing Scale (specifically `spacing-8` or `2.75rem`). Use `surface_container_low` as a background for every second item to create a "Zebra" effect that feels like intentional layout rather than a list.

### Input Fields
- Underline-only style. No bounding box.
- Label: `label-sm` (Inter, Bold, All-Caps) positioned 8px above the input.
- Error state: Underline changes to `error` (#ba1a1a).

### The "Split-Screen" Container
A signature component where the left 50% is a fixed high-resolution, moody photograph (low key lighting), and the right 50% is a scrolling `surface` area for content. This mimics a magazine spread.

---

## 6. Do’s and Don’ts

### Do
- **Do** use 0px border-radius for everything. Sharp corners imply precision and architectural rigor.
- **Do** use massive amounts of whitespace. If a section feels "comfortable," add 20% more space.
- **Do** use "Newsreader" for quotes and evocative storytelling, but never for functional UI labels.

### Don’t
- **Don’t** use icons unless absolutely necessary. Prefer text labels (e.g., "CLOSE" instead of an "X").
- **Don’t** use standard "drop shadows." They cheapen the minimalist aesthetic.
- **Don’t** center-align long passages of body text. Always flush-left (ragged right) to maintain the Swiss modernist grid.
- **Don't** use 1px solid black lines to separate sections. Let the colors do the work.