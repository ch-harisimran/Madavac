import { siteDescription, siteName, siteUrl } from "@/lib/site";

export default function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    email: process.env.SOCIAL_EMAIL,
    sameAs: [
      process.env.SOCIAL_GITHUB,
      process.env.SOCIAL_LINKEDIN,
      process.env.SOCIAL_INSTAGRAM,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
