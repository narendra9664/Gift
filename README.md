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
| `lib/content.ts` | **All copy, links and the image manifest.** Edit text here, not in components. |
| `app/page.tsx` | Section order. Reorder the components to reorder the page. |
| `app/globals.css` | Colour tokens (`brand`, `cream`, `ink`, `sun`, …) and the `.display` heading style. |
| `components/sections/` | One file per page section. |
| `components/ui/` | Buttons, photo slots, scroll reveal, count-up numbers, SVG clouds / stickers / laurel. |

## Images — replace the previews before launch

The photos were generated in Canva. The files in `public/images/` are **low-resolution previews**
(upscaled thumbnails), so they look soft. Open each link below, download the full-size image from
Canva, and save it over the file with the same name. No code changes are needed.

| File | Canva image | Used in |
| --- | --- | --- |
| `hero.jpg` | [MAHXK-A2nLw](https://www.canva.com/M/MAHXK-A2nLw) | Hero, Analytics card |
| `cta-man.png` (transparent) | [MAHXK74aFn4](https://www.canva.com/M/MAHXK74aFn4) | Trial block, Smart Handoff card, avatar |
| `card-qualification.jpg` | [MAHXK75Oxbk](https://www.canva.com/M/MAHXK75Oxbk) | AI Qualification card, case-study stack, avatar |
| `card-followups.jpg` | [MAHXK8xQj_I](https://www.canva.com/M/MAHXK8xQj_I) | Auto Follow-ups card, case study, avatar |
| `card-recovery.jpg` | [MAHXK9kWyG8](https://www.canva.com/M/MAHXK9kWyG8) | Lead Recovery card, case-study stack, avatar |

The Canva credit quota ran out after these five, so some slots reuse them with different crops.
To give a slot its own photo, add the file to `public/images/`, register it in `images` in
`lib/content.ts`, and point the slot's `shot` at it. Slots worth their own image:

- Smart Handoff and Analytics service cards
- Case-study main card (green-suit rep in a market)
- The four avatars in the yellow pill (square head-and-shoulders portraits work best)

## Page structure

The page follows the "customer as hero" sales story: what the customer wants (hero) → the problem
and how it feels → the fix (features, a live WhatsApp chat demo, how it works) → who it's for and
proof → a lead magnet for visitors who aren't ready yet (Lead Leak Calculator) → FAQ → trial form.

## Forms (Netlify Forms)

Two forms collect leads, both asking only for name and WhatsApp number:

| Form | Where | Extra data sent |
| --- | --- | --- |
| `trial` | "Try Kraya free" block (`#start-trial`) | — |
| `leak-report` | Lead Leak Calculator (`#calculator`) | The four slider values and the monthly loss |

Netlify detects forms from static HTML, so both are declared in `public/__forms.html` and the React
forms in `components/ui/LeadForm.tsx` post to that file. Keep the field names in sync.
Submissions appear under **Forms** in the Netlify project. Turn on email notifications there so
nobody waits for a reply. Forms only work on Netlify; locally the submit shows the error message.

## Still to fill in

These are marked `TODO` in `lib/content.ts`:

- `TRIAL_URL` — every trial button opens the on-page trial form. If Kraya has a self-serve sign-up
  page, point this at it.
- `CALLBACK_PROMISE` — the thank-you message promises a WhatsApp reply "within one business hour".
  Change it to a time your team can actually keep.
- Footer social links, Privacy Policy and Terms. The Integrations and Blog nav links were removed
  until those pages exist.
- Check the claims before going live: the hero stats (3× response rate, 50% more efficient reps)
  and the "Personal Coach" case study (10x growth, 1200+ leads) came from the brief, not from
  published data. The 1,000+ businesses, ₹2,999/month and 14-day trial figures match Kraya's public
  announcements.
