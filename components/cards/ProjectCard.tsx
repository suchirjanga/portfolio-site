import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import type { Project } from '@/lib/projects';

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <Card interactive flush className="flex h-full flex-col">
      <img
        src={project.thumbnail}
        alt={`${project.title} — project cover`}
        loading="lazy"
        className="aspect-video w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <span className="shrink-0 font-mono text-xs text-ink-faint">
            {project.year}
          </span>
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-ink-muted">
          {project.description}
        </p>
        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge>+{project.tech.length - 4}</Badge>
            )}
          </div>
        )}
        <div className="mt-auto flex gap-3 pt-2">
          {project.liveUrl && (
            <Button size="sm" href={project.liveUrl}>
              Live ↗
            </Button>
          )}
          <Button variant="ghost" size="sm" href={`/projects/${project.slug}`}>
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
