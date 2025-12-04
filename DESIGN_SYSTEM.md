# Cravit Landing – Design System

## Color System
| Token | Value | Usage |
| --- | --- | --- |
| `--color-dark-1` | `#121111` | Primary text, emphasis |
| `--color-dark-2` | `#171717` | Secondary text |
| `--color-dark-3` | `#292929` | Supporting text, borders |
| `--color-white` | `#FFFFFF` | Surfaces, highlights |
| `--color-background` | `#FFFAF5` | Page background, hero gradient base |
| `--color-accent` | `#FF6900` | Primary CTA default, focus highlights |
| `--color-accent-2` | `#F64900` | CTA hover/active, gradients |

## Typography System (Poppins)
| Style | Weight | Size | Line Height | Letter Spacing | Color |
| --- | --- | --- | --- | --- | --- |
| Heading 1 | 500 (Medium) | 88px | 0.97em | -0.04em | Dark 1 |
| Heading 2 | 400 (Regular) | 44px | 1.1em | -0.04em | Dark 1 |
| Heading 3 | 500 (Medium) | 32px | 1.4em | -0.04em | Dark 1 |
| Heading 4 | 500 (Medium) | 24px | 1.4em | -0.04em | Dark 1 |
| Body XL | 500 (Medium) | 20px | 1.45em | -0.02em | Dark 1 @ 75% |
| Body L | 500 (Medium) | 18px | 1.5em | -0.01em | Dark 1 @ 75% |
| Body M | 500 (Medium) | 16px | 1.6em | -0.01em | #030303 |
| Body S | 500 (Medium) | 14px | 1.2em | -0.03em | Dark 1 |

## Usage Notes
- Default body font is Poppins Medium with smooth rendering; reserve Geist Mono for legacy code snippets if needed.
- Hero backgrounds combine a soft radial gradient (`--color-accent` to transparent) with blurred accent cards.
- CTA button uses a dual accent gradient, large radius, and stacked inner/outer glows to achieve the glossy 3D effect described in the design reference. Use the `--shadow-cta-*` tokens from `globals.css` for consistency.
    