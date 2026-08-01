import { GitHubIcon, LinkedInIcon } from '@/components/nav/icons';
import { siteConfig } from '@/lib/site';

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-1">
      <a
        href={siteConfig.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="rounded-btn p-2 text-ink-muted transition-colors duration-200 hover:bg-surface-raised hover:text-ink"
      >
        <GitHubIcon className="size-4.5" />
      </a>
      <a
        href={siteConfig.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="rounded-btn p-2 text-ink-muted transition-colors duration-200 hover:bg-surface-raised hover:text-ink"
      >
        <LinkedInIcon className="size-4.5" />
      </a>
    </div>
  );
}
