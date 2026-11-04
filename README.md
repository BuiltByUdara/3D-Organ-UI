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

- A responsive AdSense banner below the header. Set `publisherId` and `slotId` in `src/config/banner.ts` from your responsive display ad code. Development and localhost show a labeled layout preview without loading Google scripts, even when IDs are configured. Production on a deployed domain uses the real ad unit; it hides the slot if either ID is missing. Set `enabled: false` to disable it. The banner stays mounted between routes and does not auto-refresh.

- Dark theme by default, with a translated light/dark switch in the header. The preference is saved on this device and applied before the app renders.

- All 42 models from the OrganUI organs catalog, including liver, stomach, intestines, eye, ear, skeleton, skin, glands, and reproductive organs.
- Search organs and the current organ's structures.
- Select structures in the viewer or sidebar, toggle visibility, rotate, zoom, choose named views, and reset.
- Organ overviews and structure descriptions from the installed model metadata.
- One introductory knowledge check per organ. Added organs use structure-recognition questions generated from their model metadata.
- Bookmarks and completed reviews persisted to local storage on the current device.
- Responsive explorer, learning space, and saved collection.
- English, Sinhala, and Tamil language selector with a saved device preference. Navigation, organ names, overview summaries, quiz prompts, and viewer messages are translated. The original four organs retain full structure translations; untranslated specialist details in the expanded catalog fall back to English with a visible notice. Search accepts English and the selected language. Original model credits are preserved.
- Keyboard model interaction and built-in loading/error/retry states supplied by OrganUI.

## Assets and attribution

OrganUI documentation: https://organui.com/docs/components/organs

The GLB models load on demand from commit-pinned jsDelivr URLs specified in `src/components/{organ}.tsx`. Internet access and WebGL are required for the 3D view. Each model's credit, license, and source are preserved in the viewer's Model credit control. Heart, brain, and kidney models use CC BY 4.0; the lungs model uses CC BY-SA 2.1 JP. Component code and model licenses are separate; preserve the relevant model attribution and license when redistributing or self-hosting assets.

This is an educational starter, not a diagnostic tool or a comprehensive anatomy curriculum. No backend, accounts, or cross-device synchronization is included.

## Project layout

- `src/App.tsx`: routing, explorer, and collections.
- `src/organs.ts`: the 42-model catalog, organ summaries, and review questions.
- `src/store.ts`: persisted bookmarks and review completion.
- `src/components/`: installed OrganUI models and shared viewer.
- `src/components/ui/`: generated Base UI components.
- `src/App.css`: responsive application layout.
- `src/index.css`: Tailwind and shared theme tokens.

## Validation notes

Run `node --test tests/localization.test.mjs` to check translation coverage and interpolation parameters. Translation resources are in `src/locales/si.json` and `src/locales/ta.json`; English source strings are the fallback. Language state and translation helpers are in `src/i18n.ts`.

Run `node --test tests/catalog.test.mjs` to validate all 42 model registrations, view targets, quiz answers, and translated catalog content. Run `node scripts/check-models.mjs` for an online check of model URL availability and CORS headers.

Production compilation and lint were run successfully. Generated components produce Fast Refresh export warnings. The 3D dependency contributes a large production JavaScript chunk; route splitting is a future optimization. Browser smoke checks verified heart rendering and correct-answer completion.

AdSense banner implementation follows https://support.google.com/adsense/answer/9183460. The build for this addition has not been run because the command was declined. Actual ad serving requires your own configured AdSense account and ad unit.
