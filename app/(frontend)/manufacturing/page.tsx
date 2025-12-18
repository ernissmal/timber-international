import { getPageProps } from '@/lib/tina'
import PageClient from '@/components/PageClient'

// Use dynamic rendering to avoid build-time TinaCMS fetch issues
export const dynamic = 'force-dynamic'

export default async function ManufacturingPage() {
  const props = await getPageProps('manufacturing')

  return (
    <PageClient
      {...props}
      fallbackHero={{
        heading: 'Production Capacity That Scales With Your Business',
        subheading: 'State-of-the-art manufacturing facility with ISO-certified processes, documented quality control, and the flexibility to meet custom specifications.',
        size: 'small',
      }}
    />
  )
}
