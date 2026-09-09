# BASIS marketing site. Handover.

Written to hand this project to whoever picks it up next, working in any editor
or with any assistant. It assumes no knowledge of how it was built. Read this
once end to end before changing anything.

---

## 1. What you have

**One file.** `index.html`, about 1,400 lines and 80 KB. Markup, styles,
behaviour, every illustration and all four screens are inside it.

No build step. No package manager. No folders. No dependencies except two
Google Fonts loaded over CDN. Double click the file and the whole site runs,
animations included. Edit it in any text editor and refresh the browser.

```
index.html                  the entire site
HANDOVER.md                 this document
docs/HANDOVER-original.md   the handover from before the rebuild, kept for
                            product background only. Its file layout and page
                            structure are out of date. Its constraints are not.
```

Repository: `github.com/jiecodingbot/cs50`
Branch: `claude/basis-website-redesign-prqi7d`
No pull request has been opened. Nothing is deployed anywhere yet.

### To publish it

It is a static file, so anything that serves static files will do. Netlify
drop, Cloudflare Pages, GitHub Pages, or an S3 bucket. Upload `index.html` as
the site root. There is nothing to configure.

---

## 2. What the product is

BASIS is a service sold to **licensed property agents in Singapore**, not to
home buyers. The product itself is a separate web app. This file is only the
marketing site that sells it.

Five features. **One is live. Four are in build.**

| # | Name | What it does | State |
|---|---|---|---|
| 01 | Details | Type an address, get eight sourced sections | **Available now** |
| 02 | Interest | Send the deck as a link, see what the client actually reads | In build |
| 03 | Retention | Daily news and official record, sorted by which clients it hits | In build |
| 04 | Vision | Empty rooms furnished in the photo, and units walkable in 3D | In build |
| 05 | Order | A site under the agent's name that takes bookings | In build |

The eight sections in Details: property details, market prices, costs and
financing, schools, transport, amenities, area outlook, sources and gaps.
Data comes from URA, HDB, MOE, LTA and OneMap.

**The differentiator is traceability.** Every figure carries its sample size,
and anything that cannot be sourced is named as missing rather than estimated.
A median built from two transactions says two transactions, on the slide, in
front of the client. The product deliberately does not price or value a listing.

### Where the names came from

The client chose them. Each is a plain English word and each carries a line on
the site that expands the word rather than restating the feature. "Order" is
deliberate wordplay: bookings taken, and a week that arranges itself. "Vision"
merges what were originally two separate features, furnished rooms and 3D units,
because both sell the same thing, which is a buyer seeing the place before they
stand in it.

Do not rename these without asking. They were decided after a round of
alternatives was rejected.

---

## 3. How the file is organised

Read it top to bottom and it goes: `<head>` and fonts, one `<style>` block, a
hidden `<svg>` of icon symbols, the nav, four `<section class="view">` blocks,
the early access block, the footer, then one `<script>`.

### Four screens, one file

The site behaves like four pages. They are four sibling sections and a small
hash router at the bottom of the script shows one at a time.

| URL | Screen |
|---|---|
| `index.html` or `#home` | Hook, icon tiles, card grid, workflow promo |
| `#five` | All five features written out in full |
| `#workflow` | Five side by side comparisons, animated |
| `#pricing` | Three tiers |
| `#five/interest` | The five screen, scrolled to that feature |

Deep links work. The browser back button moves between screens. The early
access block sits outside the views, so it ends every screen and `#access`
works from anywhere.

**To add a screen:** add a `<section class="view" id="view-yourname">`, add
`'yourname'` to the `VIEWS` array in the router, and add a nav link carrying
`data-view="yourname"`. That is the whole job.

### The script does four things

1. **Nav colour.** Flips from dark to bone once you scroll past the dark hero
   or masthead of whichever screen is showing.
2. **Scroll reveals.** Anything with class `rv` fades up when it enters view.
3. **Workflow loops.** Adds class `live` to a `.compare` block while it is on
   screen, which is what starts its animations. Off screen they are paused, so
   the page is not animating things nobody is looking at.
4. **The session readout** on the Interest feature, and the early access form,
   which currently only calls `preventDefault`.

All of it degrades correctly with `prefers-reduced-motion`: reveals are
instant, loops do not run, and every animation shows its end state.

---

## 4. Design

Card led and monochrome. Closer to a modern product store than to a document.
There is no accent colour anywhere, on purpose. Hierarchy comes from scale,
weight and surface, not from hue.

```
--paper     #F2F1ED   bone page background
--surface   #FFFFFF   cards
--surface-2 #E9E8E3   artwork panels inside cards
--surface-3 #DEDCD6   inactive bars and cells
--ink       #0E0E0E   text
--ink-deep  #0A0A0A   hero, mastheads, early access, footer
--muted     #6B6963   secondary text
--faint     #8A8781   small mono labels
--rule      #DCDAD4   hairlines
```

Type is **Instrument Sans** for everything and **IBM Plex Mono** for small
labels, indices and counts. Radii are 12, 20 and 28px. Buttons are pills.

### The rule the home screen follows

The home screen is a hook and nothing more. One headline, one line, two
buttons, five icon tiles, then a grid of five cards. Every card is a link into
that feature's full write up. **All the long copy lives behind a click, and it
should stay that way.** An earlier version put everything on the home page and
it read as a wall of text.

Related: nothing on this site uses a two column layout where one column is a
short label and the other is content. That produced a dead column of whitespace
down the middle of every section. Feature details now run headline, then a two
column text block, then full width artwork.

### Artwork and icons

Every card, every feature detail and every workflow pane carries a drawn SVG
illustration, 27 in total. They are line drawings in the brand palette, built
from the shapes the product actually outputs. There are no photographs and no
stock imagery anywhere on the site.

Icons are defined once as six `<symbol>` elements in a hidden `<svg>` near the
top of the body, and referenced with `<use href="#i-details">`. Add an icon by
adding a symbol.

Mobile is a priority, since agents are on phones between viewings. Verified at
390px and 1440px with no horizontal overflow. The icon tile row scrolls
horizontally on narrow screens.

---

## 5. The workflow screen

Five pairs. Left pane is the work as it happens now, right pane is the same
work with BASIS in it. Both panes of a pair run the same nine second loop, so
the contrast reads without a caption.

| Pair | Left | Right |
|---|---|---|
| Details | Eight sources arriving one at a time | One address typed, eight sections at once |
| Interest | A guess box jumping between sections | Bars resolving, one clearly dominant |
| Retention | The book fading out over six months | An announcement pulsing, three groups drafted |
| Vision | Empty room, blinking question mark | Furniture drawing itself in, room tilting |
| Order | Missed calls stacking up | Slots booking themselves |

**These are CSS animations, not recordings of the product.** That was a
deliberate call. Four of the five features are still in build, so a screen
recording of them would have to be fabricated, and fabrication is the one thing
this positioning cannot survive. The loops are abstract, carry no property data,
and the page says what they are.

They are also a few kilobytes of CSS rather than megabytes of video, stay sharp
at any size, and follow the theme.

**How the loops work,** if you need to change one. Each `.compare` block gets
class `live` while visible. Animations are all on a 9s cycle so the two panes
stay in step. The main trick is a stepped `clip-path` reveal: a list is clipped
from the bottom and the clip animates to zero with a `steps(n)` timing function,
which reveals one row at a time. Class `a-rv` is the slow version and
`a-rv-fast` the quick one, and `s8` / `s6` / `s4` / `s3` set the step count to
match the number of rows.

---

## 6. Hard constraints

These are not style preferences. Breaking any of them is a real problem.

- **Never invent property data.** No fake medians, prices, school distances or
  transaction counts. The product's entire promise is sourced numbers, so
  fabricated ones on the marketing site are the single most damaging mistake
  available. Details lists section names only; figure slots stay empty until
  there is a real captured number.
- **No em dashes anywhere in copy.** Check before every commit:
  `grep -c "—" index.html` must return 0.
- **Do not overclaim.** No valuations, no estimates, no "AI powered" anything.
  BASIS does not price a listing. There are no time saved figures on the site
  because none have been measured.
- **Labels must stay accurate.** Details says "Available now". The other four
  say "In build" in every place they appear: the cards, the feature details, the
  workflow pairs. Do not promote a label before the feature actually opens.
- **No real agent names, photos or client data.** The Interest readout numbers
  are client behaviour, not property data, and the page labels that session as
  illustrative. Keep that label if you keep those numbers.
- **Do not scrape or embed listing content** from PropertyGuru, 99.co, EdgeProp
  or similar. The position rests on clean licensing of government open data.
- **No stock photography**, especially not generic office people.

Voice: professional, plain, confident, active. Lead the reader. "Stop guessing
what your buyer actually wants", not "you can see what your clients are looking
at". No growth hack language.

Competitive note: haio.sg is a free consumer portal doing instant valuations.
Not a competitor. They sell a buyer a number. BASIS sells an agent the workings
behind the number, in a document carrying her name and CEA registration number.
**If the site starts reading like a property portal, it has gone wrong.**

---

## 7. Everything still open

Search `index.html` for the strings in the middle column.

| # | Search for | Count | What it is |
|---|---|---|---|
| 1 | `data-slot` | 2 | Tier 02 and tier 03 names, both read "Name pending" |
| 2 | `Price pending` | 2 | Tier 02 and tier 03 prices |
| 3 | `class="fig"` | 7 | Figure slots in the Details section |
| 4 | `hello@example.sg` | 2 | Placeholder contact address |
| 5 | `/privacy` and `/terms` | 2 | Legal pages, not written, links go nowhere |
| 6 | `waitlistForm` | 1 | The early access form has no handler |

### 1 and 2. Pricing

Tier 01 is "Free", which is factual, so it stayed. Tiers 02 and 03 have no
names and no prices. A tier name looks like this and loses the attribute when a
real name goes in:

```html
<h3 data-slot>Name pending</h3>
```

For reference, a naming set was proposed and not taken up: Free / Agent /
Principal. Avoid Solo / Team / Firm unless multiple seats are actually sold,
because those names promise something the product does not do.

### 3. Figure slots

A figure slot is an empty span that stays invisible until it holds something:

```html
<span class="fig"></span>
```

`.fig:empty{display:none}` does the hiding, so dropping a real captured value
in is the whole job, and nothing invented sits on the page in the meantime.
These want real values from the product's captured output, with sample sizes
visible.

### 6. The form

Four fields: name, work email, agency, CEA registration number. It currently
calls `preventDefault` and swaps a note. Point it at a form service or a
backend endpoint. **Privacy matters more than usual here**, because the product
handles agents' client contact data, which is also why self hosting the fonts
rather than calling Google on page load is worth doing.

---

## 8. Product images to get

The illustrations are good enough to ship, but a real screenshot would sell
harder. Three places, in priority order:

1. **Details** card and detail artwork. A real deck, eight sections, figures
   showing. This is the one that matters, because it is the feature that ships.
2. **Interest** artwork. The real engagement view for one client.
3. **Vision** artwork. One empty room and the same room furnished, side by side.

To swap one in, replace the `<svg>` inside `.card-art`, `.panel-art` or
`.stage` with an `<img>` or a `<video autoplay muted loop playsinline>`. The
containers already hold their aspect ratio, so nothing else changes.

Any real screenshot must carry no real client's name and no figure that is not
genuinely sourced.

---

## 9. Suggested order of work

1. Tier 02 and tier 03 names, and all three prices.
2. Wire the early access form. Nothing is being collected right now.
3. Privacy policy, terms, and a real contact address.
4. Real product images for Details, then Interest, then Vision.
5. The seven figure slots, once there is captured output to fill them.
6. Self host the fonts instead of loading Google Fonts. This adds a folder,
   which is the one good reason to stop being a single file.
7. Favicon and an Open Graph image. The OG title and description are already in
   the head; there is no image yet.
8. Test on a real phone, not a resized desktop window.
9. Accessibility pass. Focus rings, reduced motion and contrast were handled as
   the site was built, but nothing has been audited with a screen reader.

Not done and probably not needed at this size: analytics, responsive images
(there are no images), CI, linting, a build step.

---

## 10. How this got here

Useful context if you wonder why something is the way it is.

The site was rebuilt several times in one session. The path, briefly:

1. Renamed from a working title to **BASIS**, and the page title cut from a
   feature description down to the one word.
2. Feature names left as empty slots, then filled with the client's five:
   details, interest, retention, vision, order. Vision absorbed a sixth feature.
3. Redesigned monochrome and minimal, which was right, then split into four
   separate HTML files, which was wrong. It read as several different websites.
   Folded back into one file with a router.
4. Redesigned again against apple.com/sg/store as the reference: cards,
   artwork, icons, short copy, and the home page reduced to a hook. Two
   complaints drove that change and both are worth remembering. **A dead column
   of whitespace down the middle of every section**, caused by a label and
   content two column layout. And **too much text on the front page**, which is
   why every long passage now sits behind a click.

Commit history on the branch tells the same story in six commits.
