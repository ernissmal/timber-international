import { getPageProps } from '@/lib/tina'
import HomePageClient from './page-client'

// Use dynamic rendering to avoid build-time TinaCMS fetch issues
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const props = await getPageProps('home')

  return <HomePageClient {...props} />
}
