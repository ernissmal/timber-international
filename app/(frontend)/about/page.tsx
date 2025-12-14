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
        heading: 'About Us',
        subheading: 'Our story of passion, innovation, and commitment to excellence',
        size: 'small',
      }}
    />
  )
}
