# Research Portfolio (GitHub Pages)

Simple, clean, and editable personal research portfolio.

## Folder structure

- `index.html` -> Home page (current work, timeline, experience, gallery)
- `publications.html` -> Publications page
- `styles.css` -> Styling
- `script.js` -> Loads JSON data into pages
- `data/profile.json` -> Bio, links, current work, experience, gallery photo list
- `data/updates.json` -> Timeline updates
- `data/publications.json` -> Publications list
- `assets/photos/` -> Your images

## Quick edit workflow

1. Put your photos in `assets/photos/`.
2. Update `data/profile.json`:
   - Name, headline, bio
   - Current work and experience
   - `galleryPhotos` entries with image paths
3. Add updates in `data/updates.json`.
4. Add papers in `data/publications.json`.

## Run locally

From this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish on GitHub Pages

1. Create a new repository named `<your-username>.github.io`.
2. In terminal:

```bash
cd /home/adipa/research-portfolio
git init
git add .
git commit -m "Initial research portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

3. In GitHub repo settings:
   - Go to **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** and folder **/** (root)

Your site will be live at `https://<your-username>.github.io`.

## Notes

- Keep file names lowercase and without spaces for fewer deployment issues.
- Replace placeholder links with your actual GitHub, Scholar, LinkedIn, and email.
