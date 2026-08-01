import type { MetadataRoute } from 'next';
import { getAllNotes } from '@/lib/notes';
import { getAllPosts } from '@/lib/posts';
import { getProjects } from '@/lib/projects';
import { getSettings } from '@/lib/settings';

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = getSettings();

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/blog',
    '/projects',
    '/notes',
    '/resume',
    '/contact',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastUpdated ?? post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const notes: MetadataRoute.Sitemap = getAllNotes().map((note) => ({
    url: `${siteUrl}/notes/${note.slug}`,
    lastModified: new Date(note.lastUpdated ?? note.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const projects: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts, ...notes, ...projects];
}
