import { createClient, type SanityClient } from '@sanity/client'

// Hardcoded values as fallback for timber-international
const PROJECT_ID = 'o8zmvtbu8'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

// Use env vars if available (non-empty), otherwise use hardcoded values
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || API_VERSION

// Lazy initialization to avoid issues during build
let _client: SanityClient | null = null
let _previewClient: SanityClient | null = null

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN to ensure fresh content
})

// Preview client for draft content (requires token)
export const previewClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

export function getClient(preview = false): SanityClient {
  return preview ? previewClient : client
}
