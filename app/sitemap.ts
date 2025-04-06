<<<<<<< HEAD
import { MetadataRoute } from 'next';

interface PageData {
  slug: string;
  lastModified: Date;
}

async function getPageData(): Promise<PageData[]> {
  // List your application pages here
  return [
    {
      slug: '',
      lastModified: new Date(),
    },
    {
      slug: 'about',
      lastModified: new Date(),
    },
    // Add other pages as needed
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://november5th.xyz';
  const pages = await getPageData();
  
  return pages.map(page => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.lastModified,
    changeFrequency: 'weekly',
    priority: page.slug === '' ? 1.0 : 0.8,
  }));
=======
import { MetadataRoute } from 'next'; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/`
    }
  ]
>>>>>>> dev
}