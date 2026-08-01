import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MdxContent from '@/components/mdx/MdxContent';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { getProject, getProjects } from '@/lib/projects';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main>
      <Container className="max-w-4xl py-12 md:py-16">
        <article>
          <header className="flex flex-col gap-5">
            <Link
              href="/projects"
              className="font-mono text-xs tracking-[0.18em] text-ink-faint uppercase transition-colors duration-200 hover:text-ink"
            >
              ← Projects
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="gold">{project.role}</Badge>
              <span className="font-mono text-xs text-ink-faint">
                {project.year}
              </span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl md:leading-[1.1]">
              {project.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
              {project.description}
            </p>
            {project.tech.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            )}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button href={project.liveUrl}>Visit live site ↗</Button>
                )}
                {project.githubUrl && (
                  <Button variant="secondary" href={project.githubUrl}>
                    GitHub ↗
                  </Button>
                )}
              </div>
            )}
          </header>

          <img
            src={project.thumbnail}
            alt={`${project.title} — project cover`}
            className="mt-10 aspect-video w-full rounded-card border border-border object-cover"
          />

          <div className="mt-10">
            <MdxContent source={project.body} />
          </div>

          <footer className="mt-14 border-t border-border pt-8">
            <Link
              href="/projects"
              className="font-mono text-xs tracking-[0.18em] text-ink-faint uppercase transition-colors duration-200 hover:text-ink"
            >
              ← Back to all projects
            </Link>
          </footer>
        </article>
      </Container>
    </main>
  );
}
