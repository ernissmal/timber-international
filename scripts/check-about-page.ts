import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: 'avqamki4',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
})

async function checkAboutPage() {
  const aboutPage = await client.fetch(`*[_type == "page" && slug.current == "about"][0]`)
  console.log(JSON.stringify(aboutPage, null, 2))
}

checkAboutPage()
