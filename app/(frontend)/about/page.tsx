import { getPageProps } from '@/lib/tina'
import PageClient from '@/components/PageClient'

// Use dynamic rendering to avoid build-time TinaCMS fetch issues
export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const props = await getPageProps('about')

  return (
    <PageClient
      {...props}
      fallbackHero={{
        heading: 'A Partnership-Driven Timber Manufacturer',
        subheading: "We've built our reputation on one simple principle: your business needs a supplier who shows up. Every order. Every deadline. Every specification met.",
        size: 'small',
      }}
    />
  )
}
