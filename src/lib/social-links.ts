export type SocialPlatform = "github" | "linkedin" | "instagram" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}

function normalizeWebUrl(value: string | undefined): string {
  if (!value?.trim()) return "";
  const trimmed = value.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed.replace(/^\/\//, "")}`;
}

function normalizeGmailCompose(value: string | undefined): string {
  if (!value?.trim()) return "";
  const email = value.trim().replace(/^mailto:/i, "");
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: email,
    su: "Project Inquiry",
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function getSocialLinks(): SocialLink[] {
  const config: Array<{
    platform: SocialPlatform;
    label: string;
    value: string | undefined;
    kind: "web" | "email";
  }> = [
    { platform: "email", label: "Email", value: process.env.SOCIAL_EMAIL, kind: "email" },
    {
      platform: "instagram",
      label: "Instagram",
      value: process.env.SOCIAL_INSTAGRAM,
      kind: "web",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      value: process.env.SOCIAL_LINKEDIN,
      kind: "web",
    },
    { platform: "github", label: "GitHub", value: process.env.SOCIAL_GITHUB, kind: "web" },
  ];

  return config
    .map(({ platform, label, value, kind }) => ({
      platform,
      label,
      href: kind === "email" ? normalizeGmailCompose(value) : normalizeWebUrl(value),
    }))
    .filter((link) => link.href.length > 0);
}
