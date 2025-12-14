# Timber International - B2B Landing Page

A modern, Moooi-inspired B2B landing page for Timber International built with Sanity CMS and Next.js 15 (App Router).

**This is the business/industrial-oriented version of the TWG website, targeting B2B customers.**

## Live Site

- **Production**: https://timber-international.vercel.app (pending deployment)
- **Sanity Studio**: https://timber-international.sanity.studio (pending setup)

## Related Projects

- **Consumer-facing site**: [TWG Landing](https://github.com/wood-good/twg_landing) - https://twg-payload.vercel.app

## Features

- **Modern Stack**: Next.js 15 (App Router) + Sanity CMS
- **Headless CMS**: Sanity Studio for content management (no exposed /admin path)
- **Block-Based Architecture**: Flexible page composition with reusable content blocks
- **Moooi-Inspired Design**: Sophisticated, minimal aesthetic with smooth animations
- **6 Pages**: Home, About, Products, Manufacturing, Sustainability, Contact
- **Lucide Icons**: Dynamic icon system with 22+ icons for feature grids
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling with custom Moooi palette
- **Responsive**: Mobile-first design that works everywhere

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router, Turbopack) |
| CMS | Sanity CMS v3 |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Animation | Framer Motion |
| Deployment | Vercel |
| Language | TypeScript |

## Prerequisites

- Node.js 18+ and npm
- Sanity account (for content editing)

## Quick Start

### 1. Install Dependencies

```bash
cd timber-international
npm install
```

### 2. Set Up Environment

Create `.env.local` file:

```env
# Sanity CMS (Update with your new Sanity project)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_USE_SANITY=true

# Optional: For content migration scripts
SANITY_API_WRITE_TOKEN=your-write-token
```

### 3. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Project Structure

```
timber-international/
├── app/
│   ├── (frontend)/              # Public-facing pages
│   │   ├── page.tsx             # Home page
│   │   ├── about/page.tsx
│   │   ├── products/page.tsx
│   │   ├── manufacturing/page.tsx
│   │   ├── sustainability/page.tsx
│   │   └── contact/page.tsx
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles + Tailwind
├── components/
│   ├── PageClient.tsx           # Page wrapper component
│   ├── Navigation.tsx           # Header navigation
│   ├── Footer.tsx
│   └── blocks/                  # Block renderer system
│       ├── BlockRenderer.tsx    # Maps block types to components
│       ├── HeroBlock.tsx
│       ├── FeaturesGridBlock.tsx
│       └── ...
├── lib/
│   ├── tina.ts                  # Content fetching (supports MDX fallback)
│   └── sanity.ts                # Sanity query functions
├── sanity/
│   ├── lib/
│   │   └── client.ts            # Sanity client configuration
│   └── schemas/                 # Sanity schema definitions
├── content/
│   └── pages/                   # MDX content files (fallback)
├── scripts/
│   └── update-sanity-content.ts # Content migration script
├── public/
│   └── uploads/                 # Static assets
└── ...
```

## B2B Content Strategy

This site targets **industrial/business customers** with:

- Professional, data-driven messaging
- Focus on bulk orders, specifications, lead times
- Manufacturing capabilities and certifications
- Supply chain reliability
- Partnership/distribution opportunities

### Differentiation from Consumer Site (TWG)

| Aspect | TWG (Consumer) | Timber International (B2B) |
|--------|----------------|---------------------------|
| Tone | Emotional, craft-focused | Professional, technical |
| Products | Individual pieces | Bulk orders, components |
| Pricing | Retail prices | Volume/wholesale pricing |
| CTA | "Buy Now" | "Request Quote", "Contact Sales" |
| Content | Lifestyle imagery | Technical specs, certifications |

## Content Management

### Via Sanity Studio

1. Go to your Sanity Studio URL
2. Log in with your Sanity account
3. Navigate to "Pages" in the sidebar
4. Select a page to edit
5. Add/edit/reorder blocks
6. Publish changes

## Design System

### Colors (Moooi-Inspired)

```css
--moooi-cream:    #F5F5F0  /* Background */
--moooi-charcoal: #2B2B2B  /* Text/Dark elements */
--moooi-sand:     #E8E4DC  /* Subtle backgrounds */
--moooi-gold:     #C9A961  /* Accents/Hover states */
--moooi-slate:    #6B7280  /* Secondary text */
```

## Deployment

### Vercel

```bash
npm run build
npx vercel --prod
```

### Environment Variables (Vercel)

Set in Vercel dashboard:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: your-project-id
- `NEXT_PUBLIC_SANITY_DATASET`: production
- `NEXT_PUBLIC_USE_SANITY`: true

## Setup Checklist

- [ ] Create GitHub repository (wood-good/timber-international)
- [ ] Create new Sanity project for timber-international
- [ ] Update `.env.local` with new Sanity project ID
- [ ] Update `sanity/lib/client.ts` with new project ID
- [ ] Deploy Sanity Studio
- [ ] Deploy to Vercel
- [ ] Update B2B-focused content

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons)

## License

MIT
