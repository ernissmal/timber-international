'use client'

import { Component, ReactNode } from 'react'
import {
  HeroSection,
  AboutSection,
  OakSlabsSection,
  WarehouseSection,
  ProductsSection,
  ManufacturingSection,
  SustainabilitySection,
  ContactSection,
} from '@/components/sections'
import type { AllSectionsData } from '@/lib/sanity'

// Error boundary for section failures
interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class SectionErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('Section render error:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

// Fallback for section errors
function SectionFallback({ name, id }: { name: string; id: string }) {
  return (
    <section id={id} className="py-20 px-6 text-center bg-moooi-cream scroll-mt-20" aria-label={name}>
      <p className="text-moooi-slate">Unable to load {name} section.</p>
    </section>
  )
}

interface SPAPageClientProps {
  sections: AllSectionsData
}

export default function SPAPageClient({ sections }: SPAPageClientProps) {
  return (
    <main>
      <SectionErrorBoundary fallback={<SectionFallback name="Hero" id="hero" />}>
        <HeroSection data={sections.hero} />
      </SectionErrorBoundary>

      <SectionErrorBoundary fallback={<SectionFallback name="About" id="about" />}>
        <AboutSection data={sections.about} />
      </SectionErrorBoundary>

      <SectionErrorBoundary fallback={<SectionFallback name="Oak Slabs" id="oak-slabs" />}>
        <OakSlabsSection data={sections.oakSlabs} />
      </SectionErrorBoundary>

      <SectionErrorBoundary fallback={<SectionFallback name="Warehouse" id="warehouse" />}>
        <WarehouseSection data={sections.warehouse} />
      </SectionErrorBoundary>

      <SectionErrorBoundary fallback={<SectionFallback name="Products" id="products" />}>
        <ProductsSection data={sections.products} />
      </SectionErrorBoundary>

      <SectionErrorBoundary fallback={<SectionFallback name="Manufacturing" id="manufacturing" />}>
        <ManufacturingSection data={sections.manufacturing} />
      </SectionErrorBoundary>

      <SectionErrorBoundary fallback={<SectionFallback name="Sustainability" id="sustainability" />}>
        <SustainabilitySection data={sections.sustainability} />
      </SectionErrorBoundary>

      <SectionErrorBoundary fallback={<SectionFallback name="Contact" id="contact" />}>
        <ContactSection data={sections.contact} />
      </SectionErrorBoundary>
    </main>
  )
}
