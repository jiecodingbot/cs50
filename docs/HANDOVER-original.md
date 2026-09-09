# Handover: marketing site build

Written to move this work from a chat session into Claude Code. Read this
plus `WEBSITE-BRIEF.md` before touching anything.

---

## Current state

One file exists: `index.html`. Self contained, no build step, no
dependencies except Google Fonts loaded over CDN. Open it in a browser and
it works.

It is a first pass. Nothing is wired to a backend.

## Files you should have

| File | What it is |
|---|---|
| `index.html` | The site as built so far |
| `WEBSITE-BRIEF.md` | The original brief. Treat as the source of truth |
| `demo.html` | Not yet supplied. Real captured payloads from the product |
| `HANDOVER.md` | This file |

Suggested starting layout:

```
site/
  index.html
  HANDOVER.md
  docs/WEBSITE-BRIEF.md
  docs/demo.html        <- drop it here when you have it
```

---

## What the product is

A multi function service sold to licensed Singapore property agents, not to
home buyers. The product itself is a separate web app that already exists.
This repo is only the marketing site that sells it.

Five features. Only the first is live.

1. **Listing decks from government data.** Live. Agent types an address, the
   product pulls URA, HDB, MOE, LTA and OneMap, returns eight sections:
   property details, market prices, costs and financing, schools, transport,
   amenities, area outlook, sources and gaps.
2. **Tracked deck links.** In progress. Per client, revocable, always current
   data, with per section engagement visible to the agent.
3. **Newsbot.** In progress.
4. **Room redesign.** In progress.
5. **Branded agent site with booking.** In progress, Max tier only.

The differentiator is traceability. Every number carries its sample size and
anything unknown is named rather than hidden. A median from 2 sales is
labelled as 2 sales.

---

## Page structure as built

```
nav (sticky)
hero              headline, subline, two CTAs, sources strip
#tracked          TRACKED DECK LINKS  <- lead section, deliberately first
#deck             listing decks, eight section outline with figure slots
#building         newsbot / room redesign / branded site
#pricing          three tiers, prices as placeholder slots
#waitlist         form, no handler attached
footer            contact, privacy policy, terms
```

### Why tracked links comes before the deck

Client instruction. It is the section that makes an agent want the product,
so it runs immediately after the hero even though listing decks is the
feature that actually ships today. It carries an "In progress" badge to stay
honest about that.

The narrative it tells, and the thing not to dilute in edits: the agent
assumed the school section would sell the house because the buyer has young
children. The tracked link shows the buyer opened costs and financing eleven
times, spent 14 of 19 minutes there, forwarded it twice, and never went back
to schools. So she stops guessing and opens Monday's call with financing.

The dark panel animates those bars in on scroll, or on click of "Play the
session". Reduced motion shows the end state immediately.

---

## Hard constraints

These come from the brief. Breaking any of them is a real problem, not a
style preference.

- **Never invent property data.** No fake medians, prices, school distances,
  transaction counts. The product's whole promise is accurate sourced
  numbers, so fabricated ones on the marketing site are the single most
  damaging mistake available. Every numeric slot in the deck section is
  currently a dashed placeholder waiting for `demo.html`.
- **No em dashes anywhere in copy.** Check before every commit.
- **Do not overclaim.** No "AI powered valuations", no "instant property
  valuation". The product deliberately does not estimate values.
- **Do not imply unbuilt features ship today.** Badges must stay accurate.
- **No real agent names, photos or client data** in any mockup.
- **Do not scrape or embed listing content** from PropertyGuru, 99.co,
  EdgeProp or similar. The position rests on clean licensing of government
  open data.
- **No stock photography** of generic office people.

The engagement numbers in the tracked links panel are client behaviour, not
property data, and are labelled on the page as an illustrative session. Keep
that label if you keep those numbers.

---

## Design system as implemented

Tokens live in `:root` at the top of `index.html`.

```
--paper    #F4F5F7   cool grey page background
--card     #FFFFFF   raised surfaces
--ink      #11151C   primary text
--ink-soft #59626F   secondary text
--rule     #D9DDE3   hairlines
--blue     #1B4FE0   accent, product blue
--dark     #0D1016   the tracked links panel only
--amber    #8A6410   "in progress" badges
```

Type is IBM Plex Sans for everything and IBM Plex Mono for numerals, labels
and slot placeholders. Any real figure must use `class="num"` or sit inside a
mono element so tabular figures line up.

Intent: the product is a dark dense data workspace. The marketing site is a
light document that clearly belongs to the same family. Restrained,
typographic, numbers treated as the hero. One bold moment only, the dark
session playback panel. Everything around it stays quiet.

Copy voice: professional, plain, confident, and active. Lead the reader.
"Stop guessing what your buyer actually wants", not "you can see what your
clients are looking at". No growth hack language.

Mobile is a priority, agents are on phones between viewings. Layout is single
column by default and widens at 620, 720, 760 and 860px.

---

## Open questions, unanswered

1. Waitlist or live sign up at launch? Built as a waitlist.
2. Are price points decided? All three show a placeholder slot.
3. Is "Basis" acceptable as a name, or is a name and logo already locked?
   The wordmark is a text placeholder, easy to swap.
4. Is "Paid" the real middle tier name? It reads as unfinished on a live site.
5. Live embedded demo, or captured screenshots?

---

## Next tasks, roughly in order

1. **Get `demo.html` and fill the figure slots.** Search `index.html` for
   `slot-fig` and `awaiting captured payload`. Eight of them. Replace with
   real captured values, keeping sample sizes visible.
2. Decide live demo versus captured output. If live, the deck section should
   become a real deck an agent can click through rather than an outline.
3. Fill in prices. Search for `price slot`.
4. Confirm the name, replace the wordmark and the `<title>`.
5. Wire the waitlist form. Currently `preventDefault` with a note. Search
   `waitlistForm`.
6. Write the privacy policy and terms, then replace `/privacy` and `/terms`.
   Privacy matters more than usual here because the product handles agents'
   client contact data. Same for the placeholder `hello@example.sg`.
7. Self host the fonts rather than loading Google Fonts, for speed and for
   privacy consistency with the above.
8. Add favicon, Open Graph tags, and a sensible meta description.
9. Test on a real phone. Not a resized desktop window.

## Not done yet

- No accessibility audit beyond visible focus rings, reduced motion support
  and reasonable contrast
- No analytics
- No responsive images, because there are no images
- No CI, no linting, no build step, and probably none needed at this size

---

## Competitive note

haio.sg is a free consumer portal doing instant valuations and transaction
lookups. Not a competitor. They sell a buyer a number. This product sells an
agent the workings behind the number, in a document carrying her name and CEA
registration number. If the site starts reading like a property portal, it
has gone wrong.
