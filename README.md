# Symbiotic Interfaces Lab

Website for the Symbiotic Interfaces Lab at UT Austin.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000/`.

## Editing site content

Research, team, news, and header-slide content live in the `content/` folder.
See `content/README.md` for the editable fields and examples. Images live in
`public/images/`.

## Checks

```bash
npm run build
npm run lint
npm test
```

Pushing the `main` branch to GitHub automatically publishes the site through
GitHub Pages.
