import { Suspense } from 'react'
import { getAllSections } from '@/lib/sanity'
import SPAPageClient from './page-client'

// Revalidate every 60 seconds
export const revalidate = 60

// Loading skeleton for sections
function SectionsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-screen bg-moooi-cream" />
      <div className="h-96 bg-white" />
      <div className="h-96 bg-moooi-sand" />
      <div className="h-96 bg-white" />
    </div>
  )
}

export default async function HomePage() {
  const sections = await getAllSections()

  return (
    <Suspense fallback={<SectionsLoading />}>
      <SPAPageClient sections={sections} />
    </Suspense>
  )
}
