import { getPageProps } from '@/lib/tina'
import PageClient from '@/components/PageClient'

// Use dynamic rendering to avoid build-time TinaCMS fetch issues
export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const props = await getPageProps('contact')

  return (
    <PageClient
      {...props}
      fallbackHero={{
        heading: 'Start a Partnership Conversation',
        subheading: "Need reliable timber supply? Let's discuss your requirements, timelines, and specifications. Our B2B team responds within 24 hours.",
        size: 'small',
      }}
    />
  )
}
