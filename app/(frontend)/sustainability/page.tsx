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
        heading: 'Certified Sustainable Operations',
        subheading: "Sustainability isn't marketing—it's how we maintain supply chain stability. FSC certification, ISO 14001 environmental management, and full material traceability on every order.",
        size: 'small',
      }}
    />
  )
}
