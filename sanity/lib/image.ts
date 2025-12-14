import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

// Use any for the source type since @sanity/image-url types are tricky
export function urlFor(source: any) {
  return builder.image(source)
}

// Helper for responsive images
export function getImageDimensions(image: { asset?: { _ref?: string } }) {
  if (!image?.asset?._ref) return null

  const ref = image.asset._ref
  const [, id, dimensionString] = ref.split('-')
  const [width, height] = dimensionString.split('x').map(Number)

  return { width, height, aspectRatio: width / height }
}
