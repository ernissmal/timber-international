import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '6pfau3iy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

async function updateContactEmail() {
  console.log('Updating contact page email link...')

  // Fetch the contact page
  const contactPage = await client.fetch(
    `*[_type == "page" && slug.current == "contact"][0]`
  )

  if (!contactPage) {
    console.error('Contact page not found!')
    return
  }

  console.log('Found contact page:', contactPage._id)

  // Find and update the featuresGrid block with the email item
  const updatedBlocks = contactPage.blocks.map((block: any) => {
    if (block._type === 'featuresGrid' && block._key === 'contact1') {
      return {
        ...block,
        items: block.items.map((item: any) => {
          if (item._key === 'c2' || item.title === 'Email Us') {
            return {
              ...item,
              title: 'Email Us',
              description: 'nils@thewoodandgood.com - We respond within 24 hours.',
              link: 'mailto:nils@thewoodandgood.com',
              icon: 'Mail',
            }
          }
          return item
        }),
      }
    }
    return block
  })

  // Update the page
  await client.patch(contactPage._id)
    .set({ blocks: updatedBlocks })
    .commit()

  console.log('Contact page email updated successfully!')
}

updateContactEmail().catch(console.error)
