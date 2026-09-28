# Updating the lab website

The website reads its editable sections from four plain-text files:

- `research.json` — publications
- `people.json` — lab members
- `news.json` — announcements
- `header-slides.json` — slide image paths and accessibility descriptions

You do not need to edit the website code. Open the relevant file in any text
editor, copy an existing item, paste it after the previous item, and replace
the text between quotation marks.

## Important JSON rules

- Separate items with a comma.
- Keep quotation marks around text.
- Do not add a comma after the final item.
- Image paths start with `/images/`. Put the matching image in `public/images/`.

## Research

The website sorts research automatically from newest to oldest and creates the
year headings.

```json
{
  "year": 2027,
  "title": "Publication title",
  "authors": "First Author, Second Author, and Third Author",
  "venue": "In Proc. CHI 2027 (full paper)",
  "topic": "short research topic",
  "description": "A short plain-language explanation of the work.",
  "award": "Optional award",
  "image": "/images/project-image.jpg",
  "alt": "A concise description of the project image",
  "resources": [
    { "type": "paper", "label": "Paper", "url": "/papers/project-paper.pdf" },
    { "type": "video", "label": "Video", "url": "https://youtu.be/example" },
    { "type": "publication", "label": "Publication", "url": "https://dl.acm.org/doi/example" },
    { "type": "talk", "label": "Talk", "url": "https://youtu.be/example" }
  ]
}
```

The optional `award` line can be removed. Resource links can also be omitted
when that resource does not exist. Put paper PDFs in `public/papers/` and use a
URL beginning with `/papers/` so the lab website hosts the file.

The built-in resource types `paper`, `video`, `publication`, and `talk` receive
their matching icons automatically. To add any other resource type without
editing the website code, add its SVG icon to `public/images/resource-icons/`
and include an `icon` field:

```json
{
  "type": "slides",
  "label": "Slides",
  "url": "/slides/project-slides.pdf",
  "icon": "/images/resource-icons/slides.svg"
}
```

If a custom resource does not specify an icon, the website displays a generic
link icon.

## Header slides

The three slide images are in `public/images/header-slides/`. Replace
`slide-1.png`, `slide-2.png`, or `slide-3.png` with a new image using the same
filename to update the slide without editing the website code. Edit the `alt`
text in `header-slides.json` when the subject of an image changes.

## People

```json
{
  "name": "Person name",
  "title": "Role or title",
  "image": "/images/person-name.jpg",
  "alt": "Person name",
  "website": "https://example.com/"
}
```

For a placeholder, leave `image`, `alt`, and `website` empty and add
`"placeholderTone": "warm"`. Available colors are `warm`, `blue`, and `green`.

## News

```json
{
  "date": "2027.01",
  "title": "News headline",
  "note": "Optional short detail",
  "url": "https://optional-link.example/"
}
```
