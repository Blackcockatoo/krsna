# Kṛṣṇapakṣi — The Fruit of Bhakti

Tom Moss · Blue $nake Studio / B$S.

The GPT Sites listening and reading experience, transferred from source commit `effc1dee4738be2a32314c48fa94cbb24a731aba`, with the existing illustrated literary edition preserved and linked.

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
- `complete-edition.html`: preserved illustrated literary edition, English companion and commentary.
- `content/complete-edition.md`: preserved full source edition.

Audio begins only after user interaction. The English companion uses same-origin browser messaging; keep both pages on the same deployment. All playback assets are local; no GPT Sites login or runtime is required. External scripture links retain their original destinations.
