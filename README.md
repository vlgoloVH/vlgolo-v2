# vlgolo-v2

Portfolio redesign. Next.js App Router + TypeScript + Tailwind CSS v4. Dark theme only.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS v4 (CSS-first config, tokens in `app/globals.css`)
- Three.js — only for the hero fluid background (React Bits `LiquidEther`)
- Geist / Geist Mono via `next/font`

## Structure

```
app/          layout, page, global tokens
components/
  layout/     site header
  sections/   hero, hero background
  ui/         resume badge
  backgrounds/liquid-ether (vendored from React Bits)
lib/site.ts   all copy and nav in one place
```

## Local

```bash
npm install
npm run dev
```
