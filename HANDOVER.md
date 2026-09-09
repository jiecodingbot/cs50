# BASIS marketing site

One file, `index.html`. Self contained, no build step, no dependencies except
Google Fonts over CDN. Open it in a browser and it works.

`docs/HANDOVER-original.md` is the handover written before this rebuild. Read it
for product background. Its hard constraints still hold.

---

## The five

Names are set. Each one is a plain word, and the line under it expands the word
rather than restating the feature.

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

## Design

Minimalist and monochrome. No accent colour anywhere.

```
--paper    #F2F1ED   bone
--ink      #101010   text
--ink-deep #0A0A0A   banner and closing block
--muted    #6F6D68   secondary text
--faint    #78766F   mono labels
--rule     #DCDAD4   hairlines
```

Instrument Sans for everything, IBM Plex Mono for labels, indices and counts.

The page is built from hairlines and whitespace. No cards, no shadows, no
borders around anything. Hierarchy comes from scale: feature names run up to
10.5rem in uppercase, section headings sit at about a third of that, and
everything else is one body size.

Two dark fields only, the banner and the closing block, with the whole middle of
the page in bone. Motion is a fade up on scroll and one bar animation in the
Interest readout. Both respect `prefers-reduced-motion`.

Verified at 390px and 1440px with no horizontal overflow.

## Page structure

```
nav          fixed, dark over the banner, bone once past it
.banner      hook copy, headline left, hook right, sources strip
#what        what we do, three tenets
#index       the five entries, 01 to 05
#pricing     three tiers
#access      dark, form with no handler
footer
```

## Open slots

| Search for | Count | What it is |
|---|---|---|
| `data-slot` | 2 | tier 02 and tier 03 names |
| `Price pending` | 2 | tier 02 and tier 03 prices |
| `class="fig"` | 7 | figure slots in the Details section, empty until filled |
| `hello@example.sg` | 2 | contact address |
| `/privacy`, `/terms` | 2 | legal pages, not written |
| `waitlistForm` | 1 | form has no handler, it calls preventDefault |

A figure slot is an empty span that stays invisible until it holds something:

```html
<span class="fig"></span>
```

`.fig:empty{display:none}` does the hiding, so dropping a real captured value in
is the whole job. Nothing invented sits on the page in the meantime.

Tier names look like this and lose the attribute when a real name goes in:

```html
<h3 data-slot>Name pending</h3>
```

## Hard constraints, still in force

- **Never invent property data.** The Details section lists section names only.
  Figures appear when there are real captured ones to show.
- **No em dashes anywhere in copy.** `grep -c "—" index.html` must return 0.
- **Do not overclaim.** No valuations, no estimates. BASIS does not price a
  listing.
- **Labels must stay accurate.** Details says "Available now". The other four
  say "In build". Do not promote one before it opens.
- **No real agent names, photos or client data.** The Interest readout is
  labelled as an illustrative session. Keep that label.
- **No stock photography.** There are no images on this page at all.

## Next tasks

1. Tier 02 and tier 03 names, and all prices.
2. Captured payloads into the seven figure slots.
3. Wire the form.
4. Privacy policy and terms, and a real contact address.
5. Self host the fonts rather than loading Google Fonts.
6. Favicon and an Open Graph image.
7. Test on a real phone, not a resized desktop window.
