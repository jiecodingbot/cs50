# BASIS marketing site

A static four page site. No build step and no dependencies except Google Fonts
over CDN. Open `index.html` in a browser and the whole thing works, including
the workflow animations.

`docs/HANDOVER-original.md` is the handover written before this rebuild. Read it
for product background. Its hard constraints still hold.

---

## Files

```
index.html        home. Hook, what we do, the five in brief, link to workflow
features.html     the five in full, one anchored section each
workflow.html     side by side comparison, five animated pairs
pricing.html      three tiers, two names and all prices still open
assets/basis.css  the entire design system, shared by all four pages
assets/basis.js   nav, scroll reveals, the session readout, the form
docs/             the original handover
```

Every page carries the same nav, the same early access block and the same
footer. Change one of those and you change it in four files, which is the price
of having no build step. It is the right trade at this size.

## The five

| # | Name | What it is | State |
|---|---|---|---|
| 01 | Details | Decks built from an address, eight sections | Available now |
| 02 | Interest | Links that show what a client actually reads | In build |
| 03 | Retention | News sorted by which of your clients it hits | In build |
| 04 | Vision | Empty rooms furnished, and units in 3D | In build |
| 05 | Order | Your own site, taking bookings | In build |

Vision merges what used to be two features. Furnished rooms and 3D units sell
the same thing, which is a buyer seeing the place before they stand in it.

Order carries both meanings deliberately: bookings taken, and a week that
arranges itself.

## The workflow page

Five pairs. Left pane is the work as it happens now, right pane is the same work
with BASIS in it. Both panes of a pair run on the same nine second loop, so the
contrast is legible without a caption.

The loops are **CSS animations, not recordings of the product**. They are
diagrams and each page says so. They were built this way on purpose:

- a real screen recording of a product that is four fifths unbuilt would be
  fiction, and this site does not ship fiction
- they carry no property data, which keeps the first hard constraint intact
- they are a few kilobytes of CSS rather than megabytes of video, they stay
  sharp at any size, and they follow the theme

**To swap in real capture later**, replace the contents of a `.stage` element
with a `<video autoplay muted loop playsinline>` or an image. Nothing else
depends on the stage internals. Keep the aspect ratio at 16/10 so the two panes
stay the same height.

Animations only run while a pair is on screen, and stop entirely under
`prefers-reduced-motion`, where every loop shows its end state instead.

## Design

Minimalist and monochrome. No accent colour anywhere.

```
--paper    #F2F1ED   bone
--ink      #101010   text
--ink-deep #0A0A0A   mastheads, early access block, footer
--muted    #6F6D68   secondary text
--faint    #78766F   mono labels
--rule     #DCDAD4   hairlines
```

Instrument Sans for everything, IBM Plex Mono for labels, indices and counts.

Built from hairlines and whitespace. No cards, no shadows, no borders around
content. Hierarchy comes from scale: feature names run up to 10.5rem in
uppercase, section headings sit at about a third of that, everything else is one
body size.

Every page opens on a dark masthead and the nav flips from dark to bone once you
scroll past it. Verified at 390px and 1440px with no horizontal overflow.

## Open slots

| Search for | Where | What it is |
|---|---|---|
| `data-slot` | pricing.html | tier 02 and tier 03 names |
| `Price pending` | pricing.html | tier 02 and tier 03 prices |
| `class="fig"` | features.html | 7 figure slots, empty until filled |
| `hello@example.sg` | all four | contact address |
| `/privacy`, `/terms` | all four | legal pages, not written |
| `waitlistForm` | assets/basis.js | the form calls preventDefault |

A figure slot is an empty span that stays invisible until it holds something:

```html
<span class="fig"></span>
```

`.fig:empty{display:none}` does the hiding, so dropping a real captured value in
is the whole job. Nothing invented sits on the page in the meantime.

## Hard constraints, still in force

- **Never invent property data.** Details lists section names only. Figures
  appear when there are real captured ones. The workflow loops are abstract.
- **No em dashes anywhere in copy.** `grep -c "—" *.html` must return 0 for all.
- **Do not overclaim.** No valuations, no estimates. BASIS does not price a
  listing. No time saved figures anywhere, because none have been measured.
- **Labels must stay accurate.** Details says "Available now". The other four say
  "In build". Do not promote one before it opens.
- **No real agent names, photos or client data.** The Interest readout is
  labelled as an illustrative session. Keep that label.
- **No photography.** There are no images on this site at all.

## Next tasks

1. Tier 02 and tier 03 names, and all prices.
2. Captured payloads into the seven figure slots on features.html.
3. Wire the form.
4. Privacy policy and terms, and a real contact address.
5. Self host the fonts rather than loading Google Fonts.
6. Favicon and an Open Graph image.
7. Test on a real phone, not a resized desktop window.
