import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

type CommonProps = {
  variant?: Variant;
  size?: Size;
};

type AsButton = CommonProps &
  React.ComponentPropsWithoutRef<'button'> & { href?: undefined };
type AsLink = CommonProps &
  React.ComponentPropsWithoutRef<'a'> & { href: string };

type Props = AsButton | AsLink;

const variantClasses: Record<Variant, string> = {
  primary: 'bg-gold text-bg hover:bg-gold-bright',
  secondary:
    'border border-border-strong bg-surface text-ink hover:border-gold/40 hover:text-gold-bright',
  ghost: 'text-ink-muted hover:text-ink',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: Props) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-btn font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (rest.href !== undefined) {
    const { href, ...linkRest } = rest;
    // Only app-internal paths go through next/link; external URLs and
    // non-http schemes (mailto:) render a plain anchor.
    if (href.startsWith('/')) {
      return <Link href={href} className={classes} {...linkRest} />;
    }
    const newTab = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noreferrer' : undefined}
        className={classes}
        {...linkRest}
      />
    );
  }

  return <button type="button" className={classes} {...(rest as AsButton)} />;
}
