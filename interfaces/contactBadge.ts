// interfaces/contactBadge.ts
export enum ContactType {
  GITHUB = "github",
  LINKEDIN = "linkedin",
  TWITTER = "twitter",
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  EMAIL = "email",
  OTHER = "other",
}

export interface ContactBadgeProps {
  type: ContactType;
  link: string;
}
