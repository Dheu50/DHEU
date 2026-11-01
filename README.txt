DHEU PHOTOGRAPHY CINEMATIC REDESIGN

Files in this package:
1. photography/index.html  -> Replace the existing photography/index.html
2. photography.js          -> Replace the root-level photography.js
3. photography-style-addition.css -> Copy its entire contents and APPEND to the bottom of the existing root-level style.css

Do NOT replace style.css with the CSS addition file. Append it only.
Do NOT change .pages.yml, _config.yml, or content/_photographs.
The gallery expects the current Pages CMS schema: each published collection has a photos list with image and optional caption fields.
Image paths are used as saved (e.g. /DHEU/assets/images/name.jpg), without applying relative_url again.
