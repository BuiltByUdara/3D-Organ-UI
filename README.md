# OrganUI Anatomy Explorer

An interactive anatomy learning app built with Vite, React, TypeScript, Tailwind CSS, React Router, Zustand, and official OrganUI components.

## Run locally

```sh
npm install
npm run dev
```

## Validate and build

```sh
npm run lint
npm run build
npm run preview
```

The production output is in `dist/`. Hash-based routing supports static hosting without route rewrites. For deployment under a subdirectory (for example a GitHub Pages project), configure Vite's `base` to match that path.

## Features

- Four real 3D models: heart, brain, lungs, and kidneys.
- Search organs and the current organ's structures.
- Select structures in the viewer or sidebar, toggle visibility, rotate, zoom, choose named views, and reset.
- Organ overviews and structure descriptions from the installed model metadata.
- One introductory knowledge check per organ.
- Bookmarks and completed reviews persisted to local storage on the current device.
- Responsive explorer, learning space, and saved collection.
- English, Sinhala, and Tamil language selector with a saved device preference. Navigation, lessons, quizzes, structure labels/descriptions, and viewer messages are translated. Search accepts English and the selected language; original model credits and Latin names are preserved.
- Keyboard model interaction and built-in loading/error/retry states supplied by OrganUI.

## Assets and attribution

OrganUI documentation: https://organui.com/docs/components/organs

The GLB models load on demand from commit-pinned jsDelivr URLs specified in `src/components/{organ}.tsx`. Internet access and WebGL are required for the 3D view. Each model's credit, license, and source are preserved in the viewer's Model credit control. Heart, brain, and kidney models use CC BY 4.0; the lungs model uses CC BY-SA 2.1 JP. Component code and model licenses are separate; preserve the relevant model attribution and license when redistributing or self-hosting assets.

This is an educational starter, not a diagnostic tool or a comprehensive anatomy curriculum. No backend, accounts, or cross-device synchronization is included.

## Project layout

- `src/App.tsx`: routing, explorer, organ summaries, review questions, collections.
- `src/store.ts`: persisted bookmarks and review completion.
- `src/components/`: installed OrganUI models and shared viewer.
- `src/components/ui/`: generated Base UI components.
- `src/App.css`: responsive application layout.
- `src/index.css`: Tailwind and shared theme tokens.

## Validation notes

Run `node --test tests/localization.test.mjs` to check translation coverage and interpolation parameters. Translation resources are in `src/locales/si.json` and `src/locales/ta.json`; English source strings are the fallback. Language state and translation helpers are in `src/i18n.ts`.

Production compilation and lint were run successfully. Generated components produce Fast Refresh export warnings. The 3D dependency contributes a large production JavaScript chunk; route splitting is a future optimization. Browser smoke checks verified heart rendering and correct-answer completion.
