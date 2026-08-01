import fs from 'node:fs';
import path from 'node:path';
import fm from 'front-matter';

/** CMS-managed single pages (content/pages/*.md). Server-only (fs). */

export type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  summary?: string;
  details?: string[];
};

export type AboutPage = {
  headline: string;
  profileImage: string;
  metaLines: string[];
  skills: string[];
  techStack: string[];
  experience: ExperienceItem[];
  body: string;
};

export type ResumePage = {
  summary: string;
  resumePdf: string;
  experience: ExperienceItem[];
  education: { degree: string; institution: string; period: string }[];
  skills: string[];
  certifications: string[];
  achievements: string[];
  body: string;
};

export type ContactPage = {
  heading: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  body: string;
};

const PAGES_DIR = path.join(process.cwd(), 'content', 'pages');

function readPage<T extends object>(name: string): (T & { body: string }) | null {
  try {
    const raw = fs.readFileSync(path.join(PAGES_DIR, `${name}.md`), 'utf8');
    const parsed = fm<T>(raw);
    return { ...parsed.attributes, body: parsed.body.trim() };
  } catch {
    return null;
  }
}

export function getAboutPage(): AboutPage {
  const page = readPage<Partial<AboutPage>>('about');
  return {
    headline: page?.headline ?? 'About',
    profileImage: page?.profileImage ?? '',
    metaLines: page?.metaLines ?? [],
    skills: page?.skills ?? [],
    techStack: page?.techStack ?? [],
    experience: page?.experience ?? [],
    body: page?.body ?? '',
  };
}

export function getResumePage(): ResumePage {
  const page = readPage<Partial<ResumePage>>('resume');
  return {
    summary: page?.summary ?? '',
    resumePdf: page?.resumePdf ?? '',
    experience: page?.experience ?? [],
    education: page?.education ?? [],
    skills: page?.skills ?? [],
    certifications: page?.certifications ?? [],
    achievements: page?.achievements ?? [],
    body: page?.body ?? '',
  };
}

export function getContactPage(): ContactPage {
  const page = readPage<Partial<ContactPage>>('contact');
  return {
    heading: page?.heading ?? 'Get in touch',
    email: page?.email ?? '',
    github: page?.github ?? '',
    linkedin: page?.linkedin ?? '',
    twitter: page?.twitter ?? '',
    body: page?.body ?? '',
  };
}
