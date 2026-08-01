import ArticleCard from '@/components/cards/ArticleCard';
import FeaturedArticleCard from '@/components/cards/FeaturedArticleCard';
import NoteCard from '@/components/cards/NoteCard';
import ProjectCard from '@/components/cards/ProjectCard';
import MdxContent from '@/components/mdx/MdxContent';
import Reveal from '@/components/motion/Reveal';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { getAllNotes } from '@/lib/notes';
import { getAboutPage, getContactPage } from '@/lib/pages';
import { getAllPosts } from '@/lib/posts';
import { getProjects } from '@/lib/projects';
import { getSettings } from '@/lib/settings';

export default function HomePage() {
  const settings = getSettings();
  const about = getAboutPage();
  const contact = getContactPage();

  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const latest = posts.filter((p) => p !== featured).slice(0, 3);

  const allProjects = getProjects();
  const featuredProjects = allProjects.filter((p) => p.featured);
  const projects = (featuredProjects.length > 0 ? featuredProjects : allProjects).slice(0, 3);

  const notes = getAllNotes().slice(0, 4);

  return (
    <main>
      <section className="pt-16 pb-4 md:pt-24">
        <Container className="flex flex-col items-start gap-6">
          <Reveal immediate>
            <span className="font-mono text-xs tracking-[0.2em] text-gold uppercase">
              {settings.tagline}
            </span>
          </Reveal>
          <Reveal immediate delay={0.08}>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              {settings.heroHeadline}
              <span className="text-gold">.</span>
            </h1>
          </Reveal>
          <Reveal immediate delay={0.16}>
            <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
              {settings.heroIntro}
            </p>
          </Reveal>
          <Reveal immediate delay={0.24} className="flex flex-col items-start gap-6">
            <div className="flex flex-wrap gap-4">
              <Button href="/blog">Read the blog</Button>
              <Button variant="secondary" href="/projects">
                View projects
              </Button>
            </div>
            {settings.heroMeta && (
              <p className="font-mono text-xs text-ink-faint">
                {settings.heroMeta}
              </p>
            )}
          </Reveal>
        </Container>
      </section>

      {featured && (
        <Section eyebrow="Writing" title="Featured article">
          <Reveal>
            <FeaturedArticleCard post={featured} />
          </Reveal>
        </Section>
      )}

      {latest.length > 0 && (
        <Section
          eyebrow="Writing"
          title="Latest articles"
          action={
            <Button variant="ghost" size="sm" href="/blog">
              View all →
            </Button>
          }
        >
          <div className="grid gap-6 md:grid-cols-3">
            {latest.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i * 0.07, 0.28)} className="h-full">
                <ArticleCard post={post} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section
        eyebrow="Work"
        title="Featured projects"
        action={
          <Button variant="ghost" size="sm" href="/projects">
            All projects →
          </Button>
        }
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.07, 0.28)} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Learning"
        title="Recent notes"
        action={
          <Button variant="ghost" size="sm" href="/notes">
            All notes →
          </Button>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {notes.map((note, i) => (
            <Reveal key={note.slug} delay={Math.min(i * 0.07, 0.28)} className="h-full">
              <NoteCard note={note} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="about" eyebrow="About" title={about.headline}>
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-1 font-mono text-sm leading-relaxed text-ink-faint">
              {about.metaLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            <div className="flex max-w-prose flex-col gap-5">
              <MdxContent source={about.body} />
              {about.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {about.techStack.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section id="contact" eyebrow="Contact" title={contact.heading}>
        <Reveal>
          <div className="flex flex-col items-start gap-6">
            <div className="max-w-xl">
              <MdxContent source={contact.body} />
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <Button href={`mailto:${contact.email}`}>Get in touch</Button>
              <span className="font-mono text-sm text-ink-faint">
                {contact.email}
              </span>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
