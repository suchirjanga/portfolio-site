import MdxContent from '@/components/mdx/MdxContent';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { getContactPage } from '@/lib/pages';

export const metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const contact = getContactPage();

  const socials = [
    { label: 'GitHub', href: contact.github },
    { label: 'LinkedIn', href: contact.linkedin },
    { label: 'Twitter / X', href: contact.twitter },
  ].filter((s) => s.href);

  return (
    <main>
      <Section eyebrow="Contact" title={contact.heading}>
        <div className="flex flex-col items-start gap-6">
          <div className="max-w-xl">
            <MdxContent source={contact.body} />
          </div>
          <Button href={`mailto:${contact.email}`}>{contact.email}</Button>
          {socials.length > 0 && (
            <div className="flex flex-wrap gap-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </Section>
    </main>
  );
}
