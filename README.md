# template-index

One-photo viewer with an Index / Thumbs switch. Plain HTML, CSS and JS. No build step.
Courier New (typewriter monospace) 12pt, white background, black text, no decoration.

## What it does
- Viewer: one photo centered. Click the right half or press the right arrow for next, left half or left arrow for previous. Swipe on touch screens.
- Thumbs: every photo as a small thumbnail, top left, over the faded current photo. Click one to open it.
- Index: a sidebar slides in from the right with the list of works, year and photo count. The photo stays visible.
- Info: text, contact, representation, Instagram.
- Every photo has its own address, for example `#/alpha-2026-03`. It works on GitHub Pages without server setup.

## What to change
1. `data.js`: name, role, contact, info text, and the list of works (slug, title, year, count). This is the only content file.
2. Photos: name them `<slug>-<NN>.jpg` (01, 02, ...). The slug has lowercase letters and digits only.
   `python3 tools/make-web-images.py originals/ img/` makes the 1400px and 300px sizes.
3. Delete the placeholders: remove everything in `img/` first, then add the real photos.
4. `index.html`: `<title>` and the description.
5. Fonts and colors: the top of `style.css` (`--margin`, `--gap`, `--thumb-h`).

## Size
Keep the whole repository under 1 GB (GitHub Pages limit for the published site). Keep each file under 50 MB.
Originals do not belong here. Keep them in the archive repository.

## Test
`python3 -m http.server 8000`, then open http://localhost:8000
