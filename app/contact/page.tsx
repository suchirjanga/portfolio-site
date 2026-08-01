import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { siteConfig } from '@/lib/site';

export const metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <main>
      <Section eyebrow="Contact" title="Get in touch">
        <div className="flex flex-col items-start gap-6">
          <p className="max-w-xl leading-relaxed text-ink-muted">
            Open to selective freelance and full-time work. The fastest way to
            reach me is email.
          </p>
          <Button href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </Button>
        </div>
      </Section>
    </main>
  );
}
