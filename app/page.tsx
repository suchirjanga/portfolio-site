import ArticleCard from '@/components/cards/ArticleCard';
import FeaturedArticleCard from '@/components/cards/FeaturedArticleCard';
import NoteCard from '@/components/cards/NoteCard';
import ProjectCard from '@/components/cards/ProjectCard';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { getAllNotes } from '@/lib/notes';
import { getAllPosts } from '@/lib/posts';
import { getProjects } from '@/lib/projects';
import { siteConfig } from '@/lib/site';

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const latest = posts.filter((p) => p !== featured).slice(0, 3);
  const projects = getProjects().slice(0, 3);
  const notes = getAllNotes().slice(0, 4);

  return (
    <main>
      <section className="pt-16 pb-4 md:pt-24">
        <Container className="flex flex-col items-start gap-6">
          <span className="font-mono text-xs tracking-[0.2em] text-gold uppercase">
            Building in public
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            I build things, and write about what I learn
            <span className="text-gold">.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
            I&apos;m Suchir Janga — still figuring out the path, sure about the
            building. In-depth writing on software, AI, and system design,
            next to the projects it comes from.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/blog">Read the blog</Button>
            <Button variant="secondary" href="/projects">
              View projects
            </Button>
          </div>
          <p className="font-mono text-xs text-ink-faint">
            BTech CSE · GRIET Hyderabad · 2024–2028
          </p>
        </Container>
      </section>

      <Section eyebrow="Writing" title="Featured article">
        <FeaturedArticleCard post={featured} />
      </Section>

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
          {latest.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

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
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
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
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </Section>

      <Section id="about" eyebrow="About" title="A little context">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <p className="font-mono text-sm leading-relaxed text-ink-faint">
            Hyderabad, India
            <br />
            GRIET · 2024–2028
          </p>
          <p className="max-w-prose leading-relaxed text-ink-muted">
            I&apos;m a B.Tech student at GRIET, Hyderabad (2024–2028). I
            haven&apos;t locked in a career direction yet, and I&apos;m fine
            with that — what&apos;s stayed constant is that I like to build.
            Not for a specific payoff or because I&apos;ve picked a lane, but
            because making something and watching it work is the part I
            actually enjoy. So I build things — sometimes useful, sometimes
            just for myself.
          </p>
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Have something quiet and considered in mind?"
      >
        <div className="flex flex-col items-start gap-6">
          <p className="max-w-xl leading-relaxed text-ink-muted">
            Open to selective freelance and full-time work. The fastest way to
            reach me is email.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Button href={`mailto:${siteConfig.email}`}>Get in touch</Button>
            <span className="font-mono text-sm text-ink-faint">
              {siteConfig.email}
            </span>
          </div>
        </div>
      </Section>
    </main>
  );
}
