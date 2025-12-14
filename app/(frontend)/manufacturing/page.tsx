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
        heading: 'Manufacturing Excellence',
        subheading: 'Where traditional craftsmanship meets modern technology',
        size: 'small',
      }}
    />
  )
}
