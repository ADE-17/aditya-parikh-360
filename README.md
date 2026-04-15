# Aditya Parikh — Research Portfolio

A personal research portfolio site, built with plain HTML/CSS/JS. No build step — edit JSON, commit, and deploy.

**Live at**: `https://<username>.github.io` (GitHub Pages)

---

## Quick Start (Local Preview)

```bash
cd research-portfolio
python -m http.server 8000
# Open http://localhost:8000
```

---

## How to Update Content

All content lives in the `data/` folder as JSON files. Edit these and the site updates automatically.

### 1. Update your profile (`data/profile.json`)

| Field | What it does |
|---|---|
| `name`, `headline`, `affiliation` | Hero section text |
| `bio` | Short paragraph about you |
| `profilePhoto` | Path to your photo (e.g. `assets/photos/profile.jpg`) |
| `openTo` | Array of strings shown as green badges (e.g. `"Research Collaborations"`) |
| `links` | Social/contact links — each has `label`, `url`, and `icon` (`email`, `github`, `scholar`, `linkedin`) |
| `researchFocusAreas` | Array of strings shown as pill tags |
| `currentWorkSummary` | Short paragraph about current research |
| `currentWorkItems` | Array of bullet points |
| `education` | Array of `{ degree, institution, location, period, focus }` |
| `workExperience` | Array of `{ role, org, period, summary }` |
| `skills` | Object with `languages`, `frameworks`, `tools`, `cloud` (each an array of strings) |
| `achievements` | Array of strings |
| `highlightedWorks` | Array of `{ title, concept, description, image }` — shown as visual cards |
| `galleryPhotos` | Array of `{ src, alt }` — shown on home page |
| `photography` | Array of `{ title, caption, src, alt }` — shown on Photography page |
| `lastUpdated` | Date string shown in footer |

### 2. Add a publication (`data/publications.json`)

Add a new object to the top of the array:

```json
{
  "title": "Your Paper Title",
  "authors": "Author One, Author Two, Aditya Parikh",
  "venue": "Conference Name",
  "year": 2026,
  "tags": ["first-author", "oral"],
  "links": { "paper": "https://...", "arxiv": "https://...", "code": "https://..." }
}
```

**Available tags**: `first-author`, `equal-contribution`, `oral`, `under-review`, `workshop`, `journal`, `thesis`

**Available link types**: `paper`, `arxiv`, `code`, `project`

### 3. Add a news/update (`data/updates.json`)

```json
{
  "date": "2026",
  "title": "Short headline",
  "details": "Longer description."
}
```

### 4. Add photos

1. Drop image files into `assets/photos/`
2. Reference them in `data/profile.json` under `galleryPhotos`, `highlightedWorks`, or `photography`
3. For your profile photo, update the `profilePhoto` field

---

## File Structure

```
research-portfolio/
├── index.html              # Home page
├── publications.html       # Full publications list
├── photography.html        # Photography gallery
├── styles.css              # All styling
├── script.js               # Data loading, rendering, interactivity
├── ADITYA_PARIKH_CV.pdf    # Downloadable CV
├── .nojekyll               # Disables Jekyll on GitHub Pages
├── data/
│   ├── profile.json        # Profile, experience, education, skills, etc.
│   ├── publications.json   # All publications
│   └── updates.json        # News timeline
└── assets/
    └── photos/             # All images (profile, highlights, gallery)
```

---

## Deploy to GitHub Pages

1. Push to a repo named `<username>.github.io`, **or** enable Pages in any repo's Settings
2. Content is served from the root — no build step needed
3. Every `git push` updates the live site

---

## Features

- **Data-driven**: All content from JSON — never edit HTML to update info
- **Responsive**: Works on mobile, tablet, and desktop
- **Publication badges**: Oral, Under Review, First Author, etc. with color-coded tags
- **Year filtering**: Filter publications by year on the publications page
- **Author highlighting**: Your name is automatically bolded in author lists
- **Image lightbox**: Click any image to view full-size
- **Scroll animations**: Sections reveal as you scroll
- **Open-to badges**: Green pulsing badges show what opportunities you're looking for
- **Download CV**: One-click CV download from the nav bar
- **Contact CTA**: Prominent contact section for collaborations
- **SEO**: Open Graph tags and descriptive meta for discoverability
