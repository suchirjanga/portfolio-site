import MdxContent from '@/components/mdx/MdxContent';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import { getResumePage } from '@/lib/pages';
import { getSettings } from '@/lib/settings';

export const metadata = {
  title: 'Resume',
  description:
    'Experience, education, and skills — B.Tech CSE student building and shipping full products end to end.',
  alternates: { canonical: '/resume' },
};

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 font-mono text-sm tracking-[0.18em] text-gold uppercase">
      {children}
    </h3>
  );
}

export default function ResumePage() {
  const resume = getResumePage();
  const settings = getSettings();
  const pdf = resume.resumePdf || settings.resumeUrl;

  return (
    <main>
      <Section eyebrow="Resume" title="Experience & education">
        <div className="flex max-w-3xl flex-col gap-12">
          <div className="flex flex-col items-start gap-6">
            <p className="leading-relaxed text-ink-muted">{resume.summary}</p>
            {pdf && (
              <Button href={pdf} download>
                Download resume (PDF)
              </Button>
            )}
          </div>

          {resume.experience.length > 0 && (
            <div>
              <SubHeading>Experience</SubHeading>
              <div className="flex flex-col gap-4">
                {resume.experience.map((item) => (
                  <Card key={`${item.role}-${item.period}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-semibold tracking-tight">
                        {item.role}
                      </h4>
                      <span className="font-mono text-xs text-ink-faint">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gold">
                      {item.organization}
                    </p>
                    {item.details && item.details.length > 0 && (
                      <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-ink-muted marker:text-gold">
                        {item.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {resume.education.length > 0 && (
            <div>
              <SubHeading>Education</SubHeading>
              <div className="flex flex-col gap-4">
                {resume.education.map((item) => (
                  <Card key={item.degree}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-semibold tracking-tight">
                        {item.degree}
                      </h4>
                      <span className="font-mono text-xs text-ink-faint">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">
                      {item.institution}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {resume.skills.length > 0 && (
            <div>
              <SubHeading>Skills</SubHeading>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
          )}

          {resume.certifications.length > 0 && (
            <div>
              <SubHeading>Certifications</SubHeading>
              <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-ink-muted marker:text-gold">
                {resume.certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {resume.achievements.length > 0 && (
            <div>
              <SubHeading>Achievements</SubHeading>
              <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-ink-muted marker:text-gold">
                {resume.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {resume.body && <MdxContent source={resume.body} />}
        </div>
      </Section>
    </main>
  );
}
