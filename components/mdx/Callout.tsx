import { cn } from '@/lib/cn';

type CalloutType = 'info' | 'tip' | 'warn';

const styles: Record<CalloutType, { border: string; label: string }> = {
  info: { border: 'border-border-strong', label: 'text-ink-muted' },
  tip: { border: 'border-gold', label: 'text-gold' },
  warn: { border: 'border-gold-deep', label: 'text-gold-deep' },
};

type Props = {
  type?: CalloutType;
  children: React.ReactNode;
};

export default function Callout({ type = 'info', children }: Props) {
  const s = styles[type];
  return (
    <aside
      className={cn(
        'not-prose my-6 rounded-r-(--radius-btn) border-l-2 bg-surface px-5 py-4',
        s.border,
      )}
    >
      <span
        className={cn(
          'mb-1.5 block font-mono text-[0.7rem] tracking-[0.18em] uppercase',
          s.label,
        )}
      >
        {type}
      </span>
      <div className="text-[0.95rem] leading-relaxed text-ink-muted [&>p]:m-0">
        {children}
      </div>
    </aside>
  );
}
