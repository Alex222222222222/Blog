import { ContactType } from "./contactBadge";

interface Config {
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string[];
  baseUrl: string;
  contact: Contact[];
}

interface Contact {
  type: ContactType;
  link: string;
}

export default Config;
