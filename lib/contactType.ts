import { ContactType } from "@/interfaces/contactBadge";

export function stringToContactType(contactType: string): ContactType {
  switch (contactType.toLowerCase()) {
    case "githubstars":
      return ContactType.GITHUBSTARS;
    case "github":
      return ContactType.GITHUB;
    case "linkedin":
      return ContactType.LINKEDIN;
    case "twitter":
      return ContactType.TWITTER;
    case "facebook":
      return ContactType.FACEBOOK;
    case "instagram":
      return ContactType.INSTAGRAM;
    case "email":
      return ContactType.EMAIL;
    default:
      return ContactType.OTHER;
  }
}
