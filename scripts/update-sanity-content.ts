import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '6pfau3iy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

// Real TWG content from docs/content
const pages = {
  home: {
    title: 'Home',
    slug: 'home',
    seoTitle: 'The Wood and Good - Solid Oak Furniture Direct from Maker',
    seoDescription: 'Solid oak furniture crafted with generational expertise. Direct from maker to you. No middlemen, no compromise.',
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'Where Forest Meets Forever',
        subheading: 'The Wood and Good - Solid oak. Direct hands. No middlemen.',
        backgroundImage: '/uploads/hero-main.jpg',
        ctaText: 'Explore Our Craft',
        ctaLink: '/products',
        theme: 'dark',
        size: 'default',
        glassEffect: false,
      },
      {
        _type: 'editorialText',
        _key: 'intro1',
        heading: 'Hands That Remember',
        layout: 'single',
        contentLeft: 'We craft what endures. Each piece begins in the forest and ends in your hands—no detours, no compromise. Generational knowledge meets immediate availability. Your table doesn\'t wait in a warehouse. It waits here, ready, honest, whole.',
        backgroundColor: 'white',
      },
      {
        _type: 'imageSection',
        _key: 'img1',
        image: '/uploads/furniture-showcase.jpg',
        heading: 'What We Make In Truth',
        text: 'Five categories. One material. Infinite configurations. Everything we craft is solid oak, made here, available now or customized exactly to your need.',
        ctaText: 'View Products',
        ctaLink: '/products',
        overlayPosition: 'bottom-left',
        theme: 'light',
      },
      {
        _type: 'featuresGrid',
        _key: 'features1',
        heading: 'Our Expertise',
        columns: '3',
        items: [
          {
            _key: 'f1',
            title: 'Direct Connection',
            description: 'No agents. No middlemen. Just the maker and you.',
            icon: 'Handshake',
            link: '/about',
          },
          {
            _key: 'f2',
            title: 'Solid Oak Only',
            description: 'Never veneered composites. Never particleboard. Just honest wood.',
            icon: 'TreeDeciduous',
            link: '/products',
          },
          {
            _key: 'f3',
            title: 'Sustainable Practice',
            description: 'Every tree we use, we replace. A circle, not a line.',
            icon: 'Leaf',
            link: '/sustainability',
          },
        ],
      },
      {
        _type: 'imageSection',
        _key: 'img2',
        image: '/uploads/woodworking-artisan.jpg',
        heading: 'From Tree to Table',
        text: 'We control the entire journey: from selecting timber to final finish. This isn\'t scale. It\'s care.',
        ctaText: 'Our Process',
        ctaLink: '/manufacturing',
        overlayPosition: 'center',
        theme: 'dark',
      },
      {
        _type: 'cta',
        _key: 'cta1',
        heading: 'Ready to Create Something That Lasts?',
        text: 'Your furniture doesn\'t wait in a warehouse. It waits here, ready, honest, whole.',
        buttonText: 'Get In Touch',
        buttonLink: '/contact',
        theme: 'dark',
      },
    ],
  },
  about: {
    title: 'About',
    slug: 'about',
    seoTitle: 'About The Wood and Good - Generational Craftsmen',
    seoDescription: 'Learn about our heritage of solid oak craftsmanship. Direct from maker to you, with generational expertise.',
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'Hands That Remember',
        subheading: 'The workshop where your furniture begins and the hands that deliver it to you.',
        backgroundImage: '/uploads/about-hero.jpg',
        ctaText: 'Our Story',
        ctaLink: '#story',
        theme: 'light',
        size: 'default',
      },
      {
        _type: 'editorialText',
        _key: 'story1',
        heading: 'Who We Are',
        layout: 'single',
        contentLeft: 'The Wood and Good exists at the intersection of patience and precision. For generations, our hands have shaped oak—not as a trend, but as a language passed from maker to maker.\n\nWe are not a factory. We are not a showroom. We are the workshop where your furniture begins and the hands that deliver it to you. No agents. No middlemen. Just the maker and the one who will use it for decades to come.',
        backgroundColor: 'cream',
      },
      {
        _type: 'editorialText',
        _key: 'story2',
        heading: 'Direct Connection',
        layout: 'single',
        contentLeft: 'This directness isn\'t just about price - yes, you save considerably. For us it\'s about connection. When you choose us, you choose to know where your table came from, who made it, and how to care for it across generations.\n\nWe work only with solid oak — never veneered composites, never particleboard wrapped in a thin promise. Because solid wood doesn\'t just last longer. It tells the truth.',
        backgroundColor: 'white',
      },
      {
        _type: 'featuresGrid',
        _key: 'values1',
        heading: 'Our Values',
        columns: '3',
        items: [
          {
            _key: 'v1',
            title: 'Honesty',
            description: 'Solid wood tells the truth. So do we.',
            icon: 'Shield',
          },
          {
            _key: 'v2',
            title: 'Heritage',
            description: 'Knowledge passed from maker to maker.',
            icon: 'History',
          },
          {
            _key: 'v3',
            title: 'Legacy',
            description: 'What we make, you pass down.',
            icon: 'Heart',
          },
        ],
      },
      {
        _type: 'cta',
        _key: 'cta1',
        heading: 'What We Make, You Pass Down',
        buttonText: 'See Our Work',
        buttonLink: '/products',
        theme: 'dark',
      },
    ],
  },
  products: {
    title: 'Products',
    slug: 'products',
    seoTitle: 'Products - Solid Oak Furniture | The Wood and Good',
    seoDescription: 'Five categories. One material. Infinite configurations. Solid oak furniture made here, available now or customized to your need.',
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'What We Make In Truth',
        subheading: 'Five categories. One material. Infinite configurations. Everything we craft is solid oak, made here, available now or customized exactly to your need.',
        backgroundImage: '/uploads/products-hero.jpg',
        ctaText: 'Request Custom',
        ctaLink: '/contact',
        theme: 'light',
        size: 'default',
      },
      {
        _type: 'featuresGrid',
        _key: 'products1',
        heading: 'Our Product Categories',
        columns: '3',
        items: [
          {
            _key: 'p1',
            title: 'Finger Joint Tables',
            description: 'Traditional joinery that reveals its own integrity. Interlocking oak sections create strength without hardware—a visible testament to craftsmanship that doesn\'t hide.',
            icon: 'Grid3x3',
          },
          {
            _key: 'p2',
            title: 'Solid Wood Furniture',
            description: 'Chairs, benches, shelving. Each piece carved from single-source oak. No veneers. No particle core. Just wood that breathes, ages, and lasts.',
            icon: 'Armchair',
          },
          {
            _key: 'p3',
            title: 'Furniture Components',
            description: 'Legs, panels, frames—the building blocks for designers and makers who want solid foundations without compromise. Pre-finished or raw, sized to your specifications.',
            icon: 'Layers',
          },
          {
            _key: 'p4',
            title: 'CNC Custom Work',
            description: 'Precision-cut oak for architectural details, inlays, and intricate joinery. We blend digital accuracy with hand-finished soul. Complexity made repeatable without losing warmth.',
            icon: 'Cpu',
          },
          {
            _key: 'p5',
            title: 'Table Tops & Countertops',
            description: 'The surface where life happens. Our tops are thick, solid, enduring—ready to hold your meals, your work, your years. Available in standard dimensions or cut precisely to your space.',
            icon: 'Square',
          },
        ],
      },
      {
        _type: 'imageSection',
        _key: 'img1',
        image: '/uploads/craftsmanship.jpg',
        heading: 'Crafted With Care',
        text: 'Every piece we create passes through our hands—and only our hands. We control the entire journey: from selecting timber to final finish.',
        ctaText: 'Our Process',
        ctaLink: '/manufacturing',
        overlayPosition: 'bottom-left',
        theme: 'light',
      },
      {
        _type: 'cta',
        _key: 'cta1',
        heading: 'Ready to Create Something Unique?',
        text: 'Custom dimensions. Custom finishes. The same quality, the same care.',
        buttonText: 'Request a Custom Piece',
        buttonLink: '/contact',
        theme: 'dark',
      },
    ],
  },
  manufacturing: {
    title: 'Manufacturing',
    slug: 'manufacturing',
    seoTitle: 'Manufacturing - From Tree to Table | The Wood and Good',
    seoDescription: 'We control the entire journey: from selecting timber to final finish. Ready-made pieces and custom furniture with the same quality.',
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'From Tree to Table',
        subheading: 'Every piece we create passes through our hands—and only our hands. We control the entire journey.',
        backgroundImage: '/uploads/manufacturing-hero.jpg',
        ctaText: 'See Our Work',
        ctaLink: '/products',
        theme: 'dark',
        size: 'default',
      },
      {
        _type: 'editorialText',
        _key: 'process1',
        heading: 'Our Process',
        layout: 'single',
        contentLeft: 'Our workshop holds both: ready-made pieces available now, and the space to craft something entirely yours. Custom dimensions. Custom finishes. The same quality, the same speed.\n\nWe\'ve eliminated the wait that usually comes with bespoke furniture—because we\'re already here, working, ready. You\'re not ordering from a catalog and hoping. You\'re collaborating with the people who will actually build it.',
        backgroundColor: 'cream',
      },
      {
        _type: 'featuresGrid',
        _key: 'features1',
        heading: 'What Sets Us Apart',
        columns: '3',
        items: [
          {
            _key: 'f1',
            title: 'Immediate Availability',
            description: 'Ready-made pieces in stock. No six-month wait times.',
            icon: 'Clock',
          },
          {
            _key: 'f2',
            title: 'Infinite Flexibility',
            description: 'Custom dimensions and finishes with the same quality.',
            icon: 'Maximize',
          },
          {
            _key: 'f3',
            title: 'Direct Pricing',
            description: 'Furniture-grade oak at prices reserved for mass-produced mediocrity.',
            icon: 'Wallet',
          },
        ],
      },
      {
        _type: 'editorialText',
        _key: 'process2',
        heading: 'No Shortcuts. No Substitutes. No Waiting.',
        layout: 'single',
        contentLeft: 'Unlike large retailers who stock generic designs or custom workshops with six-month lead times, we bridge both worlds. Immediate availability. Infinite flexibility.\n\nThe result? Furniture-grade oak, handcrafted with generational expertise, at prices typically reserved for mass-produced mediocrity.',
        backgroundColor: 'white',
      },
      {
        _type: 'cta',
        _key: 'cta1',
        heading: 'Start Your Project Today',
        buttonText: 'Contact Us',
        buttonLink: '/contact',
        theme: 'dark',
      },
    ],
  },
  sustainability: {
    title: 'Sustainability',
    slug: 'sustainability',
    seoTitle: 'Sustainability - A Circle Not a Line | The Wood and Good',
    seoDescription: 'We don\'t extract. We participate. Every tree we use, we replace. Sustainable solid oak furniture.',
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'A Circle Not a Line',
        subheading: 'We don\'t extract. We participate.',
        backgroundImage: '/uploads/sustainability-hero.jpg',
        ctaText: 'Our Commitment',
        ctaLink: '#commitment',
        theme: 'light',
        size: 'default',
      },
      {
        _type: 'editorialText',
        _key: 'story1',
        heading: 'Our Cycle',
        layout: 'single',
        contentLeft: 'Our cycle is complete: sawing, crafting, replanting. Every tree we use, we replace. Every piece we make, we ensure can return to the earth—or be passed to the next generation—without leaving damage behind.\n\nSolid oak isn\'t just a choice for longevity. It\'s a choice for honesty. Wood composites and veneered boards have hidden costs: adhesives that off-gas, cores that crumble, surfaces that peel and deceive. Solid wood simply is. It ages with dignity. It repairs cleanly. It composts completely.',
        backgroundColor: 'cream',
      },
      {
        _type: 'featuresGrid',
        _key: 'features1',
        heading: 'Sustainable Practices',
        columns: '3',
        items: [
          {
            _key: 's1',
            title: 'Replanting',
            description: 'Every tree we use, we replace. The forest remembers.',
            icon: 'TreePine',
          },
          {
            _key: 's2',
            title: 'Longevity',
            description: 'The most sustainable furniture is the kind you never throw away.',
            icon: 'Infinity',
          },
          {
            _key: 's3',
            title: 'No Greenwashing',
            description: 'No carbon-offset theater. Just ancient practice of giving back.',
            icon: 'CheckCircle',
          },
        ],
      },
      {
        _type: 'editorialText',
        _key: 'story2',
        heading: 'Zero Theatrical Gestures',
        layout: 'single',
        contentLeft: 'We believe the most sustainable furniture is the kind you never throw away.\n\nOur workshop runs on the principle of zero theatrical gestures. No greenwashing. No carbon-offset theater. Just the quiet, ancient practice of taking only what you give back.\n\nThe forest remembers. So do we.',
        backgroundColor: 'white',
      },
      {
        _type: 'cta',
        _key: 'cta1',
        heading: 'The Forest Remembers. So Do We.',
        buttonText: 'Learn About Our Process',
        buttonLink: '/manufacturing',
        theme: 'dark',
      },
    ],
  },
  contact: {
    title: 'Contact',
    slug: 'contact',
    seoTitle: 'Contact Us | The Wood and Good',
    seoDescription: 'Get in touch to discuss your custom furniture project or inquire about our ready-made pieces.',
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'Let\'s Create Together',
        subheading: 'Whether you need a ready-made piece or something entirely yours, we\'re here to help.',
        backgroundImage: '/uploads/contact-hero.jpg',
        ctaText: 'Send Message',
        ctaLink: '#contact-form',
        theme: 'light',
        size: 'default',
      },
      {
        _type: 'featuresGrid',
        _key: 'contact1',
        heading: 'Get In Touch',
        columns: '3',
        items: [
          {
            _key: 'c1',
            title: 'Visit Workshop',
            description: 'See our craft firsthand. Tours available by appointment.',
            icon: 'MapPin',
          },
          {
            _key: 'c2',
            title: 'Email Us',
            description: 'hello@thewoodandgood.com - We respond within 24 hours.',
            icon: 'Mail',
          },
          {
            _key: 'c3',
            title: 'Call Direct',
            description: 'Speak directly with our craftsmen.',
            icon: 'Phone',
          },
        ],
      },
      {
        _type: 'editorialText',
        _key: 'info1',
        heading: 'How It Works',
        layout: 'single',
        contentLeft: 'Tell us what you\'re looking for. Browse our ready-made inventory or describe your custom vision. We\'ll discuss materials, dimensions, finishes, and timeline. No surprises, no hidden costs.\n\nYou\'re not ordering from a catalog and hoping. You\'re collaborating with the people who will actually build it.',
        backgroundColor: 'cream',
      },
      {
        _type: 'cta',
        _key: 'cta1',
        heading: 'Ready to Start?',
        text: 'Whether ready-made or custom, your furniture journey begins here.',
        buttonText: 'See Ready-Made Inventory',
        buttonLink: '/products',
        theme: 'dark',
      },
    ],
  },
}

async function updateContent() {
  console.log('Starting content update...')

  for (const [slug, pageData] of Object.entries(pages)) {
    console.log(`\nUpdating page: ${slug}`)

    // Check if page exists
    const existingPage = await client.fetch(
      `*[_type == "page" && slug.current == $slug][0]`,
      { slug }
    )

    const document = {
      _type: 'page',
      title: pageData.title,
      slug: { _type: 'slug', current: pageData.slug },
      seoTitle: pageData.seoTitle,
      seoDescription: pageData.seoDescription,
      blocks: pageData.blocks,
    }

    if (existingPage) {
      // Update existing document
      await client
        .patch(existingPage._id)
        .set(document)
        .commit()
      console.log(`  Updated existing page: ${slug}`)
    } else {
      // Create new document
      await client.create(document)
      console.log(`  Created new page: ${slug}`)
    }
  }

  console.log('\n✅ Content update complete!')
}

updateContent().catch(console.error)
