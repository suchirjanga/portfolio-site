import { cn } from '@/lib/cn';

type Props = {
  /** Mono glyph rendered center-stage, e.g. "</>", "λ", "∿". */
  symbol?: string;
  className?: string;
};

/**
 * Token-driven placeholder cover for posts without an image: a faint grid
 * with a gold glow and a mono glyph. Works in both themes.
 */
export default function CoverArt({ symbol = '</>', className }: Props) {
  return (
    <div
      aria-hidden
      className={cn('relative overflow-hidden bg-surface-raised', className)}
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 30% 20%, var(--color-gold-tint), transparent 55%),' +
          'repeating-linear-gradient(0deg, var(--color-border) 0 1px, transparent 1px 32px),' +
          'repeating-linear-gradient(90deg, var(--color-border) 0 1px, transparent 1px 32px)',
      }}
    >
      <span className="absolute inset-0 grid place-items-center font-mono text-5xl text-gold/40 select-none">
        {symbol}
      </span>
    </div>
  );
}
