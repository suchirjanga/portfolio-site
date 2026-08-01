import ProjectCard from '@/components/cards/ProjectCard';
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
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
    </main>
  );
}
