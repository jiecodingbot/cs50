# BASIS marketing site

**One file.** `index.html`. Everything is in it: markup, styles, behaviour, all
five feature write ups, the workflow comparison and its animations. No build
step, no folders, no dependencies except Google Fonts over CDN.

Double click it and the whole site runs.

`docs/HANDOVER-original.md` is the handover written before this rebuild. Read it
for product background. Its hard constraints still hold.

---

## How one file behaves like four pages

The site has four screens. They are four `<section class="view">` blocks inside
the one file, and a small router at the bottom shows one at a time based on the
URL hash.

| Link | Shows |
|---|---|
| `#home` | Hook, what we do, the five in one line each |
| `#five` | The five written out in full |
| `#workflow` | Five side by side comparisons, animated |
| `#pricing` | Three tiers |
| `#five/interest` | The five, scrolled to that entry |

The early access block sits outside the views, so it is at the foot of every
screen and `#access` works from anywhere.

Deep links work. `index.html#workflow` opens straight onto the workflow screen,
and the browser back button moves between screens.

**To add a screen:** add a `<section class="view" id="view-yourname">`, add
`'yourname'` to the `VIEWS` array in the router, and add a nav link with
`data-view="yourname"`. That is the whole job.

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

## The workflow screen

Five pairs. Left pane is the work as it happens now, right pane is the same work
with BASIS in it. Both panes of a pair run the same nine second loop, so the
contrast reads without a caption.

The loops are **CSS animations, not recordings of the product.** They are
diagrams and the page says so. Built that way on purpose:

- a recording of a product that is four fifths unbuilt would be fiction, and
  this site does not ship fiction
- they carry no property data, which keeps the first hard constraint intact
- a few kilobytes of CSS rather than megabytes of video, sharp at any size

**To swap in real capture later,** replace the contents of a `.stage` element
with a `<video autoplay muted loop playsinline>` or an image. Nothing else
depends on the stage internals. Keep the 16/10 ratio so the two panes stay level.

Loops run only while a pair is on screen, and stop entirely under
`prefers-reduced-motion`, which shows each loop's end state instead.

## Design

Card led and monochrome, closer to a modern product store than to a document.
No accent colour anywhere.

```
--paper     #F2F1ED   bone page
--surface   #FFFFFF   cards
--surface-2 #E9E8E3   artwork panels inside cards
--ink       #0E0E0E   text
--ink-deep  #0A0A0A   hero, mastheads, early access, footer
--muted     #6B6963   secondary text
--rule      #DCDAD4   hairlines
```

Instrument Sans for everything, IBM Plex Mono for small labels and counts.

The home screen is a hook and nothing more: one headline, one line, two buttons,
five icon tiles, then a card grid. Each card is a link into that feature's full
write up on `#five`. All the long copy lives behind those clicks, deliberately.

**Artwork.** Every card, every feature detail and every workflow pane carries a
drawn SVG illustration. They are line drawings in the brand palette, built from
the same shapes the product actually produces. There are no photographs and no
stock imagery anywhere.

**Icons** live once as `<symbol>` elements at the top of the body and are
referenced with `<use href="#i-details">`. Add an icon by adding a symbol.

Every screen opens dark and the nav flips from dark to bone once you scroll past
it. Verified at 390px and 1440px with no horizontal overflow.

### Swapping in real product images

The illustrations are placeholders in the sense that a real screenshot would sell
harder. Three places are worth replacing once there is product to photograph:

| Where | What to send |
|---|---|
| Details card and detail artwork | A real deck, eight sections, with figures showing |
| Interest artwork | The real engagement view for one client |
| Vision artwork | One empty room and the same room furnished, side by side |

To swap: replace the `<svg>` inside `.card-art`, `.panel-art` or `.stage` with an
`<img>` or `<video autoplay muted loop playsinline>`. The containers already hold
their aspect ratio, so nothing else needs to change. Keep any real screenshot
free of a real client's name and free of figures that are not genuinely sourced.

## Open slots

Search `index.html` for these.

| Search for | Count | What it is |
|---|---|---|
| `data-slot` | 2 | tier 02 and tier 03 names |
| `Price pending` | 2 | tier 02 and tier 03 prices |
| `class="fig"` | 7 | figure slots in Details, empty until filled |
| `hello@example.sg` | 2 | contact address |
| `/privacy`, `/terms` | 2 | legal pages, not written |
| `waitlistForm` | 1 | the form calls preventDefault |

A figure slot is an empty span that stays invisible until it holds something:

```html
<span class="fig"></span>
```

`.fig:empty{display:none}` does the hiding, so dropping a real captured value in
is the whole job. Nothing invented sits on the page in the meantime.

## Hard constraints, still in force

- **Never invent property data.** Details lists section names only. Figures
  appear when there are real captured ones. The workflow loops are abstract.
- **No em dashes anywhere in copy.** `grep -c "—" index.html` must return 0.
- **Do not overclaim.** No valuations, no estimates. BASIS does not price a
  listing. No time saved figures anywhere, because none have been measured.
- **Labels must stay accurate.** Details says "Available now". The other four say
  "In build". Do not promote one before it opens.
- **No real agent names, photos or client data.** The Interest readout is
  labelled as an illustrative session. Keep that label.
- **No photography.** There are no images in this file at all.

## Next tasks

1. Tier 02 and tier 03 names, and all prices.
2. Captured payloads into the seven figure slots.
3. Wire the form.
4. Privacy policy and terms, and a real contact address.
5. Self host the fonts rather than loading Google Fonts. That would add a folder,
   which is the one good reason to stop being a single file.
6. Favicon and an Open Graph image.
7. Test on a real phone, not a resized desktop window.
