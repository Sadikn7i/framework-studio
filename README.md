

A lightweight, browser-based visual builder for creating beautiful academic and research framework figures, with no dependencies, no server, and no npm. Just open `index.html` and build.

![Framework Studio](https://img.shields.io/badge/version-1.0.0-c8922a?style=flat-square) ![License](https://img.shields.io/badge/license-MIT-14345a?style=flat-square) ![No Dependencies](https://img.shields.io/badge/dependencies-none-2d5a2d?style=flat-square)

---

## What is this?

Framework Studio lets you design publication-quality conceptual framework figures — the kind you'd put in a dissertation, journal paper, World Bank report, or conference poster. Pick a layout style, customize your blocks, choose a color theme, and export as PNG, JPG, or SVG in seconds.

Built for researchers, academics, and analysts who are tired of wrestling with PowerPoint boxes and misaligned arrows.

---

## Features

- **6 layout styles** Analytical Stages, Flowchart, 2×2 Matrix, Timeline, Comparison, and Pillar
- **6 color themes** Navy, Forest, Midnight, Obsidian, Crimson, Slate
- **Fully editable blocks** add, remove, rename, and fill in bullet points live
- **Export to PNG / JPG / SVG** high resolution (2.5× scale), ready for print or submission
- **Zero dependencies** pure HTML, CSS, and vanilla JS (plus html2canvas for export)
- **No install, no build step** open `index.html` in Chrome and you're done

---

## Layout Styles

| Style | Best For |
|---|---|
| **Analytical Stages** | Multi-stage research pipelines, methodological frameworks |
| **Flowchart** | Process flows, decision chains, sequential methods |
| **2×2 Matrix** | Priority grids, quadrant analyses, effort-impact maps |
| **Timeline** | Chronological frameworks, phased rollouts, historical stages |
| **Comparison** | Side-by-side contrasts, dual-approach frameworks |
| **Pillar** | Thematic pillars, conceptual foundations, key dimensions |

---

## Getting Started

Clone the repo, then open `index.html` directly in Chrome or Edge — no local server, no `npm install`, nothing.

```bash
git clone https://github.com/YOUR-USERNAME/framework-studio.git
cd framework-studio

# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

Once open, pick a **layout style** from the left panel, set your **title, subtitle, and source line**, choose a **colour theme**, edit your **blocks** (rename them and fill in bullet points, one per line), click **Generate**, then export as **PNG / JPG / SVG**.

---

## File Structure

```
framework-studio/
│
├── index.html              # Main app shell
├── style.css               # UI styles (dark editorial theme)
├── app.js                  # Core logic — state, rendering, export
├── README.md
│
└── frameworks/
    ├── analytical.js       # Analytical Stages renderer
    ├── flowchart.js        # Flowchart renderer
    ├── matrix.js           # 2×2 Matrix renderer
    ├── timeline.js         # Timeline renderer
    ├── comparison.js       # Comparison renderer
    └── hexagon.js          # Pillar renderer
```

---

## Export Notes

Exports are rendered at **2.5× scale** for crisp, high-resolution output. **PNG** is best for inserting into Word, PowerPoint, or LaTeX; **JPG** produces a smaller file size, good for web or email; **SVG** is a vector wrapper around a PNG snapshot, scalable for posters. For best results, use **Chrome or Edge** (html2canvas works most reliably there).

---

## Customisation

### Add a new colour theme

In `app.js`, add an entry to the `themes` object, then add a swatch button in `index.html`:

```js
// app.js
themes.myTheme = {
  primary:   '#112233',
  secondary: '#223344',
  tertiary:  '#334455',
  gold:      '#c8922a',
  gold2:     '#e8b84b',
  accent:    '#441122',
  bullet:    '#334455',
};
```

```html
<!-- index.html -->
<button class="swatch" style="--c:#112233" onclick="setTheme('myTheme',this)" title="My Theme"></button>
```

### Add a new layout style

Create `frameworks/mystyle.js` and export a function `renderMystyle(blocks, theme, title, subtitle, meta)`, using the shared `header(title, subtitle, meta, t)` helper from `app.js`. Then add a `<script src="frameworks/mystyle.js">` tag in `index.html`, register it in the `renders` map in `app.js`, and add a style card in the sidebar HTML:

```js
// app.js
const renders = {
  ...,
  mystyle: renderMystyle,
};
```

---

## Browser Support

| Browser | Status |
|---|---|
| Chrome 90+ | Fully supported |
| Edge 90+ | Fully supported |
| Firefox | Works, export may vary |
| Safari | Works, export may vary |

Chrome is recommended for the most accurate export output.

---

## Tech Stack

| Layer | Choice |
|---|---|
| UI Framework | Vanilla HTML + CSS + JS |
| Fonts | Cormorant Garamond, DM Sans, DM Mono (Google Fonts) |
| Export | [html2canvas 1.4.1](https://html2canvas.hertzen.com/) via CDN |
| Build tool | None |

---

## Roadmap

- [ ] Save / load projects as JSON
- [ ] More export sizes (A3, A4, widescreen)
- [ ] Custom font picker
- [ ] Drag-to-reorder blocks
- [ ] Dark mode output option
- [ ] More layout styles (Venn, Pyramid, Circular)

---

## Contributing

Just to let you know, pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change. Fork the repo, create a feature branch (`git checkout -b feature/new-layout`), commit your changes, push, and open a Pull Request.

---

## License

MIT © 2025 free to use, modify, and distribute.

---

## Screenshot

Generate a framework, take a screenshot, and drop it here as `screenshot.png` in the root folder.


---

*Built for researchers who care about how their work looks.*
