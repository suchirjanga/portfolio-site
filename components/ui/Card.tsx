import { cn } from '@/lib/cn';

type Props = React.ComponentPropsWithoutRef<'div'> & {
  /** Adds hover lift + border emphasis for clickable cards. */
  interactive?: boolean;
  /** Removes the default padding (for cards with full-bleed covers). */
  flush?: boolean;
};

export default function Card({
  interactive = false,
  flush = false,
  className,
  ...rest
}: Props) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-card border border-border bg-surface',
        !flush && 'p-6',
        interactive &&
          'transition-[transform,border-color,background-color] duration-300 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-border-strong hover:bg-surface-raised',
        className,
      )}
      {...rest}
    />
  );
}
