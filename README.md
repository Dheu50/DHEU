# ঢেউ — Dheu Magazine

This version connects Pages CMS to the public website using Jekyll collections and GitHub Pages.

## Publishing workflow
1. Open Pages CMS and create a publication in **Publications**.
2. Fill in the title, author, category, language, date, excerpt, images and Main Content.
3. Set **Publication Status** to `published` to show it publicly; keep it as `draft` to hide it.
4. Save. GitHub Pages rebuilds the site. New work appears on the homepage and `/archive/`, and gets its own `/publications/<slug>/` page.

## Important repository structure
- `.pages.yml` — Pages CMS configuration.
- `_config.yml` — Jekyll configuration for GitHub Pages.
- `content/_publications/` — publication Markdown files managed by Pages CMS.
- `assets/images/` — uploaded magazine images.
- `_layouts/` — article and page templates.
- `archive/index.html` — searchable and filterable archive.

The existing visual identity, stylesheet, homepage artwork and animations are retained.
