# BASIS marketing site

One file, `index.html`. Self contained, no build step, no dependencies except
Google Fonts over CDN. Open it in a browser and it works.

`docs/HANDOVER-original.md` is the handover written before this rebuild. Read it
for product background and for the constraints, which still hold.

---

## What changed in this pass

- Name is **BASIS**. The `<title>` is now just `BASIS`, not a description of one
  feature. Wordmark, footer and copy all say BASIS.
- The page opens with a **dark banner** carrying the hook copy, then **what we
  do**, then the **feature layouts**, then pricing, then early access.
- Six features are laid out as alternating rows. Three of them are new to the
  site: news routing, units in 3D, and the branded booking site now each get a
  proper row rather than a short paragraph.
- **Feature names are deliberately empty.** Every one renders as
  `Name pending` in a dashed slot. The descriptive line under it carries the
  meaning for now.
- Pricing tier names are empty in the same way. Prices are still open slots.

## Placeholder slots, all of them

Search for these strings when you fill things in.

| Search for | Count | What it is |
|---|---|---|
| `data-name-slot` | 9 | 6 feature names, 3 pricing tier names |
| `awaiting captured payload` | 7 | figure slots in the deck outline |
| `price slot` | 3 | pricing |
| `hello@example.sg` | 2 | contact address |
| `/privacy`, `/terms` | 2 | legal pages, not written |
| `waitlistForm` | 1 | form has no handler, it calls preventDefault |

A name slot looks like this and is a one line swap:

```html
<h3 class="feat-name" data-name-slot>Name pending</h3>
```

Delete the `data-name-slot` attribute when you put a real name in. That
attribute is what draws the grey text and the dashed underline.

## Page structure

```
nav               fixed, dark over the banner, light once you scroll past it
.banner           hook copy, two columns on desktop, CTAs, sources strip
#what             what we do, plus four pillars
#layouts          six feature rows, alternating, sticky text column on desktop
  01  live        listing decks, eight section outline with figure slots
  02  in build    tracked links, dark session playback panel
  03  in build    news routed to client groups
  04  in build    empty rooms furnished
  05  in build    units in 3D
  06  in build    branded site with booking
#pricing          three tiers, names and prices as slots
#waitlist         dark, form with no handler
footer
```

## Hard constraints, still in force

- **Never invent property data.** Every numeric slot in the deck outline is a
  dashed placeholder. The four abstract SVG diagrams are structure only and each
  carries a caption saying so.
- **No em dashes anywhere in copy.** Check before every commit:
  `grep -c '—' index.html` must return 0.
- **Do not overclaim.** No valuations, no estimates. BASIS does not price a
  listing.
- **Badges must stay accurate.** One feature says "Available now". Five say
  "In build". Do not promote a badge before the feature opens.
- **No real agent names, photos or client data.** The engagement numbers in the
  session panel are client behaviour, not property data, and the caption under
  the panel labels the session as illustrative. Keep that caption.
- **No stock photography.** There are no photographs on this page at all.

## Design system

Tokens live in `:root`.

```
--paper    #FAFAFB   page background
--card     #FFFFFF   raised surfaces
--ink      #0B0E14   primary text, and the banner background
--ink-soft #59626F   secondary text
--rule     #E3E6EB   hairlines
--blue     #1B4FE0   accent
--blue-lit #5B84FF   accent on dark
--amber    #7E5B0C   "in build" badges
```

IBM Plex Sans for text, IBM Plex Mono for numerals, labels and slot
placeholders. Any real figure must use `class="num"` or sit inside a mono
element so tabular figures line up.

Two dark moments only, the banner and the early access block, with the session
panel as a third inside an otherwise light page. Everything else stays quiet.

Mobile is a priority. Single column by default, widening at 600, 640, 720, 900,
960 and 1000px. Verified at 390px wide with no horizontal overflow.

Motion: sections fade up on scroll, the session panel plays its bars once. Both
respect `prefers-reduced-motion`.

## Open questions

1. **Names for the six features.** Top of the list. Nine slots waiting.
2. Names for the three pricing tiers. "Paid" read as unfinished, so it is gone.
3. Price points.
4. Waitlist or live sign up at launch. Built as a waitlist.
5. Live embedded demo, or captured output, for feature 01.

## Next tasks

1. Fill the nine name slots.
2. Get the captured payloads and fill the seven figure slots.
3. Fill prices.
4. Wire the form.
5. Write privacy policy and terms, replace `hello@example.sg`.
6. Self host the fonts rather than loading Google Fonts.
7. Favicon and an Open Graph image.
8. Test on a real phone, not a resized desktop window.
