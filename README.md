# Insurance SEO Site

Astro website for daily Thai insurance SEO articles.

## Local

```powershell
npm.cmd install
npm.cmd run dev
```

## Cloudflare Pages

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `insurance-seo-site`

## Daily Article Flow

Put new Markdown articles in `src/content/blog`.
Use frontmatter fields from the sample article:

```yaml
title:
description:
publishDate:
updatedDate:
heroImage:
heroAlt:
category:
tags:
faq:
```

Images can start as Google Drive references in the article package, then later be compressed into `public/images` when publishing.
