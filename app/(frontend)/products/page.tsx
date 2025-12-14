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
        heading: 'Our Products',
        subheading: 'Discover our collection of meticulously crafted designs',
        size: 'small',
      }}
    />
  )
}
