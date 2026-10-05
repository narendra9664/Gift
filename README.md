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
| `hero.jpg` | [MAHXK-A2nLw](https://www.canva.com/M/MAHXK-A2nLw) | Hero, Analytics card, Approach step 02 |
| `cta-man.png` (transparent) | [MAHXK74aFn4](https://www.canva.com/M/MAHXK74aFn4) | CTA block, Smart Handoff card, Approach step 03, avatar |
| `card-qualification.jpg` | [MAHXK75Oxbk](https://www.canva.com/M/MAHXK75Oxbk) | AI Qualification card, case-study stack, avatar |
| `card-followups.jpg` | [MAHXK8xQj_I](https://www.canva.com/M/MAHXK8xQj_I) | Auto Follow-ups card, case study, Approach 01 / 04, avatar |
| `card-recovery.jpg` | [MAHXK9kWyG8](https://www.canva.com/M/MAHXK9kWyG8) | Lead Recovery card, case-study stack, avatar |

The Canva credit quota ran out after these five, so some slots reuse them with different crops.
To give a slot its own photo, add the file to `public/images/`, register it in `images` in
`lib/content.ts`, and point the slot's `shot` at it. Slots worth their own image:

- Smart Handoff and Analytics service cards
- Case-study main card (green-suit rep in a market) and the four Approach thumbnails
- The four avatars in the yellow pill (square head-and-shoulders portraits work best)

## Still to fill in

These are marked `TODO` in `lib/content.ts`:

- `EXPERT_SESSION_URL` — every "Book A FREE Expert Session" button points to the on-page CTA for now.
  Use the real booking link (Calendly, `https://wa.me/<number>`, …).
- Nav links for Pricing, Integrations and Blog, plus the footer social links, Privacy Policy and Terms.
- Check the claims before going live: the hero stats (3× response rate, 50% more efficient reps)
  and the "Personal Coach" case study (10x growth, 1200+ leads) came from the brief, not from
  published data. The 1,000+ businesses, ₹2,999/month and 14-day trial figures match Kraya's public
  announcements.
