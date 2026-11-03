# Kṛṣṇapakṣi — The Fruit of Bhakti

Tom Moss · Blue $nake Studio / B$S.

One unified listening, visual and literary experience. The GPT Sites recording, synchronized karaoke, prayers and reader are married with the ten-image vision cycle, complete sixteen-movement English companion and literary commentary. Midnight blue and weathered gold carry the whole work.

## Vercel

Import `Blackcockatoo/krsna`, branch `main`, root directory `.`, Framework Preset **Other**. No build command, install step, environment variables or server are required. `vercel.json` serves the repository root.

## Local preview

Run `python3 -m http.server 8000` in the repository root, then visit `http://localhost:8000`.

## Contents

- `index.html`: listening, karaoke, prayers, scripture references and reading edition.
- `translation.html`: synchronized English companion window; open it from the player.
- `karaoke.js`, `karaoke-core.mjs`, `lyrics-data.js`, `translation.js`: original synchronized playback implementation.
- `style.css`, `app.js`, `icon.svg`: original GPT Site presentation and audio controls.
- `assets/crossing-song.mp3`: complete recording, hosted with the site.
- `assets/krsnapaksi-reader.pdf`: downloadable reader.
- `assets/`: original fonts, book cover, mantra chart, movement data and ten literary-edition images.
- `unified.css`, `unified.js`: shared art direction, mobile navigation, artwork lightbox, continuing playback dock and literary navigation.
- `complete-edition.html`: compatibility entrance into the unified edition; chapter and gallery anchors are preserved.
- `content/complete-edition.md`: preserved full source edition.

Audio begins only after user interaction. The English companion uses same-origin browser messaging; keep both pages on the same deployment. All playback assets are local; no GPT Sites login or runtime is required. External scripture links retain their original destinations.

The original recording and all chant, translation, prayer, companion and commentary text remain available. Artwork opens in a keyboard-accessible viewer with previous/next navigation. Audio keeps playing while reading; its compact controls appear when the listening section leaves view. Reduced-motion preferences are respected. No account, dependencies or build step.
