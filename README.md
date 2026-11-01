# ঢেউ — Dheu Magazine

An independent Bengali and English literary and cultural magazine built with **Jekyll**, hosted on **GitHub Pages**, and edited through **Pages CMS**.

## Publishing workflow
1. Open Pages CMS and create a publication in **Publications**.
2. Add a title, category, language, date, short introduction and main content.
3. Add an author and cover image when available.
4. Set **Publication Status** to `published` to show it publicly; use `draft` to keep it hidden.
5. Save. GitHub Pages rebuilds the site. Published work appears on the homepage and `/archive/`, and receives its own `/publications/<title-slug>/` page.

## Structure
- `.pages.yml` — Pages CMS content and media configuration.
- `_config.yml` — Jekyll configuration and publication collection.
- `content/_publications/` — Markdown publications managed by Pages CMS.
- `assets/images/` — image uploads from Pages CMS.
- `_layouts/default.html` — shared site-wide header, navigation, footer and assets.
- `_layouts/publication.html` — editorial article/reading template.
- `_layouts/page.html` — compatibility wrapper for ordinary pages.
- `archive/index.html` and `archive.js` — searchable and filterable archive.
- `style.css` and `script.js` — shared design and navigation/language behaviour.

## GitHub Pages base URL
The configuration is currently set for `https://dheu50.github.io/DHEU/`, using `baseurl: "/DHEU"`. If deployed at the domain root instead, change `baseurl` to an empty string. Pages CMS media output paths should remain `/assets/images`; Jekyll's `relative_url` filter adds the configured base URL.

The language toggle translates shared interface labels only. It does not machine-translate submitted literary work.
