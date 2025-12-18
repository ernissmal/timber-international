import { getPageProps } from '@/lib/tina'
import PageClient from '@/components/PageClient'

// Use dynamic rendering to avoid build-time TinaCMS fetch issues
export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const props = await getPageProps('products')

  return (
    <PageClient
      {...props}
      fallbackHero={{
        heading: 'Industrial Solid Oak Solutions',
        subheading: 'Standardized furniture components manufactured to your specifications. Every piece documented, every shipment on schedule, every partnership built to last.',
        size: 'small',
      }}
    />
  )
}
