# vlgolo-v2

Portfolio redesign. Next.js App Router + TypeScript + Tailwind CSS v4. Dark theme only.

## Stack

- Next.js 15 (App Router), React 19
- Tailwind CSS v4 — config lives in CSS (`app/globals.css`), there is no `tailwind.config.ts`
- Inter Variable, self-hosted via `@fontsource-variable/inter` (no external font requests)
- No animation library: the hero choreography is CSS keyframes

## Structure

```
app/
  globals.css      design tokens, glass utility, entrance keyframes
  layout.tsx       fonts, metadata, header + social rail
  page.tsx         home
components/
  layout/          site-header, social-rail
  sections/        hero, hero-video
lib/site.ts        all copy, nav and asset paths in one place
public/hero/       hero.webm, hero.mp4, hero-poster.jpg
```

## Hero

Looping background video with a three-layer vignette so the footage has no
visible edges, two vertical rules that drop in from the top, and a glass CV
button. The entrance sequence is timed from two variables in `globals.css`
(`--enter-start`, `--enter-step`) — change those to retime the whole thing.

Video is encoded twice: WebM (VP9) for browsers that take it, MP4 (H.264) as
the fallback. Poster shows while it loads and replaces the video entirely under
`prefers-reduced-motion`.

## Local

```bash
npm install
npm run dev
```

## Re-encoding the hero video

```bash
ffmpeg -i source.mp4 -an -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p \
  -movflags +faststart public/hero/hero.mp4
ffmpeg -i source.mp4 -an -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 \
  -pix_fmt yuv420p public/hero/hero.webm
ffmpeg -i source.mp4 -frames:v 1 -vf scale=1600:-1 -q:v 4 public/hero/hero-poster.jpg
```
