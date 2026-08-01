import ProjectCard from '@/components/cards/ProjectCard';
import Reveal from '@/components/motion/Reveal';
import Section from '@/components/ui/Section';
import { getProjects } from '@/lib/projects';

export const metadata = {
  title: 'Projects',
  description:
    'Things I have designed and built — shipped products and experiments.',
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main>
      <Section eyebrow="Projects" title="Things I've built">
        <p className="-mt-4 mb-10 max-w-xl leading-relaxed text-ink-muted">
          Shipped products and experiments — each one built end to end, from
          design to deployment.
        </p>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.06, 0.24)} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
