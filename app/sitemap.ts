import { MetadataRoute } from 'next'
import { blogPosts } from './(frontend)/blog/data'

const baseUrl = 'https://pro-graphics.co.za'

const staticRoutes = [
    '/',
    '/blog',
    '/vehicle-branding',
    '/vehicle-branding/umhlanga',
    '/vehicle-branding/pinetown',
    '/vehicle-branding/phoenix',
    '/vehicle-branding/durban-cbd',
    '/sign-boards',
    '/contravisions',
    '/custom-stickers',
    '/quote',
    '/case-studies',
    '/black-roof-wraps',
    '/custom-canvas',
    '/custom-wallpaper',
    '/laminex-headlight-film',
]

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: `${baseUrl}${route === '/' ? '' : route}`,
        lastModified: now,
        changeFrequency: route === '/' ? 'yearly' : route.startsWith('/blog') ? 'weekly' : 'monthly',
        priority: route === '/' ? 1 : route === '/quote' ? 0.5 : 0.8,
    }))

    const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...staticEntries, ...blogEntries]
}
