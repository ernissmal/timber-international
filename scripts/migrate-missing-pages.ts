import { createClient } from '@sanity/client'

// Simple UUID generator
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const client = createClient({
  projectId: 'avqamki4',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const oakSlabsPage = {
  _id: 'page-oak-slabs',
  _type: 'page',
  title: 'Oak Slabs',
  slug: { _type: 'slug', current: 'oak-slabs' },
  description: 'Premium solid oak slabs manufactured to your specifications.',
  blocks: [
    {
      _type: 'editorialText',
      _key: uuidv4(),
      heading: 'Solid Oak. Industrial Scale.',
      layout: 'single',
      backgroundColor: 'cream',
      contentLeft: [
        {
          _type: 'block',
          _key: uuidv4(),
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: uuidv4(),
              text: 'Premium solid oak slabs manufactured to your specifications. Consistent quality, reliable supply, competitive pricing.',
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: 'featuresGrid',
      _key: uuidv4(),
      heading: '',
      columns: '3',
      items: [
        {
          _key: uuidv4(),
          title: 'Custom Dimensions',
          description: 'Cut to your exact specifications with precision CNC machinery. Tolerances within ±0.5mm.',
          icon: 'Ruler',
        },
        {
          _key: uuidv4(),
          title: 'Kiln Dried',
          description: 'Moisture content controlled to 8-12% for stability and longevity. Documented drying records available.',
          icon: 'Thermometer',
        },
        {
          _key: uuidv4(),
          title: 'FSC Certified',
          description: 'Responsibly sourced from sustainable European forests. Chain of custody documentation provided.',
          icon: 'TreePine',
        },
      ],
    },
    {
      _type: 'cta',
      _key: uuidv4(),
      heading: 'Need Custom Oak Slabs?',
      text: 'Contact our team to discuss your specifications and volume requirements.',
      buttonText: 'Request Specifications',
      buttonLink: '#contact',
      backgroundColor: 'cream',
    },
  ],
}

const warehousePage = {
  _id: 'page-warehouse',
  _type: 'page',
  title: 'Warehouse',
  slug: { _type: 'slug', current: 'warehouse' },
  description: 'Modern warehouse facilities for optimal timber storage and logistics.',
  blocks: [
    {
      _type: 'editorialText',
      _key: uuidv4(),
      heading: 'Storage & Logistics Excellence',
      layout: 'single',
      backgroundColor: 'white',
      contentLeft: [
        {
          _type: 'block',
          _key: uuidv4(),
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: uuidv4(),
              text: 'Modern warehouse facilities ensure your timber is stored properly and shipped efficiently to meet your production schedules.',
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: 'featuresGrid',
      _key: uuidv4(),
      heading: '',
      columns: '3',
      items: [
        {
          _key: uuidv4(),
          title: '10,000m² Storage',
          description: 'Climate-controlled facilities for optimal timber preservation.',
          icon: 'Warehouse',
        },
        {
          _key: uuidv4(),
          title: 'Pan-European Delivery',
          description: 'Reliable logistics network covering all major markets.',
          icon: 'Truck',
        },
        {
          _key: uuidv4(),
          title: '48-Hour Dispatch',
          description: 'In-stock items shipped within 2 business days.',
          icon: 'Clock',
        },
      ],
    },
  ],
}

async function migrate() {
  console.log('Starting migration of missing pages...\n')

  try {
    // Create oak-slabs page
    console.log('Creating oak-slabs page...')
    const oakResult = await client.createOrReplace(oakSlabsPage)
    console.log('✓ Created oak-slabs page:', oakResult._id)

    // Create warehouse page
    console.log('Creating warehouse page...')
    const warehouseResult = await client.createOrReplace(warehousePage)
    console.log('✓ Created warehouse page:', warehouseResult._id)

    console.log('\n✅ Migration complete!')
    console.log('\nPages created:')
    console.log('  - oak-slabs')
    console.log('  - warehouse')
    console.log('\nContent is now editable in Sanity Studio.')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

migrate()
