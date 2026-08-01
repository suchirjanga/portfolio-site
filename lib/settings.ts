import fs from 'node:fs';
import path from 'node:path';
import { siteConfig } from '@/lib/site';

/**
 * Site settings — CMS-managed in content/settings/site.json, with code
 * defaults as fallback so a missing/partial file can never break a build.
 * Server-only (fs): pass values to client components as props.
 */
export type SiteSettings = {
  siteTitle: string;
  handle: string;
  tagline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  favicon: string;
  logo: string;
  heroHeadline: string;
  heroIntro: string;
  heroMeta: string;
  heroImage: string;
  profileImage: string;
  footerText: string;
  copyrightText: string;
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
  resumeUrl: string;
  defaultAuthor: string;
  analyticsId: string;
};

const DEFAULTS: SiteSettings = {
  siteTitle: siteConfig.name,
  handle: siteConfig.handle,
  tagline: 'Building in public',
  description: siteConfig.description,
  seoTitle: '',
  seoDescription: '',
  ogImage: '',
  favicon: '',
  logo: '',
  heroHeadline: 'I build things, and write about what I learn',
  heroIntro:
    "I'm Suchir Janga — still figuring out the path, sure about the building.",
  heroMeta: '',
  heroImage: '',
  profileImage: '',
  footerText: '',
  copyrightText: '',
  github: siteConfig.github,
  linkedin: siteConfig.linkedin,
  twitter: '',
  email: siteConfig.email,
  resumeUrl: '',
  defaultAuthor: siteConfig.name,
  analyticsId: '',
};

const FILE = path.join(process.cwd(), 'content', 'settings', 'site.json');

let cache: SiteSettings | null = null;

export function getSettings(): SiteSettings {
  if (cache) return cache;
  let overrides: Partial<SiteSettings> = {};
  try {
    overrides = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    // Missing or invalid settings file — defaults keep the site rendering.
  }
  cache = { ...DEFAULTS, ...overrides };
  return cache;
}
