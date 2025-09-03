import { getCollection } from 'astro:content'
import { themeConfig } from '../../config'

const collectionEntries = await getCollection('posts')

// Map the array of content collection entries to create an object.
// Converts [{ id: 'post.md', data: { title: 'Example', pubDate: Date } }]
// to { 'post.md': { title: 'Example', pubDate: Date } }
const pages = Object.fromEntries(
  collectionEntries.map(({ id, data }) => [id.replace(/\.(md|mdx)$/, ''), data])
)

export async function getStaticPaths() {
  return Object.keys(pages).map((route) => ({
    params: { route },
    props: { route }
  }))
}

export async function GET({ props }) {
  const { route } = props
  const page = pages[route]

  if (!page) {
    return new Response('Page not found', { status: 404 })
  }

  // Return a simple placeholder image or redirect to a default OG image
  // For now, we'll redirect to the existing OG image
  const ogImageUrl = `${themeConfig.site.website}/og/og-logo.png`
  return Response.redirect(ogImageUrl, 302)
}
