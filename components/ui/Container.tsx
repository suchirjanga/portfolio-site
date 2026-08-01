import { cn } from '@/lib/cn';

type Props = React.ComponentPropsWithoutRef<'div'>;

export default function Container({ className, ...rest }: Props) {
  return (
    <div
      className={cn('mx-auto w-full max-w-6xl px-5 md:px-8', className)}
      {...rest}
    />
  );
}
