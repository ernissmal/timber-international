import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'avqamki4',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
})

// Define all pages with their content blocks
const pages = [
  {
    _type: 'page',
    title: 'Home',
    slug: { _type: 'slug', current: 'home' },
    description: 'Industrial timber supply you can build your business on',
    seo: {
      title: 'Timber International - Industrial Timber Supply Partner',
      description: 'Your supply chain doesn\'t have room for inconsistency. Timber International delivers consistent quality timber at industrial scale—backed by dedicated account management.',
    },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero-home',
        heading: 'Your supply chain doesn\'t have room for inconsistency',
        subheading: 'Neither do we.',
        description: 'Timber International delivers consistent quality timber at industrial scale—backed by dedicated account management and transparent supply chain operations.',
        ctaText: 'Request a Quote',
        ctaLink: '/contact',
      },
      {
        _type: 'featuresGrid',
        _key: 'features-home',
        heading: 'Why Partner With Timber International',
        features: [
          {
            _key: 'feature-1',
            title: 'Industrial Capacity',
            description: 'Modern CNC equipment and automated systems deliver consistent output at scale. Capacity to match your growth, from first order to full partnership.',
          },
          {
            _key: 'feature-2',
            title: 'Precision Standards',
            description: 'ISO-standard quality management systems ensure specification adherence on every order. Industrial volume with precision standards.',
          },
          {
            _key: 'feature-3',
            title: 'Dedicated Partnership',
            description: 'Your supply chain partner, not just another supplier. Dedicated account management, transparent systems, and technical support.',
          },
          {
            _key: 'feature-4',
            title: 'Reliable Delivery',
            description: 'Streamlined European logistics network ensures on-time delivery. Lead times you can count on, shipment after shipment.',
          },
        ],
      },
      {
        _type: 'stats',
        _key: 'stats-home',
        stats: [
          {
            _key: 'stat-1',
            value: '99%',
            label: 'On-Time Delivery',
          },
          {
            _key: 'stat-2',
            value: '24/7',
            label: 'Support Available',
          },
          {
            _key: 'stat-3',
            value: 'ISO 9001',
            label: 'Quality Certified',
          },
          {
            _key: 'stat-4',
            value: 'FSC',
            label: 'Chain of Custody',
          },
        ],
      },
      {
        _type: 'cta',
        _key: 'cta-home',
        heading: 'Partner with Timber International',
        description: 'Remove supply uncertainty from your operations. Consistent quality. Reliable delivery. Industrial capacity.',
        ctaText: 'Contact Our B2B Team',
        ctaLink: '/contact',
      },
    ],
  },
  {
    _type: 'page',
    title: 'About',
    slug: { _type: 'slug', current: 'about' },
    description: 'We scaled our operations so you wouldn\'t have to compromise on quality',
    seo: {
      title: 'About Timber International - Your Industrial Timber Partner',
      description: 'Timber International combines industrial manufacturing capability with precision quality standards. Learn about our partnership model and commitment to B2B excellence.',
    },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero-about',
        heading: 'We scaled our operations',
        subheading: 'So you wouldn\'t have to compromise on quality',
        description: 'Timber International exists because businesses deserve better than the status quo.',
      },
      {
        _type: 'editorialText',
        _key: 'story-about',
        heading: 'The Timber International Story',
        content: `For too long, B2B timber buyers have faced an impossible choice: work with small artisan suppliers who deliver quality but can't scale, or partner with industrial operations that have capacity but inconsistent standards. Lead times slip. Specifications vary. Communication breaks down. In an industry built on raw materials, reliability shouldn't be a luxury.

We built Timber International to solve this problem.

Our roots run deep in the timber industry. We understand wood—its properties, its potential, its demands. But we also understand modern manufacturing. We've invested in industrial-scale operations: precision CNC equipment, automated quality control systems, expanded warehousing, and streamlined logistics. Not to replace expertise, but to systematize it.

The result? Consistent quality at volume. Every board manufactured to specification. Every order tracked and delivered on schedule. Every partnership backed by capacity you can count on.`,
      },
      {
        _type: 'featuresGrid',
        _key: 'partnership-about',
        heading: 'The Partnership Model',
        description: 'We don\'t just sell timber. We become an extension of your supply chain.',
        features: [
          {
            _key: 'partnership-1',
            title: 'Dedicated Account Management',
            description: 'A single point of contact who understands your business',
          },
          {
            _key: 'partnership-2',
            title: 'Transparent Systems',
            description: 'Real-time inventory visibility and order tracking',
          },
          {
            _key: 'partnership-3',
            title: 'Technical Support',
            description: 'Specification guidance and application expertise',
          },
          {
            _key: 'partnership-4',
            title: 'Flexible Terms',
            description: 'Ordering structures that adapt to your operations',
          },
        ],
      },
      {
        _type: 'editorialText',
        _key: 'commitment-about',
        heading: 'Our Commitment',
        content: 'We measure success simply: Can you count on us?\n\nThat means consistent quality. Reliable delivery. Clear communication. Competitive pricing. And the capacity to grow together.\n\n**Timber International. Industrial timber supply you can build your business on.**',
      },
    ],
  },
  {
    _type: 'page',
    title: 'Products',
    slug: { _type: 'slug', current: 'products' },
    description: 'Specifications you can count on. Every order. Every time.',
    seo: {
      title: 'Products - Industrial Timber Supply | Timber International',
      description: 'Consistent quality timber products with complete specifications. FSC-certified sourcing with full chain of custody documentation.',
    },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero-products',
        heading: 'Specifications you can count on',
        subheading: 'Every order. Every time.',
        description: 'Industrial volume with precision standards. FSC-certified sourcing with full chain of custody documentation.',
      },
      {
        _type: 'editorialText',
        _key: 'intro-products',
        heading: 'Quality Standards',
        content: 'Every board meets specification. Every order is tracked and delivered on schedule. Our automated quality control systems ensure consistency batch to batch, order to order.\n\nAll products come with complete technical specifications, certifications, and documentation to support your procurement requirements.',
      },
      {
        _type: 'featuresGrid',
        _key: 'categories-products',
        heading: 'Product Categories',
        features: [
          {
            _key: 'category-1',
            title: 'Raw Timber',
            description: 'Consistent raw material supply for production lines. Available in multiple grades and specifications.',
          },
          {
            _key: 'category-2',
            title: 'Processed Materials',
            description: 'CNC-processed components to your exact specifications. Precision cutting and finishing.',
          },
          {
            _key: 'category-3',
            title: 'Custom Orders',
            description: 'Flexible manufacturing for custom specifications. Technical support for unique requirements.',
          },
        ],
      },
      {
        _type: 'cta',
        _key: 'cta-products',
        heading: 'Request Product Specifications',
        description: 'Download detailed spec sheets or discuss your specific requirements with our technical team.',
        ctaText: 'Contact Technical Support',
        ctaLink: '/contact',
      },
    ],
  },
  {
    _type: 'page',
    title: 'Manufacturing',
    slug: { _type: 'slug', current: 'manufacturing' },
    description: 'Modern equipment. Rigorous standards. Consistent output.',
    seo: {
      title: 'Manufacturing Capabilities | Timber International',
      description: 'Modern CNC equipment, ISO-standard quality control, and industrial capacity. Learn about our manufacturing processes and quality assurance.',
    },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero-manufacturing',
        heading: 'Modern equipment',
        subheading: 'Rigorous standards. Consistent output.',
        description: 'Industrial-scale operations backed by precision quality systems.',
      },
      {
        _type: 'editorialText',
        _key: 'capabilities-manufacturing',
        heading: 'Our Manufacturing Capabilities',
        content: `We've invested in modern manufacturing infrastructure to systematize consistency:

**Equipment & Technology:**
- Precision CNC and automated processing equipment
- Automated quality control systems
- Expanded warehousing and inventory management
- Streamlined European logistics network

**Quality Assurance:**
- ISO-standard quality management systems
- Batch-to-batch consistency testing
- Full traceability and documentation
- Continuous process improvement

**Capacity:**
- Industrial-scale production volumes
- Flexible manufacturing for custom requirements
- Scalable operations to match your growth`,
      },
      {
        _type: 'stats',
        _key: 'stats-manufacturing',
        stats: [
          {
            _key: 'stat-m1',
            value: 'ISO 9001',
            label: 'Quality Management',
          },
          {
            _key: 'stat-m2',
            value: 'FSC',
            label: 'Chain of Custody',
          },
          {
            _key: 'stat-m3',
            value: '99%+',
            label: 'Quality Pass Rate',
          },
          {
            _key: 'stat-m4',
            value: '24/48h',
            label: 'Standard Lead Time',
          },
        ],
      },
      {
        _type: 'cta',
        _key: 'cta-manufacturing',
        heading: 'Schedule a Facility Tour',
        description: 'See our manufacturing capabilities firsthand and discuss how we can support your operations.',
        ctaText: 'Contact Us',
        ctaLink: '/contact',
      },
    ],
  },
  {
    _type: 'page',
    title: 'Sustainability',
    slug: { _type: 'slug', current: 'sustainability' },
    description: 'FSC-certified sourcing with full chain of custody documentation',
    seo: {
      title: 'Sustainability & Certifications | Timber International',
      description: 'Responsible sourcing with FSC certification. Complete chain of custody documentation and environmental compliance.',
    },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero-sustainability',
        heading: 'Responsible sourcing',
        subheading: 'With full certification and compliance',
        description: 'FSC-certified timber with complete chain of custody documentation.',
      },
      {
        _type: 'editorialText',
        _key: 'approach-sustainability',
        heading: 'Our Approach to Sustainability',
        content: `Sustainability in B2B isn't about emotion—it's about compliance, documentation, and verifiable standards.

**Certifications & Compliance:**
- FSC Chain of Custody certification
- Full traceability documentation
- Environmental compliance standards
- Regular third-party audits

**Responsible Sourcing:**
- Verified sustainable forest sources
- Complete supply chain transparency
- Legal harvesting documentation
- Ethical supplier relationships

We provide the certifications and documentation your procurement team needs for compliance and reporting requirements.`,
      },
      {
        _type: 'featuresGrid',
        _key: 'standards-sustainability',
        heading: 'Standards & Certifications',
        features: [
          {
            _key: 'cert-1',
            title: 'FSC Certified',
            description: 'Full Chain of Custody certification with complete traceability documentation.',
          },
          {
            _key: 'cert-2',
            title: 'ISO Compliance',
            description: 'Environmental management systems and quality assurance standards.',
          },
          {
            _key: 'cert-3',
            title: 'Transparent Sourcing',
            description: 'Complete supply chain visibility and legal harvesting verification.',
          },
        ],
      },
    ],
  },
  {
    _type: 'page',
    title: 'Contact',
    slug: { _type: 'slug', current: 'contact' },
    description: 'Get in touch with our B2B team',
    seo: {
      title: 'Contact Our B2B Team | Timber International',
      description: 'Request a quote, download specifications, or discuss partnership options with Timber International.',
    },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero-contact',
        heading: 'Let\'s discuss your requirements',
        description: 'Our B2B team is ready to provide specifications, pricing, and partnership options.',
      },
      {
        _type: 'featuresGrid',
        _key: 'options-contact',
        heading: 'How We Can Help',
        features: [
          {
            _key: 'option-1',
            title: 'Request a Quote',
            description: 'Get pricing and availability for your specific requirements.',
          },
          {
            _key: 'option-2',
            title: 'Download Specifications',
            description: 'Access detailed technical specifications and product documentation.',
          },
          {
            _key: 'option-3',
            title: 'Schedule a Facility Tour',
            description: 'See our manufacturing capabilities and meet our team.',
          },
          {
            _key: 'option-4',
            title: 'Discuss Partnership Options',
            description: 'Explore how we can integrate with your supply chain.',
          },
        ],
      },
      {
        _type: 'editorialText',
        _key: 'next-steps-contact',
        heading: 'Next Steps',
        content: 'Contact our B2B team to discuss how Timber International can support your operations. We typically respond to inquiries within 24 hours.\n\n**Ready to partner?** Let\'s remove supply uncertainty from your operations.',
      },
    ],
  },
]

async function populateSanity() {
  try {
    console.log('🌳 Starting Sanity content population...\n')

    // Check if we have a write token
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      throw new Error(
        'SANITY_API_WRITE_TOKEN is required. Please add it to your .env.local file.'
      )
    }

    // Create all pages
    for (const page of pages) {
      console.log(`📄 Creating page: ${page.title}...`)

      try {
        const result = await client.create(page)
        console.log(`✅ Created ${page.title} (${result._id})\n`)
      } catch (error: any) {
        console.error(`❌ Failed to create ${page.title}:`, error.message)
      }
    }

    console.log('🎉 Content population complete!')
    console.log(`\n✨ Your Sanity Studio is now available at:`)
    console.log(`   https://avqamki4.sanity.studio\n`)
  } catch (error: any) {
    console.error('❌ Error populating Sanity:', error.message)
    process.exit(1)
  }
}

// Run the population script
populateSanity()
