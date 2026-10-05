# Kraya AI — marketing website

Landing page for [Kraya AI](https://kraya-ai.com/), the WhatsApp-first AI sales automation platform.
Built with Next.js (App Router), Tailwind CSS v4, Framer Motion and Lucide icons.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

| Path | What it holds |
| --- | --- |
| `lib/content.ts` | **All copy and links.** Edit text here, not in components. |
| `app/page.tsx` | Section order. Reorder the components to reorder the page. |
| `app/globals.css` | Colour tokens (`brand`, `cream`, `ink`, `sun`, …) and the `.display` heading style. |
| `components/sections/` | One file per page section, plus the end-of-page pop-up. |
| `components/visuals/` | Product illustrations: hero dashboard, service-card scenes, growth chart, trial phone. |
| `components/ui/` | Buttons, lead form, phone frame, scroll reveal, count-up numbers, SVG clouds / stickers / laurel. |

## Visuals

The site uses no photos. Every visual is drawn in code (HTML, CSS and SVG), so it stays sharp at
any size and screen density, loads instantly, and shows the product instead of stock imagery. The
names and numbers inside the mock-ups (Rahul, Priya, lead counts) are illustrative sample data.

To use real photos later, add the files to `public/images/` and render them with `next/image` in
place of a visual.

## Page structure

The page follows the "customer as hero" sales story: what the customer wants (hero) → the problem
and how it feels → the fix (features, a live WhatsApp chat demo, how it works) → who it's for and
proof → a lead magnet for visitors who aren't ready yet (Lead Leak Calculator) → FAQ → trial form.

## Forms (Netlify Forms)

Three forms collect leads, all asking only for name and WhatsApp number:

| Form | Where | Extra data sent |
| --- | --- | --- |
| `trial` | "Try Kraya free" block (`#start-trial`) | — |
| `leak-report` | Lead Leak Calculator (`#calculator`) | The four slider values and the monthly loss |
| `end-popup` | Pop-up when the visitor reaches the end of the page | Optional `industry` |

The pop-up opens once, when the visitor scrolls past the footer. It stays closed for the rest of
the browser session once dismissed, and never opens for someone who has already sent any form
(tracked in `localStorage` under `kraya:lead-captured`).

Netlify detects forms from static HTML, so all three are declared in `public/__forms.html` and the
React forms in `components/ui/LeadForm.tsx` post to that file. Keep the field names in sync.
Submissions appear under **Forms** in the Netlify project. Turn on email notifications there so
nobody waits for a reply. Forms only work on Netlify; locally the submit shows the error message.

## Still to fill in

These are marked `TODO` in `lib/content.ts`:

- `TRIAL_URL` — every trial button opens the on-page trial form. If Kraya has a self-serve sign-up
  page, point this at it.
- `CALLBACK_PROMISE` and `popup.success` — the thank-you messages promise a WhatsApp reply
  "within one business hour". Change them to a time your team can actually keep.
- Footer social links, Privacy Policy and Terms. The Integrations and Blog nav links were removed
  until those pages exist.
- Check the claims before going live: the hero stats (3× response rate, 50% more efficient reps)
  and the "Personal Coach" case study (10x growth, 1200+ leads) came from the brief, not from
  published data. The 1,000+ businesses, ₹2,999/month and 14-day trial figures match Kraya's public
  announcements.
