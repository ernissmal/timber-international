import { getPageProps } from '@/lib/tina'
import PageClient from '@/components/PageClient'

// Use dynamic rendering to avoid build-time TinaCMS fetch issues
export const dynamic = 'force-dynamic'

export default async function SustainabilityPage() {
  const props = await getPageProps('sustainability')

  return (
    <PageClient
      {...props}
      fallbackHero={{
        heading: 'Sustainability',
        subheading: 'Committed to a greener future through responsible practices',
        size: 'small',
      }}
    />
  )
}
