import { cn } from '@/lib/cn';

type Props = React.ComponentPropsWithoutRef<'span'> & {
  tone?: 'neutral' | 'gold';
};

export default function Badge({ tone = 'neutral', className, ...rest }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill border px-2.5 py-1 font-mono text-[0.7rem] leading-none tracking-wide',
        tone === 'neutral' && 'border-border bg-surface-raised text-ink-muted',
        tone === 'gold' && 'border-gold/25 bg-gold-tint text-gold',
        className,
      )}
      {...rest}
    />
  );
}
