type Props = {
  data: Record<string, unknown>;
};

/** Renders a JSON-LD structured-data script tag (server component). */
export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
