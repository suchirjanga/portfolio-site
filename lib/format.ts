const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "2026-07-21" → "Jul 21, 2026". */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}
