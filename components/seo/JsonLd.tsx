type Props = {
  data: Record<string, unknown>;
};

/** Renders a JSON-LD structured-data script tag (server component). */
export default function JsonLd({ data }: Props) {
  // Escape `<` so content text (e.g. a title containing "</script>")
  // can never break out of the script element.
  const json = JSON.stringify(data).replaceAll('<', '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
