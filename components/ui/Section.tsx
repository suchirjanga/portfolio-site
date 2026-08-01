import Container from '@/components/ui/Container';
import { cn } from '@/lib/cn';

type Props = {
  id?: string;
  /** Small mono label above the title, e.g. "Featured Articles". */
  eyebrow?: string;
  title?: string;
  /** Optional right-aligned header slot, e.g. a "View all →" link. */
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export default function Section({
  id,
  eyebrow,
  title,
  action,
  className,
  children,
}: Props) {
  return (
    <section id={id} className={cn('py-16 md:py-20', className)}>
      <Container>
        {(eyebrow || title || action) && (
          <header className="mb-8 flex items-end justify-between gap-6 md:mb-10">
            <div className="flex flex-col gap-2">
              {eyebrow && (
                <span className="font-mono text-xs tracking-[0.2em] text-gold uppercase">
                  {eyebrow}
                </span>
              )}
              {title && (
                <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                  {title}
                </h2>
              )}
            </div>
            {action && <div className="shrink-0 pb-1">{action}</div>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
