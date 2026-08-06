type SeoJsonLdProps = {
  schemas: unknown[];
  idPrefix?: string;
};

function serializeJsonLd(
  schema: unknown,
): string {
  return JSON.stringify(
    schema,
  ).replace(
    /</g,
    "\\u003c",
  );
}

export default function SeoJsonLd({
  schemas,
  idPrefix = "api-schema",
}: SeoJsonLdProps) {
  if (
    !Array.isArray(schemas) ||
    schemas.length === 0
  ) {
    return null;
  }

  return (
    <>
      {schemas.map(
        (schema, index) => (
          <script
            key={`${idPrefix}-${index}`}
            id={`${idPrefix}-${index + 1}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html:
                serializeJsonLd(
                  schema,
                ),
            }}
          />
        ),
      )}
    </>
  );
}